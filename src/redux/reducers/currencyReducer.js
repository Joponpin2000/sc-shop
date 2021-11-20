import { CHANGE_CURRENCY, GET_CURRENCY } from "../actions/types";

const initialState = {
  selectedCurrency: { symbol: "$", name: "USD" },
};

export default function currencyReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENCY:
      return state;
    case CHANGE_CURRENCY:
      return {
        ...state,
        selectedCurrency: action.payload,
      };
    default:
      return state;
  }
}
