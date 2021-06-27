import styles from './Line.module.scss';
import { useEffect, useState } from 'react';
function Line({ show, style = {} }) {
  const [showLine, setShowLine] = useState(false);
  const [runHideAnimation, setRunHideAnimation] = useState(false);
  useEffect(() => {
    if (show && !showLine) {
      setShowLine(true);
    } else if (!show && showLine) {
      setRunHideAnimation(true);
      setTimeout(() => {
        setShowLine(false);
        setRunHideAnimation(false);
      }, 300);
    }
  }, [show]);
  return (
    <>
      <div className={styles.dummyLine} style={style}>
        {showLine && (
          <div
            className={[styles.line, runHideAnimation ? styles.hide : ''].join(
              ' '
            )}
          ></div>
        )}
      </div>
    </>
  );
}

export default Line;
