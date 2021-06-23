import { useValState } from '../state/valState';
import { percent, range } from '../helpers/utils';

import styles from './First.module.scss';
function First() {
  const { val, setVal } = useValState();
  return (
    <div className={styles.container}>
      <span class="material-icons">pie_chart</span>
      <p>{val}</p>
      <button onClick={() => setVal(val + 1)}>incr</button>
      <div className={styles.grid}>
        {range(0, 167).map((v) => (
          <p key={v}>gdf</p>
        ))}
      </div>
    </div>
  );
}

export default First;
