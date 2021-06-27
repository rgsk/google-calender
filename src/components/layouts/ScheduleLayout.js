import { useState, useEffect } from 'react';
import { useInfoState } from '../../state/infoState';
import { useDateState } from '../../state/dateState';

import styles from './ScheduleLayout.module.scss';
import { dayNames } from '../../helpers/names';
function ScheduleLayout() {
  const { currentYear } = useDateState();
  const { loadedSchedules } = useInfoState();
  const [currentYearSchedules, setCurrentYearSchedules] = useState([]);
  useEffect(() => {
    setCurrentYearSchedules(() => {
      const arr = [];
      for (let schedule of loadedSchedules) {
        if (schedule.start_time.getFullYear() === currentYear) {
          arr.push(schedule);
        }
      }
      return arr;
    });
  }, [currentYear]);
  return (
    <div className={styles.scheduleLayout}>
      <div className={styles.schedules}>
        {currentYearSchedules.map((schedule) => (
          <div key={schedule.id}>{schedule.title}</div>
        ))}
      </div>
    </div>
  );
}

export default ScheduleLayout;
