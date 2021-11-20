import React, { Component } from "react";
import "./Cart.css";

export class CartPage extends Component {
  render() {
    return (
      <div className="CartContainer">
        <h1 className="page-title">CART</h1>
        {Array(4)
          .fill("")
          .map((item, index) => (
            <div className="cart-screen-item">
              <div className="cs-item-desc">
                <div className="cs-item-name">Apollo Running Short</div>
                <div className="cs-item-price">$50.00</div>
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

export default CartPage;
