import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import App from './App';
import { getComment } from './store/actions/comment.action';
import rootReducer from './store/reducers'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) // a retirer en version prod
)

store.dispatch(getComment())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);