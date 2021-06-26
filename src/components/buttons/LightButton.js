import styles from './LightButton.module.scss';
function LightButton({ children, onClick, hovered }) {
  return (
    <span
      className={[styles.lightButton, hovered ? styles.hovered : ''].join(' ')}
      onClick={onClick}
    >
      {children}
    </span>
  );
}

export default LightButton;
