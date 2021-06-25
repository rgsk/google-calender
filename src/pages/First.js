import { percent, range } from '../helpers/utils';

import styles from './First.module.scss';
function First() {
  return (
    <div className={styles.container}>
      <span class="material-icons">pie_chart</span>

      <div className={styles.grid}>
        {range(0, 167).map((v) => (
          <p key={v}>gdf</p>
        ))}
      </div>
    </div>
  );
}

export default First;
