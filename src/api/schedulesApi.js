import { constructDateForKeysWithISOFormat } from '../helpers/dateHelper';
import commonApi from './commonApi';
import schedule_teacherApi from './schedule_teacherApi';
const commonFunctions = commonApi('schedules');
const schedulesApi = {
  getMultiple: async () => {
    const data = await commonFunctions.getMultiple();
    const associations = await schedule_teacherApi.getMultiple();
    if (data.length) {
      data.forEach((entry) => {
        constructDateForKeysWithISOFormat(entry, ['start_time', 'end_time']);
        entry.teachers_id = [];
        if (associations.length) {
          associations.forEach((association) => {
            if (association.schedule_id === entry.id) {
              entry.teachers_id.push(association.teacher_id);
            }
          });
        }
        // console.log(entry);
      });
      // console.log(data);
    }
    // console.log(data);
    return data;
  },
  getSingle: async (id) => {
    const data = await commonFunctions.getSingle(id);
    if (data.entry) {
      constructDateForKeysWithISOFormat(data.entry, ['start_time', 'end_time']);
    }
    return data;
  },
  create: async (schedule) => {
    const teachers_id = [...schedule.teachers_id];
    delete schedule.teachers_id;
    const data = await commonFunctions.create(schedule);
    // console.log(data);
    if (data.entry) {
      data.entry.teachers_id = [];
      if (teachers_id.length) {
        for (let teacher_id of teachers_id) {
          const createdAssociation = await schedule_teacherApi.create({
            schedule_id: data.entry.id,
            teacher_id,
          });
          // console.log(createdAssociation);
          if (createdAssociation.entry?.teacher_id) {
            data.entry.teachers_id.push(createdAssociation.entry?.teacher_id);
          }
        }
      }

      // console.log(data.entry.teachers_id);
      constructDateForKeysWithISOFormat(data.entry, ['start_time', 'end_time']);
    }
    return data;
  },
  remove: commonFunctions.remove,
  update: async (id, schedule) => {
    let teachers_id = [];
    if (schedule.teachers_id) {
      teachers_id = [...schedule.teachers_id];
      delete schedule.teachers_id;
      const result = await schedule_teacherApi.deleteEntriesWithScheduleId(id);
      // console.log(result);
    }

    const data = await commonFunctions.update(id, schedule);
    // console.log(data);
    if (data.entry) {
      data.entry.teachers_id = [];
      if (teachers_id.length) {
        for (let teacher_id of teachers_id) {
          const createdAssociation = await schedule_teacherApi.create({
            schedule_id: data.entry.id,
            teacher_id,
          });
          // console.log(createdAssociation);
          if (createdAssociation.entry?.teacher_id) {
            data.entry.teachers_id.push(createdAssociation.entry?.teacher_id);
          }
        }
      }
      constructDateForKeysWithISOFormat(data.entry, ['start_time', 'end_time']);
    }
    return data;
  },
};
export default schedulesApi;
