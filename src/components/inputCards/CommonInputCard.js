import styles from './CommonInputCard.module.scss';
import MaterialIcon from '../buttons/MaterialIcon';
import StyledButton from '../buttons/StyledButton';
import { useState } from 'react';

function CommonInputCard({ children, save, close }) {
  const [showBorder, setShowBorder] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <MaterialIcon type="close" onClick={close} />
      </div>

      <div
        className={styles.mid}
        onScroll={(e) => {
          // console.log(e.target.scrollHeight);
          // console.log(e.target.scrollTop);
          // console.log(e.target.offsetHeight);
          if (
            e.target.offsetHeight + e.target.scrollTop ===
            e.target.scrollHeight
          ) {
            setShowBorder(false);
          } else {
            setShowBorder(true);
          }
        }}
      >
        {children}
      </div>

      <div
        className={[styles.bottom, showBorder ? styles.borderTop : ''].join(
          ' '
        )}
      >
        <StyledButton onClick={save}>Save</StyledButton>
      </div>
    </div>
  );
}

export default CommonInputCard;
