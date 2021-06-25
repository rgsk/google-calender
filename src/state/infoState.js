import { atom, useRecoilState } from 'recoil';
const loadedSchedulesState = atom({
  key: 'loadedSchedulesState',
  default: [],
});
export const useInfoState = () => {
  const [loadedSchedules, setLoadedSchedules] =
    useRecoilState(loadedSchedulesState);
  return {
    loadedSchedules,
    setLoadedSchedules,
  };
};
