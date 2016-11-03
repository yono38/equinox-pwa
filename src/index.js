import React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import classReducer from './reducers';

import Home from './Home';
import ClassListApp from './components/ClassListApp';
import './index.css';

const store = createStore(classReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__())

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Home} />
      <Route path="/classes" component={ClassListApp} />
    </Router>
  </Provider>
), document.getElementById('root'))
