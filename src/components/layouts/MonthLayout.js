import styles from './GridLayout.module.scss';
import { useEditState } from '../../state/editState';
import { useInfoState } from '../../state/infoState';
import { useDateState } from '../../state/dateState';
import { useGridState } from '../../state/gridState';
import { useState, useEffect } from 'react';
import { dayNames, monthNames } from '../../helpers/names';
import { percent, range } from '../../helpers/utils';
import GridLayout from 'react-grid-layout';
import Block from '../scheduleView/Block';
function MonthLayout() {
  const {
    setEditingSchedule,
    setEditEndTime,
    setEditStartTIme,

    setEditedSchedule,
  } = useEditState();
  const { months, currentMonth } = useDateState();
  const { loadedSchedules } = useInfoState();
  const { dimension, layout } = useGridState();
  const [showScheduleDescription, setShowScheduleDescription] = useState({});
  useEffect(() => {
    window.addEventListener('click', (e) => {
      // console.log(e);
      setShowScheduleDescription({});
    });
  }, []);
  const getSchedules = (date) => {
    // console.log(idx);
    // console.log(date);
    const schedules = [];
    loadedSchedules.forEach((schedule) => {
      if (
        schedule.start_time &&
        date &&
        schedule.start_time.getFullYear() === date.getFullYear() &&
        schedule.start_time.getMonth() === date.getMonth() &&
        schedule.start_time.getDate() === date.getDate()
      ) {
        // console.log(schedule);
        schedules.push(schedule);
      }
    });
    return schedules;
  };
  const itemClickListener = (date) => {
    setEditStartTIme(date);
    setEditEndTime(
      new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59)
    );
    setEditedSchedule(null);
    setEditingSchedule(true);
  };
  const getDateString = (date) => {
    if (!date) return '';
    if (date.getDate() === 1) {
      return 1 + ' ' + monthNames[date.getMonth()].slice(0, 3);
    }
    return date.getDate();
  };
  return (
    <div
      className={styles.gridContainer}
      style={{
        marginTop: '2rem',
      }}
    >
      <div
        className={styles.columnGrid}
        style={{
          width: '100%',
        }}
      >
        <div
          className={styles.columnNames}
          style={{
            gridTemplateColumns: `repeat(${dimension.cols}, 1fr)`,
          }}
        >
          {range(0, dimension.cols).map((v) => (
            <p key={v} className={styles.column}>
              {dayNames[v]?.slice(0, 3)}
            </p>
          ))}
        </div>
        <div
          className={styles.gridParent}
          style={{
            maxHeight: `${dimension.rows * (dimension.rowLength + 10) + 10}px`,
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
            width={percent(window.innerWidth, 99)}
            isResizable={false}
            isDraggable={false}
          >
            {range(0, dimension.rows * dimension.cols).map((v) => (
              <div
                key={`${v}`}
                className={styles.wrapper}
                style={{
                  zIndex: showScheduleDescription[v] ? 1 : 0,
                }}
                onClick={(e) => {
                  // console.log('clicked');
                  e.stopPropagation();
                  setShowScheduleDescription({ [v]: true });
                }}
              >
                <div
                  className={styles.title}
                  style={{
                    transform: `translateY(${-5 + v / 5}px)`,
                  }}
                >
                  {getDateString(months[currentMonth][v])}
                </div>
                <Block
                  schedules={getSchedules(months[currentMonth][v])}
                  addNewListener={() => {
                    itemClickListener(months[currentMonth][v]);
                  }}
                  index={v}
                  showScheduleDescription={showScheduleDescription[v]}
                  height={75}
                  close={() => {
                    // console.log('close clicked');
                    setShowScheduleDescription({});
                  }}
                />
              </div>
            ))}
          </GridLayout>
        </div>
      </div>
    </div>
  );
}
export default MonthLayout;
