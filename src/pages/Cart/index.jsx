import React, { Component } from "react";
import { connect } from "react-redux";
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
          <div className="cart-screen-item">
            <div className="cs-item-desc">
              <div className="cs-item-name">{item.productName}</div>
              <div className="cs-item-price">
                {this.props.currency.symbol}{" "}
                {
                  item.productPrices.find(
                    (p) => p.currency === this.props.currency.name
                  ).amount
                }
              </div>
              <div className="cs-sizes">
                <div className="cs-size-box">S</div>
                <div className="cs-size-box">M</div>
              </div>
            </div>
            <div className="cs-item-side">
              <div className="cs-item-actions">
                <div className="cs-item-mutate-btn">+</div>
                <p className="cs-item-number">2</p>
                <div className="cs-item-mutate-btn">-</div>
              </div>
              <img src="/images/sample-product-image.png" alt="cart item" />
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
export default connect(mapStateToProps, { getCurrency, changeCurrency })(
  CartPage
);
