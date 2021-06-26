import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { addDuration } from '../helpers/dateHelper';
const editingScheduleState = atom({
  key: 'editingScheduleState',
  default: false,
});
const editingBatchState = atom({
  key: 'editingBatchState',
  default: false,
});
const editingTeacherState = atom({
  key: 'editingTeacherState',
  default: false,
});
const editStartTimeState = atom({
  key: 'editStartTimeState',
  default: new Date(),
});
const editEndTimeState = atom({
  key: 'editEndTimeState',
  default: addDuration(new Date(), 60 * 60),
});
const editedScheduleState = atom({
  key: 'editedScheduleState',
  default: null,
});
export const useEditState = () => {
  const [editingSchedule, setEditingSchedule] =
    useRecoilState(editingScheduleState);
  const [editingBatch, setEditingBatch] = useRecoilState(editingBatchState);
  const [editingTeacher, setEditingTeacher] =
    useRecoilState(editingTeacherState);
  const [editStartTime, setEditStartTIme] = useRecoilState(editStartTimeState);
  const [editEndTime, setEditEndTime] = useRecoilState(editEndTimeState);
  const [editedSchedule, setEditedSchedule] =
    useRecoilState(editedScheduleState);

  return {
    editingSchedule,
    setEditingSchedule: (value) => {
      // this is done so that other 2 cards are closed
      // before opening new card

      // note with this pattern make sure you don't use
      // setEditingSchedule using the previous value
      // eg setEditingSchedule(prev => !prev)

      if (value) {
        setEditingBatch(false);
        setEditingTeacher(false);
      }
      setEditingSchedule(value);
    },
    editingBatch,
    setEditingBatch: (value) => {
      if (value) {
        setEditingSchedule(false);
        setEditingTeacher(false);
      }
      setEditingBatch(value);
    },
    editingTeacher,
    setEditingTeacher: (value) => {
      if (value) {
        setEditingSchedule(false);
        setEditingBatch(false);
      }
      setEditingTeacher(value);
    },
    editStartTime,
    setEditStartTIme,
    editEndTime,
    setEditEndTime,
    editedSchedule,
    setEditedSchedule,
  };
};
