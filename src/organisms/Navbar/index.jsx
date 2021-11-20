import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import CaretDownIcon from "../../vectors/CaretDownIcon";
import CartIcon from "../../vectors/CartIcon";
import LogoIcon from "../../vectors/LogoIcon";
import "./Navbar.css";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      isCurrencyPopupOpen: false,
      isCartPopupOpen: false,
    };
  }

  setIsCurrencyPopupOpen(value) {
    this.setState({ isCurrencyPopupOpen: value });
  }
  setIsCartPopupOpen(value) {
    this.setState({ isCartPopupOpen: value });
  }
  render() {
    return (
      <>
        <div className="nav">
          <nav className="nav-links">
            <NavLink className="nav-item" to="/women" activeStyle>
              WOMEN
            </NavLink>
            <NavLink className="nav-item" to="/men" activeStyle>
              MEN
            </NavLink>
            <NavLink className="nav-item" to="kids" activeStyle>
              KIDS
            </NavLink>
          </nav>
          <NavLink className="nav-item home-icon" to="/" activeStyle>
            <LogoIcon />
          </NavLink>
          <div className="nav-actions">
            <div className="currency-switcher">
              <div
                className="currency-switcher-box"
                onClick={() =>
                  this.setIsCurrencyPopupOpen(!this.state.isCurrencyPopupOpen)
                }
              >
                <div className="currency">$</div>
                <CaretDownIcon />
              </div>
              {this.state.isCurrencyPopupOpen && (
                <div className="currency-switcher-popup">
                  <div className="currency-item">$ USD</div>
                  <div className="currency-item">€ EUR</div>
                  <div className="currency-item">¥ JPY</div>
                </div>
              )}
            </div>

            <div className="cartIcon-container">
              <div
                className="cart-switch-box"
                onClick={() =>
                  this.setIsCartPopupOpen(!this.state.isCartPopupOpen)
                }
              >
                <CartIcon />
              </div>
              {this.state.isCartPopupOpen && (
                <div className="cart-popup-overlay">
                  <div className="cart-popup">
                    <p className="cart-title">
                      <span className="bold-text">My Bag,</span> 2 items
                    </p>
                    <div className="cart-list">
                      {Array(4)
                        .fill("")
                        .map((product, index) => (
                          <div className="cart-item" key={index}>
                            <div className="cart-item-desc">
                              <p className="cart-item-name">
                                Apollo Running Short
                              </p>
                              <p className="cart-item-price">$50.00</p>
                              <div className="cart-product-sizes">
                                <div className="cart-product-size-box">S</div>
                                <div className="cart-product-size-box">M</div>
                              </div>
                            </div>
                            <div className="cart-item-img">
                              <div className="cart-item-actions">
                                <div className="cart-item-mutate-btn">+</div>
                                <p className="cart-item-number">2</p>
                                <div className="cart-item-mutate-btn">-</div>
                              </div>
                              <img
                                src="/images/sample-product-image.png"
                                alt="cart item"
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className="cart-popup-footer">
                      <div className="cart-total-box">
                        <p className="cart-total-label">Total</p>
                        <p className="cart-total-value">$100.00</p>
                      </div>
                      <div className="cart-popup-btns">
                        <Link
                          to="/cart"
                          className="cart-popup-link"
                          onClick={() => this.setIsCartPopupOpen(false)}
                        >
                          <button className="view-btn">VIEW BAG</button>
                        </Link>
                        <div className="space-divider" />
                        <button className="checkout-btn">CHECK OUT</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Navbar;
