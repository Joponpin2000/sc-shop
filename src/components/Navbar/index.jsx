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
      displayImageIndex: [],
    };

    this.currencyPopupRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.setDisplayImageIndex = this.setDisplayImageIndex.bind(this);
  }

  componentDidMount() {
    this.props.getCurrency();
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  handleClickOutside(event) {
    if (
      this.currencyPopupRef.current &&
      !this.currencyPopupRef.current.contains(event.target)
    ) {
      this.setState({ isCurrencyPopupOpen: false });
    }
  }
  setIsCurrencyPopupOpen(value) {
    this.setState({ isCurrencyPopupOpen: value });
  }
  setIsCartPopupOpen(value) {
    this.setState({ isCartPopupOpen: value });
  }
  setDisplayImageIndex(product, indx) {
    this.state.displayImageIndex.filter((obj) => obj.name === product)[0]?.name
      ? this.setState({
          displayImageIndex: [
            ...this.state.displayImageIndex.filter(
              (obj) => obj.name !== product
            ),
            { name: product, value: indx },
          ],
        })
      : this.setState({
          displayImageIndex: [
            ...this.state.displayImageIndex,
            { name: product, value: indx },
          ],
        });
  }
  render() {
    return (
      <>
        <div className="nav">
          <nav className="nav-links">
            <NavLink className="nav-item" to="/">
              All
            </NavLink>
            <NavLink className="nav-item" to="/clothes">
              CLOTHES
            </NavLink>
            <NavLink className="nav-item" to="/tech">
              TECH
            </NavLink>
          </nav>
          <NavLink className="nav-item home-icon" to="/">
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
                <div
                  className="currency-switcher-popup"
                  ref={this.currencyPopupRef}
                >
                  {this.state.currencies.map((c, index) => (
                    <div
                      className="currency-item"
                      key={`currency-${index}`}
                      onClick={() => {
                        this.props.changeCurrency(c);
                        this.setIsCurrencyPopupOpen(false);
                      }}
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
                      <span className="bold-text">My Bag,</span>
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
                              {product.sizes.map((s, indx) => (
                                <div
                                  onClick={() =>
                                    this.props.addToCart(
                                      product,
                                      product.qty,
                                      product.sizes,
                                      [
                                        ...product.selectedSize.filter(
                                          (_, i) => i !== 0
                                        ),
                                        {
                                          name: product.selectedSize[0].name,
                                          value: indx,
                                        },
                                      ]
                                    )
                                  }
                                  key={indx}
                                  className={`cart-product-size-box ${
                                    product.selectedSize[0]?.value === indx ||
                                    product.selectedSize === indx
                                      ? "selected-size"
                                      : ""
                                  }`}
                                >
                                  {s.value}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="cart-item-img">
                            <div className="cart-item-actions">
                              <div
                                className="cart-item-mutate-btn
                              "
                                onClick={() =>
                                  this.props.addToCart(
                                    product,
                                    product.qty + 1,
                                    product.sizes,
                                    product.selectedSize
                                  )
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
                                    product.qty === 1 ? 1 : product.qty - 1,
                                    product.sizes,
                                    product.selectedSize
                                  )
                                }
                              >
                                -
                              </div>
                            </div>
                            <div className="img-div">
                              <div
                                style={{
                                  cursor:
                                    (this.state.displayImageIndex.filter(
                                      (obj) => obj.name === product?.id
                                    )[0]?.value ?? 0) > 0
                                      ? "pointer"
                                      : "not-allowed",
                                }}
                                onClick={() =>
                                  (this.state.displayImageIndex.filter(
                                    (obj) => obj.name === product?.id
                                  )[0]?.value ?? 0) > 0 &&
                                  this.setDisplayImageIndex(
                                    product?.id,
                                    this.state.displayImageIndex.filter(
                                      (obj) => obj.name === product?.id
                                    )[0]?.value - 1
                                  )
                                }
                                className="img-toggle img-left-toggle"
                              >
                                <CaretDownIcon />
                              </div>
                              <img
                                src={
                                  product.gallery[
                                    this.state.displayImageIndex.filter(
                                      (obj) => obj.name === product?.id
                                    )[0]?.value ?? 0
                                  ]
                                }
                                alt="cart item"
                              />
                              <div
                                onClick={() =>
                                  (this.state.displayImageIndex.filter(
                                    (obj) => obj.name === product?.id
                                  )[0]?.value ?? 0) <
                                    product?.gallery?.length - 1 &&
                                  this.setDisplayImageIndex(
                                    product?.id,
                                    (this.state.displayImageIndex.filter(
                                      (obj) => obj.name === product?.id
                                    )[0]?.value ?? 0) + 1
                                  )
                                }
                                style={{
                                  cursor:
                                    (this.state.displayImageIndex.filter(
                                      (obj) => obj.name === product?.id
                                    )[0]?.value ?? 0) <
                                    product?.gallery?.length - 1
                                      ? "pointer"
                                      : "not-allowed",
                                }}
                                className="img-toggle img-right-toggle"
                              >
                                <CaretDownIcon />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="cart-popup-footer">
                      <div className="cart-total-box">
                        <p className="cart-total-label">Total</p>
                        <p className="cart-total-value">
                          {this.props.currency.symbol}
                          {
                            CurrencyMath(
                              this.props.cartItems
                                .map((item) => {
                                  return {
                                    qty: item.qty,
                                    price: item.prices.filter(
                                      (p) =>
                                        p.currency === this.props.currency.name
                                    ),
                                  };
                                })
                                .map((i) => {
                                  return {
                                    qty: i.qty,
                                    amount: i.price[0].amount,
                                  };
                                })
                                .reduce((v, acc) => v + acc.amount * acc.qty, 0)
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
