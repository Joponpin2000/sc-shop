import React, { Component } from "react";
import "./ProductDetails.css";

export class ProductDetails extends Component {
  render() {
    return (
      <div className="ProductDetailsContainer">
        <div className="side-images">
          <img src="/images/sample-product-image.png" alt="" />
          <img src="/images/sample-product-image.png" alt="" />
          <img src="/images/sample-product-image.png" alt="" />
        </div>
        <div className="product-img">
          <img src="/images/sample-product-image.png" alt="" />
        </div>
        <div className="product-details">
          <h3 className="product-name">Apollo Running Short</h3>
          <div className="product-sizes-container">
            <p className="label-text">SIZE:</p>
            <div className="different-sizes">
              <div className="single-size-box">XS</div>

              <div className="single-size-box">S</div>
              <div className="single-size-box">M</div>
              <div className="single-size-box">L</div>
            </div>
          </div>
          <div className="product-price-container">
            <p className="label-text">PRICE:</p>
            <p className="price">$50.00</p>
          </div>
          <button className="add-to-cart-btn">ADD TO CART</button>
          <div className="product-desc">
            Find stunning women's cocktail dresses and party dresses. Stand out
            in lace and metallic cocktail dresses and party dresses from all
            your favorite brands.
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetails;
