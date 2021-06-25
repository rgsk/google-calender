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
      if (value) {
        setEditingBatch(false);
        setEditingTeacher(false);
      }
      setEditingSchedule(value);
    },
    editingBatch,
    setEditingBatch,
    editingTeacher,
    setEditingTeacher,
    editStartTime,
    setEditStartTIme,
    editEndTime,
    setEditEndTime,
    editedSchedule,
    setEditedSchedule,
  };
};
