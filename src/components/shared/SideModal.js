import styles from './SideModal.module.scss';
import './SideModal.scss';
import { CSSTransition } from 'react-transition-group';
function SideModal({ show, close, children }) {
  return (
    <>
      <CSSTransition
        classNames={`visible-column`}
        timeout={500}
        in={show}
        unmountOnExit
      >
        <div className={styles.visibleColumn}>{children}</div>
      </CSSTransition>

      <CSSTransition
        classNames={`close-column`}
        timeout={500}
        in={show}
        unmountOnExit
      >
        <div className={styles.closeColumn} onClick={close}></div>
      </CSSTransition>
    </>
  );
}

export default SideModal;
