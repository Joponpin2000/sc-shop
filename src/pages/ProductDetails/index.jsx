import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { getCurrency } from "../../redux/actions/currencyActions";

import "./ProductDetails.css";

export class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      id: window.location.pathname.slice(9),
      product: {},
      selectedSizeIndex: -1,
    };
  }
  setSelectedSizeIndex(indx) {
    this.setState({ selectedSizeIndex: indx });
  }
  async componentDidMount() {
    try {
      var client = new ApolloClient({
        uri: "http://localhost:4000",
      });

      var { product } = await client
        .query({
          query: gql`
            query {
              product(id: "${this.state.id}") {
                id
                name
                inStock
                gallery
                description
                category
                attributes {
                  name
                  type
                  items {
                    displayValue
                    value
                    id
                  }
                }
                prices {
                  currency
                  amount
                }
                brand
              }
            }
          `,
          variables: { id: this.state.id },
        })
        .then((result) => result.data);
      this.setState({ product: product });
    } catch (exception) {
      console.error(exception);
    }
  }
  render() {
    return (
      this.state.product && (
        <div className="ProductDetailsContainer">
          <div className="side-images">
            {this.state.product?.gallery?.length > 0 &&
              this.state.product?.gallery
                .splice(0, 3)
                ?.map((i) => <img src={i} alt="gallery" />)}
          </div>
          <div className="product-img">
            {this.state.product.gallery && (
              <img src={this.state.product?.gallery[0]} alt="" />
            )}
          </div>
          <div className="product-details">
            <h3 className="product-name">{this.state.product?.name}</h3>
            <div className="product-sizes-container">
              <p className="label-text">SIZE:</p>
              {this.state.product.attributes && (
                <div className="different-sizes">
                  {this.state?.product?.attributes[0]?.items?.map((i, indx) => (
                    <div
                      key={indx}
                      onClick={() => this.setSelectedSizeIndex(indx)}
                      className={`single-size-box ${
                        this.state.selectedSizeIndex === indx
                          ? "selected-size"
                          : ""
                      }`}
                    >
                      {i?.value}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="product-price-container">
              <p className="label-text">PRICE:</p>
              <p className="price">
                {this.props.currency.symbol}
                {this.state.product.prices &&
                  this.state.product.prices.find(
                    (p) => p.currency === this.props.currency.name
                  ).amount}
              </p>
            </div>
            {this.state.product.inStock && (
              <button
                onClick={() => {
                  this.props.addToCart(
                    this.state.product,
                    1,
                    this.state?.product?.attributes[0]?.items,
                    this.state.selectedSizeIndex < 0
                      ? 0
                      : this.state.selectedSizeIndex
                  );
                }}
                className="add-to-cart-btn"
              >
                ADD TO CART
              </button>
            )}
            <div
              className="product-desc"
              dangerouslySetInnerHTML={{
                __html: this.state.product.description,
              }}
            ></div>
          </div>
        </div>
      )
    );
  }
}
const mapStateToProps = (state) => ({
  currency: state.currency.selectedCurrency,
});
export default connect(mapStateToProps, { getCurrency, addToCart })(
  ProductDetails
);
