import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import { getComment } from './store/actions/comment.action';
import { getUser } from './store/actions/user.action';
import rootReducer from './store/reducers'
import "./styles/index.scss";

const store = createStore(
  rootReducer
)

store.dispatch(getComment())
store.dispatch(getUser())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);