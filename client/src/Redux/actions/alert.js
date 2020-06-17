import { SET_ALERT, REMOVE_ALERT } from './types';
import { v4 as uuid } from 'uuid';

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  // in this way we can dispatch one more action type to the reducers
  // we can do that two arrows because thunk middleware
  const id = uuid();

  dispatch({
    type: SET_ALERT,
    payload: {
      msg,
      alertType,
      id,
    },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
