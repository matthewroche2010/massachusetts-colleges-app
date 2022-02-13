import React from 'react';
import {Root} from './components/root';
import ReactDOM from 'react-dom';
import store from './store';
import {Provider} from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <Root/>
  </Provider>,
  document.getElementById('appContainer'),
);
