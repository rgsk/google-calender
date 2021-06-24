import styles from './LightButton.module.scss';
function LightButton({ children, onClick }) {
  return (
    <span className={styles.lightButton} onClick={onClick}>
      {children}
    </span>
  );
}

export default LightButton;
