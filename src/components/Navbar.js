import { useEffect, useState } from 'react';
import LightButton from '../shared/LightButton';
import MaterialIcon from '../shared/MaterialIcon';
import { useDateState } from '../state/dateState';
import { useGridState } from '../state/gridState';
import styles from './Navbar.module.scss';

function Navbar() {
  const { weekString, nextWeek, prevWeek } = useDateState();
  const { layoutTypes, setLayoutType, layoutType } = useGridState();
  const [selectingLayoutType, setSelectingLayoutType] = useState(false);
  useEffect(() => {
    window.addEventListener('click', () => {
      // console.log('window clicked');
      setSelectingLayoutType(false);
    });
  }, []);
  return (
    <div className={styles.navbar}>
      <LightButton>Today</LightButton>
      <div className={styles.monthDetails}>
        <MaterialIcon type="navigate_before" onClick={prevWeek} />
        <MaterialIcon type="navigate_next" onClick={nextWeek} />
        <p className={styles.currentString}>{weekString}</p>
      </div>
      <LightButton
        onClick={(e) => {
          // console.log('button clicked');
          e.stopPropagation();
          setSelectingLayoutType(true);
        }}
      >
        <div className={styles.selector}>
          <span className={styles.typeText}>{layoutType}</span>
          <span
            class="material-icons-outlined"
            style={{
              transform: `translateX(7px)`,
            }}
          >
            arrow_drop_down
          </span>
          {selectingLayoutType && (
            <div className={styles.layoutOptions}>
              {Object.keys(layoutTypes).map((layout) => (
                <p
                  key={layout}
                  className={styles.option}
                  onClick={(e) => {
                    // console.log('option clicked');
                    e.stopPropagation();
                    setSelectingLayoutType(false);
                    setLayoutType(layout);
                  }}
                >
                  {layout}
                </p>
              ))}
            </div>
          )}
        </div>
      </LightButton>
    </div>
  );
}

export default Navbar;
