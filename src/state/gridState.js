import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
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
  useEffect(() => {
    switch (layoutType) {
      case layoutTypes['day']:
        setDimension({
          rows: 24,
          cols: 1,
          rowLength: 100,
        });
        break;
      case layoutTypes['week']:
        setDimension({
          rows: 24,
          cols: 7,
          rowLength: 100,
        });
        break;
      case layoutTypes['month']:
        setDimension({
          rows: 5,
          cols: 7,
          rowLength: 150,
        });

        break;
      case layoutTypes['schedule']:
        setDimension((prevDimension) => ({
          ...prevDimension,
          rows: 24,
          cols: 7,
        }));
        break;
      case layoutTypes['4 days']:
        setDimension({
          rows: 24,
          cols: 4,
          rowLength: 100,
        });
        break;
      default:
    }
  }, [layoutType, setDimension]);
  useEffect(() => {
    setLayout(createLayout(dimension.rows, dimension.cols));
  }, [dimension, setLayout]);
  return {
    layout,
    setLayout,
    layoutType,
    setLayoutType,
    layoutTypes,
    dimension,
    setDimension,
  };
};
