import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import CurrencyMath from "currency.js";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import {
  getCurrency,
  changeCurrency,
} from "../../redux/actions/currencyActions";

import CaretDownIcon from "../../vectors/CaretDownIcon";
import CartIcon from "../../vectors/CartIcon";
import LogoIcon from "../../vectors/LogoIcon";
import "./Navbar.css";

class Navbar extends Component {
  componentDidMount() {
    this.props.getCurrency();
  }
  constructor() {
    super();
    this.state = {
      isCurrencyPopupOpen: false,
      isCartPopupOpen: false,
      currencies: [
        { symbol: "$", name: "USD" },
        { symbol: "£", name: "GBP" },
        { symbol: "A$", name: "AUD" },
        { symbol: "¥", name: "JPY" },
        { symbol: "₽", name: "RUB" },
      ],
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
            <NavLink className="nav-item" to="/clothes" activestyle>
              CLOTHES
            </NavLink>
            <NavLink className="nav-item" to="/tech" activestyle>
              TECH
            </NavLink>
          </nav>
          <NavLink className="nav-item home-icon" to="/" activestyle>
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
                <div className="currency">{this.props.currency.symbol}</div>

                <CaretDownIcon />
              </div>
              {this.state.isCurrencyPopupOpen && (
                <div className="currency-switcher-popup">
                  {this.state.currencies.map((c, index) => (
                    <div
                      className="currency-item"
                      key={`currency-${index}`}
                      onClick={() => this.props.changeCurrency(c)}
                    >
                      {c.symbol + " " + c.name}
                    </div>
                  ))}
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
                <span className="cart-count">
                  <p>{this.props.cartItems.length}</p>
                </span>
              </div>
              {this.state.isCartPopupOpen && (
                <div className="cart-popup-overlay">
                  <div className="cart-popup">
                    <p className="cart-title">
                      <span className="bold-text">My Bag,</span>{" "}
                      {this.props.cartItems.length} items
                    </p>
                    <div className="cart-list">
                      {this.props.cartItems.map((product, index) => (
                        <div className="cart-item" key={index}>
                          <div className="cart-item-desc">
                            <p className="cart-item-name">{product.name}</p>
                            <p className="cart-item-price">
                              {this.props.currency.symbol}
                              {
                                product.prices.find(
                                  (p) => p.currency === this.props.currency.name
                                ).amount
                              }
                            </p>
                            <div className="cart-product-sizes">
                              <div className="cart-product-size-box">S</div>
                              <div className="cart-product-size-box">M</div>
                            </div>
                          </div>
                          <div className="cart-item-img">
                            <div className="cart-item-actions">
                              <div
                                className="cart-item-mutate-btn
                              "
                                onClick={() =>
                                  this.props.addToCart(product, product.qty + 1)
                                }
                              >
                                +
                              </div>
                              <p className="cart-item-number">{product.qty}</p>
                              <div
                                className={`cart-item-mutate-btn ${
                                  product.qty === 1 ? "disabled" : ""
                                }`}
                                onClick={() =>
                                  this.props.addToCart(
                                    product,
                                    product.qty === 1 ? 1 : product.qty - 1
                                  )
                                }
                              >
                                -
                              </div>
                            </div>
                            <img src={product.gallery[0]} alt="cart item" />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="cart-popup-footer">
                      <div className="cart-total-box">
                        <p className="cart-total-label">Total</p>
                        <p className="cart-total-value">
                          {" "}
                          {this.props.currency.symbol}
                          {/* {JSON.stringify(
                            this.props.cartItems.reduce((item, acc) => {
                              let cp = item.prices.find(
                                (p) => p.currency === this.props.currency.name
                              ).amount;
                              console.log("cp", cp);
                              return acc + cp;
                            })
                          )} */}
                          {
                            CurrencyMath(
                              this.props.cartItems
                                .map((item) =>
                                  item.prices.filter(
                                    (p) =>
                                      p.currency === this.props.currency.name
                                  )
                                )
                                .map((i) => i[0].amount)
                                .reduce((v, acc) => v + acc, 0)
                            ).value
                          }
                        </p>
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

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  currency: state.currency.selectedCurrency,
});
export default connect(mapStateToProps, {
  addToCart,
  getCurrency,
  changeCurrency,
})(Navbar);
