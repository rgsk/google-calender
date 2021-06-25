import { constructDateForKeysWithISOFormat } from '../helpers/dateHelper';
const schedulesApi = {
  getMultiple: async () => {
    const response = await fetch('http://localhost:5000/schedules');
    const data = await response.json();
    if (data.length) {
      data.forEach((entry) => {
        constructDateForKeysWithISOFormat(entry, ['start_time', 'end_time']);
        // console.log(entry);
      });
      // console.log(data);
    }
    return data;
  },
  create: async (schedule) => {
    const response = await fetch('http://localhost:5000/schedules', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(schedule),
    });
    const data = await response.json();
    // console.log(data);
    if (data.entry) {
      constructDateForKeysWithISOFormat(data.entry, ['start_time', 'end_time']);
    }
    return data;
  },
  remove: async (id) => {
    const response = await fetch(`http://localhost:5000/schedules/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  },
  update: async (id, schedule) => {
    const response = await fetch(`http://localhost:5000/schedules/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(schedule),
    });
    const data = await response.json();
    // console.log(data);
    if (data.entry) {
      constructDateForKeysWithISOFormat(data.entry, ['start_time', 'end_time']);
    }
    return data;
  },
};
export default schedulesApi;
