import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { connect } from "react-redux";

import { getCurrency } from "../../redux/actions/currencyActions";
import { addToCart } from "../../redux/actions/cartActions";
import gql from "graphql-tag";
import AddToCartIcon from "../../vectors/AddToCartIcon";
import "./Category.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }
  async componentDidMount() {
    const apiEndpoint = process.env.REACT_APP_GRAPHQL_API_ENDPOINT;
    try {
      var client = new ApolloClient({
        uri: apiEndpoint,
      });

      var { products } = await client
        .query({
          query: gql`
            query {
              category(input: { title: "" }) {
                name
                products {
                  name
                  id
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
            }
          `,
        })
        .then((result) => result.data.category);
      this.setState({ products: products });
    } catch (exception) {
      console.error(exception);
    }
  }

  handleClick(e, product) {
    if (
      e.target.tagName === "circle" ||
      e.target.tagName === "path" ||
      e.target.dataset.name === "cart-icon"
    ) {
      this.props.addToCart(
        product,
        1,
        product?.attributes ?? [],
        product?.attributes?.map((at) => ({
          name: at?.name,
          value: 0,
        }))
      );
      return;
    }

    window.location.href = `/product/${product.id}`;
  }

  render() {
    // console.log(this.props.location);
    return (
      <div className="CategoryContainer">
        <div className="category-title">All</div>
        <div className="product-container">
          {this.state.products &&
            this.state.products.length > 1 &&
            this.state.products.map((product, index) => (
              <div
                onClick={(event) => this.handleClick(event, product)}
                key={index}
                className="product-card"
                data-name="product-card"
              >
                <div className="product-img">
                  <img src={product.gallery[0]} alt="product" />
                  {!product.inStock && (
                    <div className="out-of-stock-flag">
                      <p>OUT OF STOCK</p>
                    </div>
                  )}
                  {product.inStock && (
                    <div data-name="cart-icon" className="add-to-cart-icon">
                      <AddToCartIcon />
                    </div>
                  )}
                </div>
                <div
                  className={`product-desc ${
                    !product.inStock ? "grey-text" : ""
                  }`}
                >
                  <p className="product-name"> {product.name}</p>
                  <p className="product-price">
                    {this.props.currency.symbol}
                    {
                      product.prices.find(
                        (p) => p.currency === this.props.currency.name
                      ).amount
                    }
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  currency: state.currency.selectedCurrency,
});
export default connect(mapStateToProps, { getCurrency, addToCart })(Home);
