import { useState, useEffect } from 'react';
import _ from 'lodash';
import GridLayout from 'react-grid-layout';
import { percent, range } from '../helpers/utils';
import ScheduleCard from '../components/ScheduleCard';
import styles from './Home.module.scss';
import { useGridState } from '../state/gridState';
import Calendar from 'rc-year-calendar';
import { getWeeks } from '../helpers/dateHelper';
import { useDateState } from '../state/dateState';
const week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const weeks = getWeeks(2021);
function Home() {
  const {
    layout,
    setLayout,
    layoutType,
    layoutTypes,
    setLayoutType,
    dimension,
  } = useGridState();
  const { currentWeek, prevWeek, nextWeek, currentYear } = useDateState();
  const [showScheduleCard, setShowScheduleCard] = useState(false);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const itemClickListener = (rs, cs, re, ce) => {
    // console.log(rs, cs, re, ce);
    const date = weeks[currentWeek][cs];
    // console.log(date);
    const localStartTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      rs
    );
    const localEndTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      re
    );
    // console.log(localStartTime.toLocaleString());
    // console.log(localEndTime.toLocaleString());
    // console.log(date);
    setStartTime(localStartTime);
    setEndTime(localEndTime);
    setShowScheduleCard(true);
  };

  return (
    <div className={styles.home}>
      <p onClick={() => setShowScheduleCard(true)}>Home</p>
      <p onClick={() => setLayoutType(layoutTypes['day'])}>day</p>
      <p onClick={() => setLayoutType(layoutTypes['year'])}>year</p>
      <p onClick={() => setLayoutType(layoutTypes['week'])}>week</p>
      <p onClick={() => setLayoutType(layoutTypes['month'])}>month</p>
      <p onClick={() => setLayoutType(layoutTypes['4 days'])}>4 days</p>
      <p onClick={prevWeek}>prev week</p>
      <p onClick={nextWeek}>next week</p>
      {showScheduleCard && (
        <ScheduleCard
          close={() => setShowScheduleCard(false)}
          initialStartTime={startTime}
          initialEndTime={endTime}
        />
      )}
      {layoutType === layoutTypes.year ? (
        <Calendar
          minDate={new Date()}
          onDayClick={({ date, events }) => {
            console.log(date);
          }}
        />
      ) : (
        <div className={styles.gridContainer}>
          <div className={styles.rowNames}>
            {range(0, dimension.rows).map((v) => (
              <p
                key={v}
                style={{
                  height: dimension.rowLength + 'px',
                }}
              >
                {v}
              </p>
            ))}
          </div>
          <div className={styles.columnGrid}>
            <div className={styles.columnNames}>
              {range(0, dimension.cols).map((v) => (
                <p key={v}>{week[v]}</p>
              ))}
            </div>
            <div
              className={styles.gridParent}
              style={{
                maxHeight: `${
                  dimension.rows * (dimension.rowLength + 10) + 10
                }px`,
              }}
            >
              <GridLayout
                className={['layout', styles.grid].join(' ')}
                layout={layout}
                cols={dimension.cols}
                rowHeight={dimension.rowLength}
                draggableCancel=".non-draggable"
                width={percent(window.innerWidth, 89)}
                onResizeStop={(layout) => {
                  // console.log(layout);
                  setLayout(layout);
                }}
                onDragStop={(layout) => {
                  // console.log(layout);
                  setLayout(layout);
                }}
                isResizable={true}
                resizeHandles={['s']}
              >
                {range(0, dimension.rows * dimension.cols).map((v) => (
                  <div
                    key={`${v}`}
                    className={styles.wrapper}
                    onClick={() => {
                      // console.log(layout[v]);
                      itemClickListener(
                        layout[v].y,
                        layout[v].x,
                        layout[v].y + layout[v].h,
                        layout[v].x + layout[v].w
                      );
                    }}
                  >
                    <div className={styles.block}>{v}</div>
                  </div>
                ))}
              </GridLayout>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
