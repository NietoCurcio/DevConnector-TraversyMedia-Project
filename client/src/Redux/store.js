import { createStore, applyMiddleware } from 'redux';
// thunk is a middleware
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initalState = {};
// because all our initalState will be in reducers
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// call something whenever and wherever we want, then put this in the state

export default store;
