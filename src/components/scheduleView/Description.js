import styles from './Description.module.scss';
import MaterialIcon from './../buttons/MaterialIcon';
import {
  getDayAndDate,
  getTime12HourWithMinutes,
} from '../../helpers/dateHelper';
import schedulesApi from '../../api/schedulesApi';
import { useInfoState } from '../../state/infoState';
import { useEditState } from '../../state/editState';
import { useEffect, useRef } from 'react';
function Description({
  schedules = [],
  vertical,
  horizontal,
  style = {},
  close = () => {},
}) {
  const descriptionRef = useRef();
  const { loadedSchedules, setLoadedSchedules } = useInfoState();
  const { setEditingSchedule, setEditedSchedule } = useEditState();
  // console.log(schedule);
  const remove = async (id) => {
    const data = await schedulesApi.remove(id);
    // console.log(data);
    setLoadedSchedules((prev) => {
      return prev.filter((schedule) => schedule.id !== id);
    });
  };
  const edit = (schedule) => {
    setEditedSchedule(schedule);
    setEditingSchedule(true);
    close();
  };
  useEffect(() => {
    const descriptionBox = descriptionRef.current.getBoundingClientRect();
    // console.log(descriptionBox);
    // console.log(window.innerHeight);
    if (descriptionBox.right > window.innerWidth) {
      if (style.left) {
        descriptionRef.current.style.transform = `translateX(-120%)`;
      } else {
        descriptionRef.current.style.transform = `translateX(-100%)`;
        descriptionRef.current.style.left = '0%';
      }
    }
    if (descriptionBox.bottom > window.innerHeight) {
      descriptionRef.current.style.transform =
        descriptionRef.current.style.transform +
        ' ' +
        `translateY(-${descriptionBox.bottom - window.innerHeight}px)`;
    }
  }, []);

  return (
    <div
      ref={descriptionRef}
      className={styles.description}
      style={{
        top: vertical === 't' ? '-100%' : vertical === 'b' ? '100%' : '0%',
        left: horizontal === 'l' ? '-100%' : horizontal === 'r' ? '100%' : '0%',
        ...style,
      }}
    >
      <div className={styles.top}>
        {schedules.length === 1 && (
          <>
            <MaterialIcon
              type="edit"
              meta="outlined"
              onClick={() => edit(schedules[0])}
            />
            <MaterialIcon
              type="delete"
              meta="outlined"
              onClick={() => {
                remove(schedules[0].id);
              }}
            />
          </>
        )}

        <MaterialIcon type="close" onClick={close} />
      </div>
      <div className={styles.rest}>
        {schedules.map((schedule) => (
          <div className={styles.singleSchedule} key={schedule.id}>
            <div className={styles.marker}></div>
            <div className={styles.info}>
              <div className={styles.titleButtons}>
                <p className={styles.title}>{schedule.title}</p>
                {schedules.length > 1 && (
                  <p className={styles.buttons}>
                    <MaterialIcon
                      type="edit"
                      meta="outlined"
                      onClick={() => edit(schedule)}
                    />
                    <MaterialIcon
                      type="delete"
                      meta="outlined"
                      onClick={() => {
                        remove(schedule.id);
                      }}
                    />
                  </p>
                )}
              </div>
              <div className={styles.dateTime}>
                <p className={styles.date}>
                  {getDayAndDate(schedule.start_time)}
                </p>
                <p>&bull;</p>
                <p className={styles.time}>
                  <span>{getTime12HourWithMinutes(schedule.start_time)}</span>
                  <span>&#8212;</span>
                  <span>{getTime12HourWithMinutes(schedule.end_time)}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Description;
