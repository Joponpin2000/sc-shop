import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_GET_NUMBER,
} from "../actions/types";

export default function cartReducer(state = { cartItems: [] }, action) {
  switch (action.type) {
    case CART_GET_NUMBER:
      return state;
    case CART_ADD_ITEM:
      const item = action.payload;
      const product = state.cartItems.find((x) => x.id === item.id);
      if (product) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.id === product.id ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter((x) => x.id !== action.payload),
      };

    default:
      return state;
  }
}
