import { useEffect } from 'react';
import ScheduleCard from '../components/inputCards/ScheduleCard';
import BatchCard from '../components/inputCards/BatchCard';
import TeacherCard from '../components/inputCards/TeacherCard';
import styles from './Home.module.scss';
import { useGridState } from '../state/gridState';

import { useInfoState } from '../state/infoState';
import CalenderLayout from '../components/layouts/CalenderLayout';
import MonthLayout from '../components/layouts/MonthLayout';
import WeekLayout from '../components/layouts/WeekLayout';
import Create from '../components/buttons/Create';
import schedulesApi from '../api/schedulesApi';
import { useEditState } from '../state/editState';
import { useSwipeable } from 'react-swipeable';
import batchesApi from '../api/batchesApi';
import teachersApi from '../api/teachersApi';
function Home() {
  const { layoutType, layoutTypes, nextPage, prevPage } = useGridState();
  const { setLoadedSchedules, setLoadedBatches, setLoadedTeachers } =
    useInfoState();
  const { editingSchedule, editingTeacher, editingBatch } = useEditState();

  useEffect(() => {
    // console.log(currentWeek);
    (async () => {
      const fetchedSchedules = await schedulesApi.getMultiple();
      if (fetchedSchedules.length) {
        setLoadedSchedules(fetchedSchedules);
      }
      const fetchedBatches = await batchesApi.getMultiple();
      if (fetchedBatches.length) {
        setLoadedBatches(fetchedBatches);
      }
      const fetchedTeachers = await teachersApi.getMultiple();
      if (fetchedTeachers.length) {
        // console.log(fetchedTeachers);
        setLoadedTeachers(fetchedTeachers);
      }
    })();
  }, [setLoadedBatches, setLoadedSchedules]);
  const handlers = useSwipeable({
    onSwipedLeft: (e) => {
      // console.log(e);
      nextPage();
    },
    onSwipedRight: (e) => {
      // console.log(e);
      prevPage();
    },
    // trackMouse: true,
  });
  return (
    <div className={styles.home}>
      <Create />
      {editingSchedule ? (
        <ScheduleCard />
      ) : editingBatch ? (
        <BatchCard />
      ) : editingTeacher ? (
        <TeacherCard />
      ) : null}
      <div className={styles.layout} {...handlers}>
        {layoutType === layoutTypes.year ? (
          <CalenderLayout />
        ) : layoutType === layoutTypes.month ? (
          <MonthLayout />
        ) : (
          <WeekLayout />
        )}
      </div>
    </div>
  );
}

export default Home;
