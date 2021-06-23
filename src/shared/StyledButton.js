import styles from './StyledButton.module.scss';
function StyledButton({ children, onClick }) {
  return (
    <div className={styles.button} onClick={onClick}>
      {children}
    </div>
  );
}

export default StyledButton;
