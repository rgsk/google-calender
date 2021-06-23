import { atom, useRecoilState } from 'recoil';
const valState = atom({
  key: 'valState',
  default: 0,
});
export const useValState = () => {
  const [val, setVal] = useRecoilState(valState);
  return {
    val,
    setVal,
  };
};
