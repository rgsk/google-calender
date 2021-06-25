import { atom, useRecoilState } from 'recoil';
const editingState = atom({
  key: 'editingState',
  default: false,
});
const editStartTimeState = atom({
  key: 'editStartTimeState',
  default: new Date(),
});
const editEndTimeState = atom({
  key: 'editEndTimeState',
  default: new Date(),
});
const editedScheduleState = atom({
  key: 'editedScheduleState',
  default: null,
});
export const useEditState = () => {
  const [editing, setEditing] = useRecoilState(editingState);
  const [editStartTime, setEditStartTIme] = useRecoilState(editStartTimeState);
  const [editEndTime, setEditEndTime] = useRecoilState(editEndTimeState);
  const [editedSchedule, setEditedSchedule] =
    useRecoilState(editedScheduleState);
  return {
    editing,
    setEditing,
    editStartTime,
    setEditStartTIme,
    editEndTime,
    setEditEndTime,
    editedSchedule,
    setEditedSchedule,
  };
};
