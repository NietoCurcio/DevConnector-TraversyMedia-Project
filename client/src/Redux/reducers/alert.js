import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initalState = [];
//   {
//     id: 1,
//     msg: 'Please log in',
//     alertType: 'success',
//   },
// list of alerts

export default function (state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload]; //... = keep everything is already there
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
