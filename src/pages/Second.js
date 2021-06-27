import styles from './Second.module.scss';
import Line from '../components/shared/Line';
import { useState } from 'react';
function Second() {
  const [show, setShow] = useState(false);
  return (
    <div className={styles.second}>
      second
      <button onClick={() => setShow(!show)}>button</button>
      <Line show={show} />
    </div>
  );
}

export default Second;
