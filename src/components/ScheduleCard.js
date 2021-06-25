import { useState } from 'react';
import TimeInput from 'react-time-picker-input';
import DatePicker from 'react-datepicker';
import styles from './ScheduleCard.module.scss';
import MaterialIcon from '../shared/MaterialIcon';
import StyledButton from '../shared/StyledButton';
import schedulesApi from '../api/schedulesApi';
import { useInfoState } from '../state/infoState';
import { useEditState } from '../state/editState';
import { getDuration } from '../helpers/dateHelper';
import CommonInputCard from '../shared/CommonInputCard';
const getTime = (date) => {
  // for timepicker to work properly
  // we need to time string formatted as 12:32
  return (
    `${date.getHours()}`.padStart(2, 0) +
    ':' +
    `${date.getMinutes()}`.padStart(2, 0)
  );
};
function ScheduleCard() {
  const { editStartTime, editEndTime, editedSchedule, setEditing } =
    useEditState();
  const { setLoadedSchedules } = useInfoState();
  const [title, setTitle] = useState(() => {
    if (editedSchedule) {
      return editedSchedule.title;
    } else {
      return '';
    }
  });
  const [scheduleDate, setScheduleDate] = useState(() => {
    if (editedSchedule) {
      // editing
      return editedSchedule.start_time;
    } else {
      return editStartTime;
    }
  });
  const [startTime, setStartTime] = useState(() => {
    if (editedSchedule) {
      return getTime(editedSchedule.start_time);
    } else {
      return getTime(editStartTime);
    }
  });
  const [endTime, setEndTime] = useState(() => {
    if (editedSchedule) {
      return getTime(editedSchedule.end_time);
    } else {
      return getTime(editEndTime);
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
    if (editedSchedule) {
      const data = await schedulesApi.update(editedSchedule.id, {
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
            if (s.id === editedSchedule.id) {
              return data.entry;
            }
            return s;
          });
        });
        setEditing(false);
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
        setEditing(false);
      }
    }

    // close();
  };
  return (
    <CommonInputCard save={save}>
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
    </CommonInputCard>
  );
}

export default ScheduleCard;
