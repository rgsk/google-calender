import styles from './DropDown.module.scss';
import { useEffect, useState } from 'react';
import LightButton from '../buttons/LightButton';

function DropDown({
  options,
  setOption,
  selectedOption,
  methodBeforeDisplay = (val) => val,
}) {
  const [dropDownActive, setDropdownActive] = useState(false);

  useEffect(() => {
    window.addEventListener('click', () => {
      // console.log('window clicked');
      setDropdownActive(false);
    });
  }, []);
  return (
    <LightButton
      onClick={(e) => {
        // console.log('button clicked');
        e.stopPropagation();
        setDropdownActive(true);
      }}
    >
      <div className={styles.selector}>
        <span className={styles.typeText}>
          {methodBeforeDisplay(selectedOption)}
        </span>
        <span
          class="material-icons-outlined"
          style={{
            transform: `translateX(7px)`,
          }}
        >
          arrow_drop_down
        </span>
        {dropDownActive && (
          <div className={styles.options}>
            {options.map((option) => (
              <p
                key={option}
                className={styles.option}
                onClick={(e) => {
                  // console.log('option clicked');
                  e.stopPropagation();
                  setDropdownActive(false);
                  setOption(option);
                }}
              >
                {methodBeforeDisplay(option)}
              </p>
            ))}
          </div>
        )}
      </div>
    </LightButton>
  );
}

export default DropDown;
