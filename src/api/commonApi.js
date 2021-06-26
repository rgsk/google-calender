const url = process.env.REACT_APP_SERVER_URL;
const commonApi = (tableName) => ({
  getMultiple: async () => {
    const response = await fetch(`${url}/${tableName}`);
    const data = await response.json();

    return data;
  },
  getSingle: async (id) => {
    const response = await fetch(`${url}/${tableName}/${id}`);
    const data = await response.json();

    return data;
  },
  create: async (entity) => {
    const response = await fetch(`${url}/${tableName}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(entity),
    });
    const data = await response.json();

    return data;
  },
  remove: async (id) => {
    const response = await fetch(`${url}/${tableName}/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  },
  update: async (id, entity) => {
    const response = await fetch(`${url}/${tableName}/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(entity),
    });
    const data = await response.json();
    // console.log(data);

    return data;
  },
});
export default commonApi;
