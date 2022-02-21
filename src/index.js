import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import { getComment } from './store/actions/comment.action';
import { getUser } from './store/actions/user.action';
import rootReducer from './store/reducers'
import "./styles/index.scss";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

store.dispatch(getComment())
store.dispatch(getUser())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);