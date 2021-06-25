import styles from './Description.module.scss';
import MaterialIcon from '../shared/MaterialIcon';
import { getDayAndDate, getTime12HourWithMinutes } from '../helpers/dateHelper';
import schedulesApi from '../api/schedulesApi';
import { useInfoState } from '../state/infoState';
function Description({
  schedules = [],
  vertical,
  horizontal,
  style = {},
  close = () => {},
}) {
  const { loadedSchedules, setLoadedSchedules } = useInfoState();
  // console.log(schedule);
  const remove = async (id) => {
    const data = await schedulesApi.remove(id);
    // console.log(data);
    setLoadedSchedules((prev) => {
      return prev.filter((schedule) => schedule.id !== id);
    });
  };
  return (
    <div
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
            <MaterialIcon type="edit" meta="outlined" />
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
                    <MaterialIcon type="edit" meta="outlined" />
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
