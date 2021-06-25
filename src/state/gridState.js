import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { useDateState } from './dateState';
import {
  getWeeks,
  getWeekIndexFromDate,
  getMonths,
} from '../helpers/dateHelper';
export const layoutTypes = {
  day: 'day',
  week: 'week',
  month: 'month',
  year: 'year',
  schedule: 'schedule',
  '4 days': '4 days',
};

// const largeLayout = [
//   { i: '0', x: 0, y: 0, w: 1, h: 1 },
//   { i: '1', x: 1, y: 0, w: 1, h: 1 },
//   { i: '2', x: 2, y: 0, w: 1, h: 1 },
//   { i: '3', x: 3, y: 0, w: 1, h: 1 },
//   { i: '4', x: 4, y: 0, w: 1, h: 1 },
//   { i: '5', x: 5, y: 0, w: 1, h: 1 },
//   { i: '6', x: 6, y: 0, w: 1, h: 1 },
// ];

const createLayout = (rows, cols) => {
  const arr = [];
  let v = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      arr.push({
        i: `${v++}`,
        x: j,
        y: i,
        w: 1,
        h: 1,
      });
    }
  }
  return arr;
};
const layoutTypeState = atom({
  key: 'layoutTypeState',
  default: layoutTypes['week'],
});
const layoutState = atom({
  key: 'layoutState',
  default: createLayout(24, 7),
});
const dimensionState = atom({
  key: 'dimensionState',
  default: {
    rows: 24,
    cols: 7,
    rowLength: 100,
  },
});
export const useGridState = () => {
  const [layout, setLayout] = useRecoilState(layoutState);
  const [layoutType, setLayoutType] = useRecoilState(layoutTypeState);
  const [dimension, setDimension] = useRecoilState(dimensionState);
  const {
    currentYear,
    weeks,
    setWeeks,
    setCurrentWeek,
    currentWeek,
    months,
    setMonths,
    setCurrentMonth,
    currentMonth,
    prevWeek,
    nextWeek,
    prevMonth,
    nextMonth,
    prevYear,
    nextYear,
  } = useDateState();

  useEffect(() => {
    let updatedWeeks;
    switch (layoutType) {
      case layoutTypes['day']:
        updatedWeeks = getWeeks(currentYear, 1);
        setCurrentWeek(
          getWeekIndexFromDate(updatedWeeks, weeks[currentWeek][0])
        );
        setWeeks(updatedWeeks);
        setLayout(createLayout(24, 1));

        setDimension({
          rows: 24,
          cols: 1,
          rowLength: 100,
        });
        break;
      case layoutTypes['week']:
        updatedWeeks = getWeeks(currentYear, 7);
        setCurrentWeek(
          getWeekIndexFromDate(updatedWeeks, weeks[currentWeek][0])
        );
        setWeeks(updatedWeeks);
        setLayout(createLayout(24, 7));

        setDimension({
          rows: 24,
          cols: 7,
          rowLength: 100,
        });

        break;
      case layoutTypes['month']:
        let updatedMonths = getMonths(currentYear);
        // console.log(updatedWeeks);
        const cMonth = weeks[currentWeek][0].getMonth();
        setCurrentMonth(cMonth);
        setMonths(updatedMonths);

        break;
      case layoutTypes['schedule']:
        setDimension((prevDimension) => ({
          ...prevDimension,
          rows: 24,
          cols: 7,
        }));
        break;
      case layoutTypes['4 days']:
        updatedWeeks = getWeeks(currentYear, 4);
        setCurrentWeek(
          getWeekIndexFromDate(updatedWeeks, weeks[currentWeek][0])
        );
        setWeeks(updatedWeeks);
        setLayout(createLayout(24, 4));

        setDimension({
          rows: 24,
          cols: 4,
          rowLength: 100,
        });

        break;
      default:
    }
  }, [layoutType]);
  useEffect(() => {
    if (months[currentMonth].length === 35) {
      setLayout(createLayout(5, 7));

      setDimension({
        rows: 5,
        cols: 7,
        rowLength: 100,
      });
    } else {
      // length 42
      setLayout(createLayout(6, 7));

      setDimension({
        rows: 6,
        cols: 7,
        rowLength: 100,
      });
    }
  }, [currentMonth, currentYear, months]);
  const prevPage = () => {
    if (layoutType === layoutTypes.month) {
      prevMonth();
    } else if (
      layoutType === layoutTypes.year ||
      layoutType === layoutTypes.schedule
    ) {
      prevYear();
    } else {
      prevWeek();
    }
  };
  const nextPage = () => {
    if (layoutType === layoutTypes.month) {
      nextMonth();
    } else if (
      layoutType === layoutTypes.year ||
      layoutType === layoutTypes.schedule
    ) {
      nextYear();
    } else {
      nextWeek();
    }
  };
  return {
    layout,
    setLayout,
    layoutType,
    setLayoutType,
    layoutTypes,
    dimension,
    setDimension,
    prevPage,
    nextPage,
  };
};
