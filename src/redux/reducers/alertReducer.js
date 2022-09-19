import { SHOW_ALERT, HIDE_ALERT } from "../types";

// Each readucer has its own state

const initialState = { alerta: null };

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_ALERT:
      return { ...state, alert: action.payload };
    case HIDE_ALERT:
      return { ...state, alerta: null };
    default:
      return state;
  }
}
