import { constructDateForKeysWithISOFormat } from '../helpers/dateHelper';
import commonApi from './commonApi';
const commonFunctions = commonApi('schedules');
const schedulesApi = {
  getMultiple: async () => {
    const data = await commonFunctions.getMultiple();
    if (data.length) {
      data.forEach((entry) => {
        constructDateForKeysWithISOFormat(entry, ['start_time', 'end_time']);
        // console.log(entry);
      });
      // console.log(data);
    }
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
    const data = await commonFunctions.create(schedule);
    // console.log(data);
    if (data.entry) {
      constructDateForKeysWithISOFormat(data.entry, ['start_time', 'end_time']);
    }
    return data;
  },
  remove: commonFunctions.remove,
  update: async (id, schedule) => {
    const data = await commonFunctions.update(id, schedule);
    // console.log(data);
    if (data.entry) {
      constructDateForKeysWithISOFormat(data.entry, ['start_time', 'end_time']);
    }
    return data;
  },
};
export default schedulesApi;
