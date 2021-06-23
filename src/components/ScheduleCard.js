import { useState } from 'react';
import TimeInput from 'react-time-picker-input';
import DatePicker from 'react-datepicker';
import { getDuration } from '../helpers/utils';
import styles from './ScheduleCard.module.scss';
import MaterialIcon from '../shared/MaterialIcon';
import StyledButton from '../shared/StyledButton';
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
  close = () => {},
}) {
  const [title, setTitle] = useState('');
  const [scheduleDate, setScheduleDate] = useState(initialStartTime);
  const [startTime, setStartTime] = useState(getTime(initialStartTime));
  const [endTime, setEndTime] = useState(getTime(initialEndTime));

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
    const response = await fetch('http://localhost:5000/schedules', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        batch_id: 1,
        title,
        start_time: serverStartTime,
        end_time: serverEndTime,
        duration: serverDuration,
      }),
    });
    const data = await response.json();
    console.log(data);
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
