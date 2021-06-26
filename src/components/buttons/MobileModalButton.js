import styles from './MobileModalButton.module.scss';
function MobileModalButton({ icon, text, active = false, onClick }) {
  return (
    <div
      className={[styles.button, active ? styles.active : ''].join(' ')}
      onClick={onClick}
    >
      <span className="material-icons-outlined">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

export default MobileModalButton;
