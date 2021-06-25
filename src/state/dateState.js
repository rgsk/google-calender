import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import {
  getWeeks,
  getAssociatedMonthsAndYearForGivenWeek,
  getWeekIndexFromDate,
  getMonths,
} from '../helpers/dateHelper';
import { monthNames } from '../helpers/names';
const curYear = new Date().getFullYear();
const currentWeekState = atom({
  key: 'currentWeekState',
  default: getWeekIndexFromDate(getWeeks(curYear), new Date()),
});
const currentMonthState = atom({
  key: 'currentMonthState',
  default: new Date().getMonth(),
});
const currentYearState = atom({
  key: 'currentYearState',
  default: curYear,
});
const weeksState = atom({
  key: 'weeksState',
  default: getWeeks(curYear, 7),
});
const monthsState = atom({
  key: 'monthsState',
  default: getMonths(curYear),
});

export const useDateState = () => {
  const [currentWeek, setCurrentWeek] = useRecoilState(currentWeekState);
  const [currentMonth, setCurrentMonth] = useRecoilState(currentMonthState);
  const [currentYear, setCurrentYear] = useRecoilState(currentYearState);
  const [weeks, setWeeks] = useRecoilState(weeksState);
  const [months, setMonths] = useRecoilState(monthsState);

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
  const nextMonth = () => {
    const nextMonthIdx = currentMonth + 1;
    if (nextMonthIdx < 12) {
      setCurrentMonth(nextMonthIdx);
    } else {
      const nextYearMonths = getMonths(currentYear + 1);
      setMonths(nextYearMonths);
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    }
  };
  const prevMonth = () => {
    const prevMonthIdx = currentMonth - 1;
    if (prevMonthIdx >= 0) {
      setCurrentMonth(prevMonthIdx);
    } else {
      const prevYearMonths = getMonths(currentYear - 1);
      setMonths(prevYearMonths);
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    }
  };
  const prevYear = () => {
    setCurrentYear(currentYear - 1);
  };
  const nextYear = () => {
    setCurrentYear(currentYear + 1);
  };

  return {
    currentWeek,
    setCurrentWeek,
    prevWeek,
    nextWeek,
    prevMonth,
    nextMonth,
    prevYear,
    nextYear,
    currentYear,
    setCurrentYear,
    weeks,
    setWeeks,
    weekString,

    currentMonth,
    setCurrentMonth,
    months,
    setMonths,
  };
};

export const currentWeekStringValue = selector({
  key: 'currentWeekStringValue',
  get: ({ get }) => {
    const weeks = get(weeksState);
    const currentWeek = get(currentWeekState);
    const details = getAssociatedMonthsAndYearForGivenWeek(weeks[currentWeek]);
    if (!details) return '';
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
