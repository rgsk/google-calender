import { useState } from 'react';
import TimeInput from 'react-time-picker-input';
import DatePicker from 'react-datepicker';
import styles from './ScheduleCard.module.scss';
import schedulesApi from '../../api/schedulesApi';
import { useInfoState } from '../../state/infoState';
import { useEditState } from '../../state/editState';
import { getDateForServer, getDuration } from '../../helpers/dateHelper';
import CommonInputCard from './CommonInputCard';
import DropDown from '../shared/DropDown';

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
  const { editStartTime, editEndTime, editedSchedule, setEditingSchedule } =
    useEditState();
  const { setLoadedSchedules, loadedBatches, loadedTeachers } = useInfoState();
  const [batch, setBatch] = useState(loadedBatches[0]);
  const [teacher, setTeacher] = useState(loadedTeachers[0]);
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
  const close = () => {
    setEditingSchedule(false);
  };
  const save = async () => {
    // console.log(scheduleDate);
    const date = getDateForServer(scheduleDate);
    // console.log(date);
    // return;
    const serverDuration = getDuration(startTime, endTime);
    // console.log(serverDuration);

    const serverStartTime = date + ' ' + startTime;
    const serverEndTime = date + ' ' + endTime;
    // console.log(serverStartTime);
    // console.log(serverEndTime);
    if (editedSchedule) {
      // updating the schedule
      const data = await schedulesApi.update(editedSchedule.id, {
        batch_id: batch.id,
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
        close();
      }
    } else {
      // saving the schedule
      const data = await schedulesApi.create({
        batch_id: batch.id,
        title,
        start_time: serverStartTime,
        end_time: serverEndTime,
        duration: serverDuration,
      });

      console.log(data);
      if (data.entry) {
        setLoadedSchedules((prevSchedules) => [...prevSchedules, data.entry]);
        close();
      }
    }

    // close();
  };
  return (
    <CommonInputCard save={save} close={close}>
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
      <div className={styles.batch}>
        <p className={styles.text}>Batch : </p>
        <DropDown
          options={loadedBatches}
          setOption={setBatch}
          selectedOption={batch}
          methodBeforeDisplay={(batch) => batch.name}
        />
      </div>
      <div className={styles.teacher}>
        <p className={styles.text}>Teacher : </p>
        <DropDown
          options={loadedTeachers}
          setOption={setTeacher}
          selectedOption={teacher}
          methodBeforeDisplay={(teacher) => teacher.name}
          type="text"
          optionsStyle={{
            maxHeight: `200px`,
            transform: `translateX(150px)`,
          }}
        />
      </div>
    </CommonInputCard>
  );
}

export default ScheduleCard;
