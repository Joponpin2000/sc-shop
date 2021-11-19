import React from "react";
import "./Category.css";

const Category = () => {
  return (
    <div className="CategoryContainer">
      <div className="category-title">Category Name</div>
      <div className="product-container">
        {Array(8)
          .fill("")
          .map((product, index) => (
            <div key={index} className="product-card">
              <div className="product-img">
                <img src="/images/sample-product-image.png" alt="product" />
                <div className="out-of-stock-flag">
                  <p>OUT OF STOCK</p>
                </div>
              </div>
              <div className="product-desc">
                <p className="product-name"> Apollo Running Short</p>
                <p className="product-price">$50.00</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Category;
