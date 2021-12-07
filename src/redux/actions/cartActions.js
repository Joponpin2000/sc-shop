import { setCookie } from "../../helpers/cookies";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_GET_NUMBER } from "./types";

export const addToCart =
  (product, qty, attributes, selectedSize) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CART_ADD_ITEM,
        payload: {
          id: product.id,
          name: product.name,
          gallery: product.gallery,
          prices: product.prices,
          qty,
          attributes,
          selectedSize,
        },
      });

      const {
        cart: { cartItems },
      } = getState();
      setCookie("cartItems", JSON.stringify(cartItems));
    } catch (error) {}
  };

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId,
  });

  const {
    cart: { cartItems },
  } = getState();
  setCookie("cartItems", JSON.stringify(cartItems));
};

export const getNumbersOfItems = () => {
  return (dispatch) =>
    dispatch({
      type: CART_GET_NUMBER,
    });
};
