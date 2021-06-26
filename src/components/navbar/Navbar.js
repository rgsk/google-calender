import { useEffect, useState } from 'react';
import { monthNames } from '../../helpers/names';
import LightButton from '../buttons/LightButton';
import MaterialIcon from '../buttons/MaterialIcon';
import { useDateState } from '../../state/dateState';
import { useEditState } from '../../state/editState';
import { useGridState } from '../../state/gridState';
import styles from './Navbar.module.scss';
import DropDown from '../shared/DropDown';

import SideModal from '../shared/SideModal';
import MobileModalButton from '../buttons/MobileModalButton';
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
  const [showSideModal, setShowSideModal] = useState(false);
  const dateString =
    layoutType === layoutTypes.month
      ? monthNames[currentMonth] + ' ' + currentYear
      : layoutType === layoutTypes.year
      ? currentYear
      : layoutType === layoutTypes.day
      ? weeks[currentWeek][0].getDate() + ' ' + weekString
      : weekString;
  return (
    <div>
      <div className={styles.desktopNavbar}>
        <div className={styles.header}>
          <img
            src="https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_26_2x.png"
            alt="icon"
          />
          <p>Schedular</p>
        </div>
        <div className={styles.rest}>
          <LightButton onClick={() => setEditingBatch(true)}>
            Add Batch
          </LightButton>
          <LightButton onClick={() => setEditingTeacher(true)}>
            Add Teacher
          </LightButton>

          <div className={styles.spacer}></div>

          <LightButton onClick={switchToCurrentDate}>Today</LightButton>
          <div className={styles.monthDetails}>
            <MaterialIcon type="navigate_before" onClick={prevPage} />
            <MaterialIcon type="navigate_next" onClick={nextPage} />
            <p className={styles.dateString}>{dateString}</p>
          </div>
          <div className={styles.spacer}></div>
          <MaterialIcon type="search" />
          <MaterialIcon type="help_outline" />
          <MaterialIcon type="settings" meta="outlined" />
          <DropDown
            options={Object.keys(layoutTypes)}
            setOption={setLayoutType}
            selectedOption={layoutType}
          />
        </div>
      </div>
      <div className={styles.mobileNavbar}>
        <span
          className="material-icons-outlined"
          onClick={() => {
            setShowSideModal(true);
          }}
        >
          menu
        </span>

        <p className={styles.dateString}>{dateString}</p>
        <div className={styles.spacer}></div>
        <span className="material-icons-outlined">search</span>
        <span className="material-icons-outlined">calendar_today</span>
        <span className="material-icons-outlined">more_vert</span>
        <SideModal show={showSideModal} close={() => setShowSideModal(false)}>
          <div className={styles.modalContent}>
            <h2 className={styles.title}>Classroom Schedular</h2>
            <MobileModalButton
              icon="view_agenda"
              text="Schedule"
              onClick={() => {
                setLayoutType(layoutTypes['schedule']);
                setShowSideModal(false);
              }}
            />
            <MobileModalButton
              icon="view_day"
              text="Day"
              active={layoutType === layoutTypes.day}
              onClick={() => {
                setLayoutType(layoutTypes['day']);
                setShowSideModal(false);
              }}
            />
            <MobileModalButton
              icon="view_week"
              text="3 Days"
              active={layoutType === layoutTypes['3 days']}
              onClick={() => {
                setLayoutType(layoutTypes['3 days']);
                setShowSideModal(false);
              }}
            />
            <MobileModalButton
              icon="calendar_view_week"
              text="Week"
              active={layoutType === layoutTypes.week}
              onClick={() => {
                setLayoutType(layoutTypes['week']);
                setShowSideModal(false);
              }}
            />
            <MobileModalButton
              icon="calendar_view_month"
              text="Month"
              active={layoutType === layoutTypes.month}
              onClick={() => {
                setLayoutType(layoutTypes['month']);
                setShowSideModal(false);
              }}
            />
          </div>
        </SideModal>
      </div>
    </div>
  );
}

export default Navbar;
