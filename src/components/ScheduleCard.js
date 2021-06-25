import { useState } from 'react';
import TimeInput from 'react-time-picker-input';
import DatePicker from 'react-datepicker';
import { getDuration } from '../helpers/utils';
import styles from './ScheduleCard.module.scss';
import MaterialIcon from '../shared/MaterialIcon';
import StyledButton from '../shared/StyledButton';
import { useDateState } from '../state/dateState';
import schedulesApi from '../api/schedulesApi';
import { useInfoState } from '../state/infoState';
const getTime = (date) => {
  // for timepicker to work properly
  // we need to time string formatted as 12:32
  return (
    `${date.getHours()}`.padStart(2, 0) +
    ':' +
    `${date.getMinutes()}`.padStart(2, 0)
  );
};
function Card({
  initialStartTime = new Date(),
  initialEndTime = new Date(),
  schedule = null,
  close = () => {},
}) {
  const { setLoadedSchedules } = useInfoState();
  const [title, setTitle] = useState(() => {
    if (schedule) {
      return schedule.title;
    } else {
      return '';
    }
  });
  const [scheduleDate, setScheduleDate] = useState(() => {
    if (schedule) {
      // editing
      return schedule.start_time;
    } else {
      return initialStartTime;
    }
  });
  const [startTime, setStartTime] = useState(() => {
    if (schedule) {
      return getTime(schedule.start_time);
    } else {
      return getTime(initialStartTime);
    }
  });
  const [endTime, setEndTime] = useState(() => {
    if (schedule) {
      return getTime(schedule.end_time);
    } else {
      return getTime(initialEndTime);
    }
  });

  const save = async () => {
    // console.log(scheduleDate);
    const date = `${scheduleDate.getFullYear()}-${
      scheduleDate.getMonth() + 1
    }-${scheduleDate.getDate()}`;
    // console.log(date);
    // return;
    const serverDuration = getDuration(startTime, endTime);
    // console.log(serverDuration);

    const serverStartTime = date + ' ' + startTime;
    const serverEndTime = date + ' ' + endTime;
    // console.log(serverStartTime);
    // console.log(serverEndTime);
    if (schedule) {
      const data = await schedulesApi.update(schedule.id, {
        batch_id: 1,
        title,
        start_time: serverStartTime,
        end_time: serverEndTime,
        duration: serverDuration,
      });

      // console.log(data);
      if (data.entry) {
        setLoadedSchedules((prevSchedules) => {
          return prevSchedules.map((s) => {
            if (s.id === schedule.id) {
              return data.entry;
            }
            return s;
          });
        });
        close();
      }
    } else {
      const data = await schedulesApi.create({
        batch_id: 1,
        title,
        start_time: serverStartTime,
        end_time: serverEndTime,
        duration: serverDuration,
      });

      // console.log(data);
      if (data.entry) {
        setLoadedSchedules((prevSchedules) => [...prevSchedules, data.entry]);
        close();
      }
    }

    // close();
  };
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <MaterialIcon type="close" onClick={close} />
      </div>
      <div className={styles.rest}>
        <div className={styles.mid}>
          <div className={styles.title}>
            <input
              type="text"
              placeholder="Add title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.dateTime}>
            <div className={styles.date}>
              <span className="material-icons-outlined">date_range</span>

              <div className={styles.picker}>
                <DatePicker
                  selected={scheduleDate}
                  dateFormat={'dd/MM/yyyy'}
                  onChange={(date) => setScheduleDate(date)}
                />
              </div>
            </div>
            <div className={styles.time}>
              <span className="material-icons-outlined">schedule</span>
              <div>
                <TimeInput
                  hour12Format
                  value={startTime}
                  allowDelete
                  onChange={(dateString) => setStartTime(dateString)}
                />
              </div>
              <div>&#8212;</div>
              <div>
                <TimeInput
                  hour12Format
                  value={endTime}
                  allowDelete
                  onChange={(dateString) => setEndTime(dateString)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <StyledButton onClick={save}>Save</StyledButton>
        </div>
      </div>
    </div>
  );
}

export default Card;
