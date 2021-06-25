import commonApi from './commonApi';
const commonFunctions = commonApi('teachers');
const teachersApi = {
  ...commonFunctions,
};
export default teachersApi;
