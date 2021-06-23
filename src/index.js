import React from 'react';
import ReactDOM from 'react-dom';
import 'material-icons/iconfont/material-icons.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../node_modules/react-grid-layout/css/styles.css';

import './index.scss';
import App from './App';
import { RecoilRoot } from 'recoil';
import RecoilizeDebugger from 'recoilize-fixed';

const app = document.getElementById('root');

ReactDOM.render(
  <RecoilRoot>
    <RecoilizeDebugger root={app} />
    <App />
  </RecoilRoot>,
  app
);
