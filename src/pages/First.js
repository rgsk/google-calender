import { useState } from 'react';
import styles from './First.module.scss';
function First() {
  const [showLine, setShowLine] = useState(false);
  const [runHideAnimation, setRunHideAnimation] = useState(false);
  return (
    <div className={styles.container}>
      <button
        onClick={() => {
          if (showLine === false) {
            setShowLine(true);
          } else {
            setRunHideAnimation(true);
            setTimeout(() => {
              setShowLine(false);
              setRunHideAnimation(false);
            }, 300);
          }
        }}
      >
        show
      </button>
      {showLine && (
        <div
          className={[styles.line, runHideAnimation ? styles.hide : ''].join(
            ' '
          )}
        ></div>
      )}
    </div>
  );
}

export default First;
