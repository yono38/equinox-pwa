import React from 'react';
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import classReducer from './reducers';

import Home from './Home';
import ClassListApp from './components/ClassListApp';
import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    modules: classReducer,
    routing: routerReducer
  }),
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

const history = syncHistoryWithStore(browserHistory, store)

const BookableClasses = () => <ClassListApp bookableOnly={true} />;

render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Home} />
      <Route path="/classes" component={ClassListApp} />
      <Route path="/bookClasses" component={BookableClasses} />
    </Router>
  </Provider>
), document.getElementById('root'))
