/* eslint-disable react/style-prop-object */
import Calendar from 'rc-year-calendar';
import { useEffect, useState } from 'react';
import Description from '../scheduleView/Description';
import { useEditState } from '../../state/editState';
import { useInfoState } from '../../state/infoState';
import { useDateState } from '../../state/dateState';

import styles from './CalenderLayout.module.scss';
function CalenderLayout() {
  const {
    setEditingSchedule,
    setEditEndTime,
    setEditStartTIme,
    setEditedSchedule,
  } = useEditState();
  const { currentYear, setCurrentYear } = useDateState();
  const { loadedSchedules } = useInfoState();
  const itemClickListener = (date) => {
    setEditStartTIme(date);
    setEditEndTime(
      new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59)
    );
    setEditedSchedule(null);
    setEditingSchedule(true);
  };
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const [mousePosition, setMousePosition] = useState();
  useEffect(() => {
    window.addEventListener('click', () => {
      // console.log('clicked');
      setSelectedSchedules([]);
    });
  }, []);
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
            top: ` ${mousePosition.y - 120}px`,
            left: `${mousePosition.x + 30}px`,
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
            setSelectedSchedules([]);
            setSelectedSchedules(events.map((event) => event.schedule));
          } else {
            // since window click handler is not listening on day click
            // so we need to close
            // opened schedule first
            setSelectedSchedules([]);
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
export default CalenderLayout;
