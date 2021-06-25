import styles from './CommonInputCard.module.scss';
import { useEditState } from '../state/editState';
import MaterialIcon from '../shared/MaterialIcon';
import StyledButton from '../shared/StyledButton';

function CommonInputCard({ children, save, close }) {
  const { setEditing } = useEditState();
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
