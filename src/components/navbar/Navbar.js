import { useEffect, useState } from 'react';
import { monthNames } from '../../helpers/names';
import LightButton from '../buttons/LightButton';
import MaterialIcon from '../buttons/MaterialIcon';
import { useDateState } from '../../state/dateState';
import { useEditState } from '../../state/editState';
import { useGridState } from '../../state/gridState';
import styles from './Navbar.module.scss';
import DropDown from '../shared/DropDown';
import { CSSTransition } from 'react-transition-group';
function Navbar() {
  const { weekString, currentMonth, currentYear, weeks, currentWeek } =
    useDateState();
  const {
    layoutTypes,
    setLayoutType,
    layoutType,
    nextPage,
    prevPage,
    switchToCurrentDate,
  } = useGridState();
  const { setEditingBatch, setEditingTeacher } = useEditState();

  return (
    <div className={styles.navbar}>
      <LightButton onClick={() => setEditingBatch(true)}>Add Batch</LightButton>
      <LightButton onClick={() => setEditingTeacher(true)}>
        Add Teacher
      </LightButton>
      <LightButton onClick={switchToCurrentDate}>Today</LightButton>
      <div className={styles.monthDetails}>
        <MaterialIcon type="navigate_before" onClick={prevPage} />
        <MaterialIcon type="navigate_next" onClick={nextPage} />
        <p className={styles.currentString}>
          {layoutType === layoutTypes.month
            ? monthNames[currentMonth] + ' ' + currentYear
            : layoutType === layoutTypes.year
            ? currentYear
            : layoutType === layoutTypes.day
            ? weeks[currentWeek][0].getDate() + ' ' + weekString
            : weekString}
        </p>
      </div>
      <DropDown
        options={Object.keys(layoutTypes)}
        setOption={setLayoutType}
        selectedOption={layoutType}
      />
    </div>
  );
}

export default Navbar;
