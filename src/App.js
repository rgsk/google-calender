import { useEffect } from 'react';
import styles from './App.module.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import First from './pages/First';
import Navbar from './components/navbar/Navbar';
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
    <BrowserRouter>
      <div className={styles.app}>
        <Navbar />
        <div className={styles.rest}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/first">
              <First />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
