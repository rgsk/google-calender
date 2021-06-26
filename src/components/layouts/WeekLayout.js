import styles from './GridLayout.module.scss';
import { useEditState } from '../../state/editState';
import { useInfoState } from '../../state/infoState';
import { useDateState } from '../../state/dateState';
import { useGridState } from '../../state/gridState';
import { useState, useEffect } from 'react';
import { dayNames } from '../../helpers/names';
import { percent, range, objectsAreSame } from '../../helpers/utils';
import GridLayout from 'react-grid-layout';
import Block from '../scheduleView/Block';
import schedulesApi from '../../api/schedulesApi';
import {
  addDuration,
  getDateTimeForServer,
  getTime12Hour,
} from '../../helpers/dateHelper';
function WeekLayout() {
  const {
    setEditingSchedule,
    setEditEndTime,
    setEditStartTIme,

    setEditedSchedule,
  } = useEditState();
  const { weeks, currentWeek } = useDateState();
  const { loadedSchedules, setLoadedSchedules } = useInfoState();
  const { dimension, layout, setLayout } = useGridState();
  const [curI, setCurI] = useState();
  const [showScheduleDescription, setShowScheduleDescription] = useState({});
  useEffect(() => {
    window.addEventListener('click', (e) => {
      // console.log(e);
      setShowScheduleDescription({});
    });
  }, []);
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
          let h = schedule.end_time.getHours() - schedule.start_time.getHours();

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
    const startPositionOfMovedBlock = layout.find((block) => block.i === curI);
    // console.log(startPositionOfMovedBlock);
    const schedulesMoved = getSchedules(startPositionOfMovedBlock);
    // console.log(schedulesMoved);
    const endPositionOfMovedBlock = newLayout.find((block) => block.i === curI);
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
                  draggable
                />
              </div>
            ))}
          </GridLayout>
        </div>
      </div>
    </div>
  );
}
export default WeekLayout;
