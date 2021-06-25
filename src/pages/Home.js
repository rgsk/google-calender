import { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import { objectsAreSame, percent, range } from '../helpers/utils';
import ScheduleCard from '../components/ScheduleCard';
import styles from './Home.module.scss';
import { useGridState } from '../state/gridState';
import Calendar from 'rc-year-calendar';
import Block from './Block';
import { useDateState } from '../state/dateState';
import { dayNames, monthNames } from '../helpers/names';
import { useInfoState } from '../state/infoState';

import {
  addDuration,
  constructDateForKeysWithISOFormat,
  getDateTimeForServer,
  getTime12Hour,
} from '../helpers/dateHelper';
import Description from './Description';
import schedulesApi from '../api/schedulesApi';
import { useEditState } from '../state/editState';
import BatchCard from '../components/BatchCard';
import TeacherCard from '../components/TeacherCard';
import batchesApi from '../api/batchesApi';
function Home() {
  const { layout, setLayout, layoutType, layoutTypes, dimension } =
    useGridState();
  const {
    currentWeek,
    weeks,

    months,
    currentMonth,
    currentYear,
    setCurrentYear,
  } = useDateState();
  const { loadedSchedules, setLoadedSchedules, setLoadedBatches } =
    useInfoState();
  const {
    setEditingSchedule,
    setEditEndTime,
    setEditStartTIme,
    editingSchedule,
    setEditedSchedule,
    editingTeacher,
    editingBatch,
  } = useEditState();
  const [showScheduleDescription, setShowScheduleDescription] = useState({});
  useEffect(() => {
    // console.log(currentWeek);
    (async () => {
      const fetchedSchedules = await schedulesApi.getMultiple();
      if (fetchedSchedules.length) {
        setLoadedSchedules(fetchedSchedules);
      }
      const fetchedBatches = await batchesApi.getMultiple();
      if (fetchedBatches.length) {
        setLoadedBatches(fetchedBatches);
      }
    })();
  }, []);
  useEffect(() => {
    window.addEventListener('click', (e) => {
      // console.log(e);
      setShowScheduleDescription({});
    });
  }, []);

  const itemClickListener = (date) => {
    setEditStartTIme(date);
    setEditEndTime(
      new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59)
    );
    setEditedSchedule(null);
    setEditingSchedule(true);
  };
  return (
    <div className={styles.home}>
      <div className={styles.create} onClick={() => setEditingSchedule(true)}>
        <svg width="36" height="36" viewBox="0 0 36 36">
          <path fill="#34A853" d="M16 16v14h4V20z"></path>
          <path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
          <path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
          <path fill="#EA4335" d="M20 16V6h-4v14z"></path>
          <path fill="none" d="M0 0h36v36H0z"></path>
        </svg>
        <span>Create</span>
      </div>

      {editingSchedule ? (
        <ScheduleCard />
      ) : editingBatch ? (
        <BatchCard />
      ) : editingTeacher ? (
        <TeacherCard />
      ) : null}

      {layoutType === layoutTypes.year ? (
        <CalenderLayout />
      ) : layoutType === layoutTypes.month ? (
        <MonthLayout />
      ) : (
        <WeekLayout />
      )}
    </div>
  );
  function CalenderLayout() {
    const [selectedSchedules, setSelectedSchedules] = useState([]);
    const [mousePosition, setMousePosition] = useState();
    return (
      <div
        onClickCapture={(e) => {
          // console.log(e);
          // console.log(selectedSchedule);
          setMousePosition({
            x: e.pageX,
            y: e.pageY,
          });
        }}
        className={styles.calenderWrapper}
      >
        {selectedSchedules.length && (
          <Description
            schedules={selectedSchedules}
            style={{
              transform: `translate(${mousePosition.x}px, ${
                mousePosition.y - 65
              }px)`,
            }}
            close={() => setSelectedSchedules([])}
          />
        )}
        <Calendar
          minDate={new Date(2015)}
          style="background"
          onDayClick={({ date, events }) => {
            // console.log(date);
            // console.log(events);
            if (events.length) {
              setSelectedSchedules(events.map((event) => event.schedule));
            } else {
              itemClickListener(date);
            }
          }}
          dataSource={loadedSchedules.map((schedule) => ({
            schedule,
            startDate: schedule.start_time,
            endDate: schedule.end_time,
          }))}
          year={currentYear}
          onYearChanged={({ currentYear: selectedYear }) => {
            // console.log(selectedYear);
            setCurrentYear(selectedYear);
          }}
        />
      </div>
    );
  }
  function MonthLayout() {
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
  function WeekLayout() {
    const [curI, setCurI] = useState();
    const getSchedules = (block, idx = -1) => {
      // rs, cs, re, ce
      const rs = block.y;
      const cs = block.x;
      const re = block.y + block.h;
      const ce = block.x + block.w;
      // console.log(currentWeekSchedules);
      const date = weeks[currentWeek][cs];
      if (!date) return;
      // console.log(date);
      const localStartTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        rs
      );
      const schedules = [];
      loadedSchedules.forEach((schedule) => {
        if (
          schedule.start_time.getFullYear() === date.getFullYear() &&
          schedule.start_time.getMonth() === date.getMonth() &&
          schedule.start_time.getDate() === date.getDate() &&
          schedule.start_time.getHours() === localStartTime.getHours()
        ) {
          // console.log(schedule);
          schedules.push(schedule);
          if (idx !== -1) {
            let h =
              schedule.end_time.getHours() - schedule.start_time.getHours();

            if (schedule.end_time.getMinutes() > 0) {
              h++;
            }
            if (layout[idx].h < h) {
              setLayout((prevLayout) => {
                const updatedBlock = { ...prevLayout[idx], h };
                return prevLayout.map((v, i) => (i === idx ? updatedBlock : v));
              });
            }
          }
        }
      });
      return schedules;
    };
    const getStartAndEndTimeAccToPositionOfBlock = (block) => {
      const rs = block.y;
      const cs = block.x;
      const re = block.y + block.h;
      const ce = block.x + block.w;
      // console.log(rs, cs, re, ce);
      const date = weeks[currentWeek][cs];
      // console.log(date);
      const startTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        rs
      );
      const endTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        re
      );
      return {
        startTime,
        endTime,
      };
    };
    const itemClickListener = (block) => {
      const times = getStartAndEndTimeAccToPositionOfBlock(block);
      setEditStartTIme(times.startTime);
      setEditEndTime(times.endTime);
      setEditedSchedule(null);
      setEditingSchedule(true);
    };
    const handleChangesInLayout = (newLayout) => {
      // console.log(layout);
      // console.log('start position');
      const startPositionOfMovedBlock = layout.find(
        (block) => block.i === curI
      );
      // console.log(startPositionOfMovedBlock);
      const schedulesMoved = getSchedules(startPositionOfMovedBlock);
      // console.log(schedulesMoved);
      const endPositionOfMovedBlock = newLayout.find(
        (block) => block.i === curI
      );
      // console.log('end position');
      // console.log(endPositionOfMovedBlock);
      const updatedTimes = getStartAndEndTimeAccToPositionOfBlock(
        endPositionOfMovedBlock
      );
      // console.log(updatedTimes);
      for (let schedule of schedulesMoved) {
        const updatedStartTime = updatedTimes.startTime;
        const updatedEndtime = addDuration(
          updatedTimes.startTime,
          schedule.duration
        );
        schedulesApi.update(schedule.id, {
          ...schedule,
          start_time: getDateTimeForServer(updatedStartTime),
          end_time: getDateTimeForServer(updatedEndtime),
        });

        setLoadedSchedules((prevSchedules) => {
          return prevSchedules.map((s) => {
            if (s.id === schedule.id) {
              return {
                ...s,
                start_time: updatedStartTime,
                end_time: updatedEndtime,
              };
            }
            return s;
          });
        });
      }
      //
      const changed = [];
      setLayout((prevLayout) => {
        for (let i = 0; i < prevLayout.length; i++) {
          if (!objectsAreSame(prevLayout[i], newLayout[i])) {
            changed.push({
              i: i,
              prev: prevLayout[i],
              cur: newLayout[i],
            });
          }
        }
        return newLayout;
      });
      // console.log(changed);
      for (let item of changed) {
        if (item.cur.h > item.prev.h) {
          // item expanded
          // console.log(item);
          itemClickListener(item.cur);
        }
      }
    };
    return (
      <div className={styles.gridContainer}>
        <div className={styles.rowNames} style={{ width: '10%' }}>
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

        <div className={styles.columnGrid} style={{ width: '90%' }}>
          <div
            className={styles.columnNames}
            style={{
              gridTemplateColumns: `repeat(${dimension.cols}, 1fr)`,
            }}
          >
            {range(0, dimension.cols).map((v) => (
              <p key={v} className={styles.column}>
                <span>
                  {dayNames[weeks[currentWeek][v]?.getDay()]?.slice(0, 3)}
                </span>
                <span>{weeks[currentWeek][v]?.getDate()}</span>
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
              onResizeStop={handleChangesInLayout}
              onDragStop={handleChangesInLayout}
              isResizable={true}
              resizeHandles={['s']}
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
                  onMouseDownCapture={(e) => {
                    setCurI(layout[v].i);
                  }}
                >
                  <Block
                    schedules={getSchedules(layout[v], v)}
                    addNewListener={() => {
                      itemClickListener(layout[v]);
                    }}
                    index={v}
                    showScheduleDescription={showScheduleDescription[v]}
                    close={() => setShowScheduleDescription({})}
                  />
                </div>
              ))}
            </GridLayout>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
