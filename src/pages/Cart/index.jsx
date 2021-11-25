import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import {
  getCurrency,
  changeCurrency,
} from "../../redux/actions/currencyActions";

import "./Cart.css";

export class CartPage extends Component {
  render() {
    return (
      <div className="CartContainer">
        <h1 className="page-title">CART</h1>
        {this.props.cartItems.map((item, index) => (
          <div className="cart-screen-item" key={index}>
            <div className="cs-item-desc">
              <div className="cs-item-name">{item.name}</div>
              <div className="cs-item-price">
                {this.props.currency.symbol}{" "}
                {
                  item.prices.find(
                    (p) => p.currency === this.props.currency.name
                  ).amount
                }
              </div>
              <div className="cs-sizes">
                {item.sizes.map((s, indx) => (
                  <div
                    onClick={() =>
                      this.props.addToCart(item, item.qty, item.sizes, indx)
                    }
                    key={indx}
                    className={`cs-size-box ${
                      item.selectedSize === indx ? "selected-size" : ""
                    }`}
                  >
                    {s.value}
                  </div>
                ))}
              </div>
            </div>
            <div className="cs-item-side">
              <div className="cs-item-actions">
                <div
                  className="cs-item-mutate-btn"
                  onClick={() =>
                    this.props.addToCart(
                      item,
                      item.qty + 1,
                      item.sizes,
                      item.selectedSize
                    )
                  }
                >
                  +
                </div>
                <p className="cs-item-number">{item.qty}</p>
                <div
                  className={`cs-item-mutate-btn ${
                    item.qty === 1 ? "disabled" : ""
                  }`}
                  onClick={() =>
                    this.props.addToCart(
                      item,
                      item.qty === 1 ? 1 : item.qty - 1,
                      item.sizes,
                      item.selectedSize
                    )
                  }
                >
                  -
                </div>
              </div>
              <img src={item.gallery[0]} alt="cart item" />
            </div>
          </div>
        ))}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  currency: state.currency.selectedCurrency,
});
export default connect(mapStateToProps, {
  addToCart,
  getCurrency,
  changeCurrency,
})(CartPage);
