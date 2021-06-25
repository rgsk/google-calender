const commonApi = (tableName) => ({
  getMultiple: async () => {
    const response = await fetch(`http://localhost:5000/${tableName}`);
    const data = await response.json();

    return data;
  },
  getSingle: async (id) => {
    const response = await fetch(`http://localhost:5000/${tableName}/${id}`);
    const data = await response.json();

    return data;
  },
  create: async (entity) => {
    const response = await fetch(`http://localhost:5000/${tableName}`, {
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
    const response = await fetch(`http://localhost:5000/${tableName}/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  },
  update: async (id, entity) => {
    const response = await fetch(`http://localhost:5000/${tableName}/${id}`, {
      method: 'PUT',
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
