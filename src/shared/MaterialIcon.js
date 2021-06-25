import styles from './MaterialIcon.module.scss';
function MaterialIcon({ type, onClick = () => {}, meta }) {
  return (
    <span
      className={styles.icon}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <span className={meta ? `material-icons-${meta}` : `material-icons`}>
        {type}
      </span>
    </span>
  );
}

export default MaterialIcon;
