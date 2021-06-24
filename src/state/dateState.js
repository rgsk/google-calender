import { useEffect } from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import {
  getWeeks,
  getAssociatedMonthsAndYearForGivenWeek,
} from '../helpers/dateHelper';
import { monthNames } from '../helpers/names';

const currentWeekState = atom({
  key: 'currentWeekState',
  default: 0,
});
const currentYearState = atom({
  key: 'currentYearState',
  default: 2021,
});
const weeksState = atom({
  key: 'weeksState',
  default: getWeeks(2021),
});

export const useDateState = () => {
  const [currentWeek, setCurrentWeek] = useRecoilState(currentWeekState);
  const [currentYear, setCurrentYear] = useRecoilState(currentYearState);
  const [weeks, setWeeks] = useRecoilState(weeksState);
  const weekString = useRecoilValue(currentWeekStringValue);
  const nextWeek = () => {
    const nextWeekIdx = currentWeek + 1;
    if (nextWeekIdx < weeks.length) {
      setCurrentWeek(nextWeekIdx);
    } else {
      const nextYearWeeks = getWeeks(currentYear + 1);
      setWeeks(nextYearWeeks);
      setCurrentYear(currentYear + 1);
      setCurrentWeek(1);
    }
  };
  const prevWeek = () => {
    const prevWeekIdx = currentWeek - 1;
    if (prevWeekIdx >= 0) {
      setCurrentWeek(prevWeekIdx);
    } else {
      const prevYearWeeks = getWeeks(currentYear - 1);
      setWeeks(prevYearWeeks);
      setCurrentYear(currentYear - 1);
      setCurrentWeek(prevYearWeeks.length - 2);
    }
  };
  return {
    currentWeek,
    setCurrentWeek,
    nextWeek,
    prevWeek,
    currentYear,
    setCurrentYear,
    weeks,
    setWeeks,
    weekString,
  };
};
export const currentWeekStringValue = selector({
  key: 'currentWeekStringValue',
  get: ({ get }) => {
    const weeks = get(weeksState);
    const currentWeek = get(currentWeekState);
    const details = getAssociatedMonthsAndYearForGivenWeek(weeks[currentWeek]);
    // console.log(details);
    if (details.length === 1) {
      return monthNames[details[0][0]] + ' ' + details[0][1];
    } else {
      if (details[0][1] === details[1][1]) {
        // year is same

        return (
          monthNames[details[0][0]].slice(0, 3) +
          ' - ' +
          monthNames[details[1][0]].slice(0, 3) +
          ' ' +
          details[0][1]
        );
      } else {
        // year is different

        return (
          monthNames[details[0][0]].slice(0, 3) +
          ' ' +
          details[0][1] +
          ' - ' +
          monthNames[details[1][0]].slice(0, 3) +
          ' ' +
          details[1][1]
        );
      }
    }
  },
});
