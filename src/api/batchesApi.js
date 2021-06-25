import commonApi from './commonApi';
const commonFunctions = commonApi('batches');
const batchesApi = {
  ...commonFunctions,
};
export default batchesApi;
