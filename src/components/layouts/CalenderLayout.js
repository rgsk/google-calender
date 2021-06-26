import Calendar from 'rc-year-calendar';
import { useState } from 'react';
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
export default CalenderLayout;
