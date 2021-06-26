import styles from './Block.module.scss';
import Description from './Description';
function Block({
  schedules = [],
  addNewListener,
  showScheduleDescription,
  height = 95,
  close = () => {},
  draggable = false,
}) {
  // console.log(showScheduleDescription);
  return (
    <>
      {showScheduleDescription && schedules.length && (
        <Description
          schedules={schedules}
          vertical="c"
          horizontal="r"
          close={close}
        />
      )}

      <div
        style={{
          height: `${height}%`,
          cursor: schedules.length && draggable ? 'move' : 'inherit',
        }}
        className={[
          styles.block,
          !schedules.length ? 'non-draggable' : '',
          !schedules.length ? styles.emptyBlock : '',
        ].join(' ')}
        onClick={() => {
          if (!schedules.length) {
            addNewListener();
          }
        }}
      >
        {schedules.map((schedule) => (
          <p className={styles.scheduleText} key={schedule.id}>
            <span className={styles.dot}></span>
            {schedule.title}
          </p>
        ))}
      </div>
    </>
  );
}
export default Block;
