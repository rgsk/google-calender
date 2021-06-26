import styles from './CommonInputCard.module.scss';
import MaterialIcon from '../buttons/MaterialIcon';
import StyledButton from '../buttons/StyledButton';

function CommonInputCard({ children, save, close }) {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <MaterialIcon type="close" onClick={close} />
      </div>
      <div className={styles.rest}>
        <div className={styles.mid}>{children}</div>
        <div className={styles.bottom}>
          <StyledButton onClick={save}>Save</StyledButton>
        </div>
      </div>
    </div>
  );
}

export default CommonInputCard;
