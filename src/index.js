import React from 'react';
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import moduleReducers from './reducers';
import { getAuthToken } from './utils';

import Home from './Home';
import ClassListApp from './components/ClassListApp';
import BookClass from './components/BookClass';
import Login from './components/Login';
import Calendar from './components/Calendar';
import Activity from './components/Activity';
import Settings from './components/Settings';
import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    modules: moduleReducers,
    routing: routerReducer
  }),
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

const history = syncHistoryWithStore(browserHistory, store)

function requireAuth(nextState, replaceState) {
  if (!getAuthToken()) {
    replaceState('/login');
  }
}

render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Home} onEnter={requireAuth} />
      <Route path="/login" component={Login} />
      <Route path="/classes" component={ClassListApp} onEnter={requireAuth} />
      <Route path="/classes/:classId" component={BookClass} onEnter={requireAuth} />
      <Route path="/calendar" component={Calendar} onEnter={requireAuth} />
      <Route path="/activity" component={Activity} onEnter={requireAuth} />
      <Route path="/settings" component={Settings} onEnter={requireAuth} />
    </Router>
  </Provider>
), document.getElementById('root'))
