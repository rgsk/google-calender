import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';

const currentWeekState = atom({
  key: 'currentWeekState',
  default: 0,
});
const currentYearState = atom({
  key: 'currentYearState',
  default: 2021,
});
export const useDateState = () => {
  const [currentWeek, setCurrentWeek] = useRecoilState(currentWeekState);
  const [currentYear, setCurrentYear] = useRecoilState(currentYearState);
  const nextWeek = () => {
    setCurrentWeek((prevCurrentWeek) => prevCurrentWeek + 1);
  };
  const prevWeek = () => {
    setCurrentWeek((prevCurrentWeek) => prevCurrentWeek - 1);
  };
  return {
    currentWeek,
    setCurrentWeek,
    nextWeek,
    prevWeek,
    currentYear,
    setCurrentYear,
  };
};
