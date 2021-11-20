import { CHANGE_CURRENCY, GET_CURRENCY } from "./types";

export function getCurrency() {
  return function (dispatch) {
    dispatch({
      type: GET_CURRENCY,
    });
  };
}

export function changeCurrency(data) {
  return function (dispatch) {
    dispatch({
      type: CHANGE_CURRENCY,
      payload: data,
    });
  };
}
