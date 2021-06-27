import commonApi from './commonApi';
const url = process.env.REACT_APP_SERVER_URL;
const commonFunctions = commonApi('schedule_teacher');
const schedule_teacherApi = {
  ...commonFunctions,
  deleteEntriesWithScheduleId: async (schedule_id) => {
    const response = await fetch(
      `${url}/schedule_teacher/schedules/${schedule_id}`,
      {
        method: 'DELETE',
      }
    );
    const data = await response.json();

    return data;
  },
};
export default schedule_teacherApi;
