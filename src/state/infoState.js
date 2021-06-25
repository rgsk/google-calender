import { atom, useRecoilState } from 'recoil';
const loadedSchedulesState = atom({
  key: 'loadedSchedulesState',
  default: [],
});
const loadedBatchesState = atom({
  key: 'loadedBatchesState',
  default: [],
});
export const useInfoState = () => {
  const [loadedSchedules, setLoadedSchedules] =
    useRecoilState(loadedSchedulesState);
  const [loadedBatches, setLoadedBatches] = useRecoilState(loadedBatchesState);
  return {
    loadedSchedules,
    setLoadedSchedules,
    loadedBatches,
    setLoadedBatches,
  };
};
