import { atom, useRecoilState } from 'recoil';
const loadedSchedulesState = atom({
  key: 'loadedSchedulesState',
  default: [],
});
const loadedBatchesState = atom({
  key: 'loadedBatchesState',
  default: [],
});
const loadedTeachersState = atom({
  key: 'loadedTeachersState',
  default: [],
});
export const useInfoState = () => {
  const [loadedSchedules, setLoadedSchedules] =
    useRecoilState(loadedSchedulesState);
  const [loadedBatches, setLoadedBatches] = useRecoilState(loadedBatchesState);
  const [loadedTeachers, setLoadedTeachers] =
    useRecoilState(loadedTeachersState);
  return {
    loadedSchedules,
    setLoadedSchedules,
    loadedBatches,
    setLoadedBatches,
    loadedTeachers,
    setLoadedTeachers,
  };
};
