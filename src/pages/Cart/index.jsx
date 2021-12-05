import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import {
  getCurrency,
  changeCurrency,
} from "../../redux/actions/currencyActions";
import CaretDownIcon from "../../vectors/CaretDownIcon";

import "./Cart.css";

export class CartPage extends Component {
  constructor() {
    super();
    this.state = {
      selectedSizeIndex: [],
      displayImageIndex: [],
    };
    this.setSelectedSizeIndex = this.setSelectedSizeIndex.bind(this);
    this.setDisplayImageIndex = this.setDisplayImageIndex.bind(this);
  }

  setSelectedSizeIndex(attr, indx) {
    this.state.selectedSizeIndex.filter((obj) => obj.name === attr)[0]?.name
      ? this.setState({
          selectedSizeIndex: [
            ...this.state.selectedSizeIndex.filter((obj) => obj.name !== attr),
            { name: attr, value: indx },
          ],
        })
      : this.setState({
          selectedSizeIndex: [
            ...this.state.selectedSizeIndex,
            { name: attr, value: indx },
          ],
        });
  }
  setDisplayImageIndex(item, indx) {
    this.state.displayImageIndex.filter((obj) => obj.name === item)[0]?.name
      ? this.setState({
          displayImageIndex: [
            ...this.state.displayImageIndex.filter((obj) => obj.name !== item),
            { name: item, value: indx },
          ],
        })
      : this.setState({
          displayImageIndex: [
            ...this.state.displayImageIndex,
            { name: item, value: indx },
          ],
        });
  }
  render() {
    return (
      <div className="CartContainer">
        <h1 className="page-title">CART</h1>
        {this.props.cartItems.length > 0 ? (
          this.props.cartItems.map((item, index) => (
            <div className="cart-screen-item" key={index}>
              <div className="cs-item-desc">
                <div className="cs-item-name">{item.name}</div>
                <div className="cs-item-price">
                  {this.props.currency.symbol}
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
                        this.props.addToCart(item, item.qty, item.sizes, [
                          ...item.selectedSize.filter((_, i) => i !== 0),
                          {
                            name: item.selectedSize[0].name,
                            value: indx,
                          },
                        ])
                      }
                      key={indx}
                      className={`cs-size-box ${
                        item.selectedSize[0]?.value === indx ||
                        item.selectedSize === indx
                          ? "selected-size"
                          : ""
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
                <div className="img-div">
                  <div
                    style={{
                      cursor:
                        (this.state.displayImageIndex.filter(
                          (obj) => obj.name === item?.id
                        )[0]?.value ?? 0) > 0
                          ? "pointer"
                          : "not-allowed",
                    }}
                    onClick={() =>
                      (this.state.displayImageIndex.filter(
                        (obj) => obj.name === item?.id
                      )[0]?.value ?? 0) > 0 &&
                      this.setDisplayImageIndex(
                        item?.id,
                        this.state.displayImageIndex.filter(
                          (obj) => obj.name === item?.id
                        )[0]?.value - 1
                      )
                    }
                    className="img-toggle img-left-toggle"
                  >
                    <CaretDownIcon />
                  </div>
                  <img
                    src={
                      item.gallery[
                        this.state.displayImageIndex.filter(
                          (obj) => obj.name === item?.id
                        )[0]?.value ?? 0
                      ]
                    }
                    alt="cart item"
                  />
                  <div
                    onClick={() =>
                      (this.state.displayImageIndex.filter(
                        (obj) => obj.name === item?.id
                      )[0]?.value ?? 0) <
                        item?.gallery?.length - 1 &&
                      this.setDisplayImageIndex(
                        item?.id,
                        (this.state.displayImageIndex.filter(
                          (obj) => obj.name === item?.id
                        )[0]?.value ?? 0) + 1
                      )
                    }
                    style={{
                      cursor:
                        (this.state.displayImageIndex.filter(
                          (obj) => obj.name === item?.id
                        )[0]?.value ?? 0) <
                        item?.gallery?.length - 1
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
          ))
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "50px",
              // fontSize: 30,
              fontWeight: "lighter",
            }}
          >
            Cart is Empty
          </div>
        )}
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
