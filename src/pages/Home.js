import { useState, useEffect } from 'react';
import _ from 'lodash';
import GridLayout from 'react-grid-layout';
import { percent, range } from '../helpers/utils';
import ScheduleCard from '../components/ScheduleCard';
import styles from './Home.module.scss';
import { useGridState } from '../state/gridState';
import Calendar from 'rc-year-calendar';
import { useDateState } from '../state/dateState';
import { dayNames } from '../helpers/names';
import { getTime12Hour } from '../helpers/dateHelper';
function Home() {
  const {
    layout,
    setLayout,
    layoutType,
    layoutTypes,
    setLayoutType,
    dimension,
  } = useGridState();
  const { currentWeek, prevWeek, nextWeek, currentYear, weeks } =
    useDateState();
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
      <div className={styles.create} onClick={() => setShowScheduleCard(true)}>
        <svg width="36" height="36" viewBox="0 0 36 36">
          <path fill="#34A853" d="M16 16v14h4V20z"></path>
          <path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
          <path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
          <path fill="#EA4335" d="M20 16V6h-4v14z"></path>
          <path fill="none" d="M0 0h36v36H0z"></path>
        </svg>
        Create
      </div>

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
          {layoutType !== layoutTypes.month && (
            <div className={styles.rowNames}>
              {range(0, dimension.rows).map((v) => (
                <p
                  key={v}
                  style={{
                    height: dimension.rowLength + v / 30 + 'px',
                  }}
                >
                  {v === 0 ? 'GMT+05:30' : getTime12Hour(v)}
                </p>
              ))}
            </div>
          )}

          <div className={styles.columnGrid}>
            <div
              className={styles.columnNames}
              style={{
                gridTemplateColumns: `repeat(${dimension.cols}, 1fr)`,
              }}
            >
              {range(0, dimension.cols).map((v) => (
                <p key={v} className={styles.column}>
                  <span>{dayNames[v].slice(0, 3)}</span>
                  <span>{weeks[currentWeek][v].getDate()}</span>
                </p>
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
              <div
                className={styles.mask}
                style={{
                  gridTemplateColumns: `repeat(${dimension.cols}, 1fr)`,
                }}
              >
                {range(0, dimension.rows * dimension.cols).map((v) => (
                  <div key={`${v}`} className={styles.tab}></div>
                ))}
              </div>
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
