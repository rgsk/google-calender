import { useEffect } from 'react';
import styles from './App.module.scss';
function App() {
  useEffect(() => {
    (async () => {
      const response = await fetch(process.env.REACT_APP_SERVER_URL);
      const data = await response.json();
      console.log(data);
    })();
  }, []);
  return <div className={styles.app}>App</div>;
}

export default App;
