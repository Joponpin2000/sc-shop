import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { getCurrency } from "../../redux/actions/currencyActions";
import TickIcon from "../../vectors/TickIcon";

import "./ProductDetails.css";

export class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      id: window.location.pathname.slice(9),
      product: {},
      selectedSizeIndex: [],
      displayImageIndex: 0,
    };
    this.setSelectedSizeIndex = this.setSelectedSizeIndex.bind(this);
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
  async componentDidMount() {
    const apiEndpoint = process.env.REACT_APP_GRAPHQL_API_ENDPOINT;
    try {
      var client = new ApolloClient({
        uri: apiEndpoint,
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
    const images =
      (this.state?.product?.gallery?.length > 3
        ? this.state?.product?.gallery?.slice(3)
        : this.state?.product?.gallery) ?? [];
    return (
      this.state.product && (
        <div className="ProductDetailsContainer">
          <div className="side-images">
            {images.length > 0 &&
              images.map((i, index) => (
                <div
                  className="img-div"
                  style={{
                    border:
                      this.state.displayImageIndex === index
                        ? "1px solid #5ece7b"
                        : "",
                  }}
                  key={index}
                  onClick={() =>
                    this.setState({
                      displayImageIndex: index,
                    })
                  }
                >
                  <img src={i} alt="gallery" />
                </div>
              ))}
          </div>
          <div className="product-img">
            {this.state.product.gallery && (
              <img
                src={this.state.product?.gallery[this.state.displayImageIndex]}
                alt=""
              />
            )}
            {!this.state.product?.inStock && (
              <div className="out-of-stock-flag">
                <p>OUT OF STOCK</p>
              </div>
            )}
          </div>
          <div className="product-details">
            <h3 className="product-name">{this.state.product?.name}</h3>
            <div className="product-sizes-container">
              {this.state?.product?.attributes &&
                this.state?.product?.attributes?.map((at, atIndex) => (
                  <div key={atIndex}>
                    <p className="label-text">{at.name}:</p>
                    <div className="different-sizes">
                      {at.items?.map((i, indx) =>
                        at.name === "Color" ? (
                          <div
                            style={{ backgroundColor: i.value }}
                            className={`single-size-box `}
                            key={indx}
                            onClick={() =>
                              this.setSelectedSizeIndex(at.name, indx)
                            }
                          >
                            {this.state.selectedSizeIndex.filter(
                              (obj) => obj.name === at.name
                            )[0]?.value === indx && <TickIcon />}
                          </div>
                        ) : (
                          <div
                            key={indx}
                            onClick={() =>
                              this.setSelectedSizeIndex(at.name, indx)
                            }
                            className={`single-size-box ${
                              this.state.selectedSizeIndex.filter(
                                (obj) => obj.name === at.name
                              )[0]?.value === indx
                                ? "selected-size"
                                : ""
                            }`}
                          >
                            {i?.value}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))}
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
            <button
              onClick={() => {
                this.props.addToCart(
                  this.state.product,
                  1,
                  this.state?.product?.attributes ?? [],
                  this.state.selectedSizeIndex.length > 0
                    ? this.state.selectedSizeIndex
                    : [
                        {
                          name: this.state?.product?.attributes[0]?.name,
                          value: 0,
                        },
                      ]
                );
              }}
              className="add-to-cart-btn"
              disabled={!this.state.product.inStock}
            >
              ADD TO CART
            </button>
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
