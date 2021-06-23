import { useEffect } from 'react';
import styles from './App.module.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import First from './pages/First';
function App() {
  useEffect(() => {
    (async () => {
      console.log(process.env.REACT_APP_SERVER_URL);
      const response = await fetch(process.env.REACT_APP_SERVER_URL);
      const data = await response.json();
      console.log(data);
    })();
  }, []);
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/first">
            <First />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
