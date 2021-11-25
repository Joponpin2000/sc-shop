import React, { Component } from "react";
import { Link } from "react-router-dom";
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
    try {
      var client = new ApolloClient({
        uri: "http://localhost:4000",
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

  render() {
    return (
      <div className="CategoryContainer">
        <div className="category-title">All</div>
        <div className="product-container">
          {this.state.products &&
            this.state.products.length > 1 &&
            this.state.products.map((product, index) => (
              <Link
                to={`/product/${product.id}`}
                key={index}
                className="product-card"
              >
                <div className="product-img">
                  <img src={product.gallery[0]} alt="product" />
                  {!product.inStock && (
                    <div className="out-of-stock-flag">
                      <p>OUT OF STOCK</p>
                    </div>
                  )}
                  {product.inStock && (
                    <Link
                      to="/cart"
                      className="add-to-cart-icon"
                      onClick={() =>
                        this.props.addToCart(
                          product,
                          1,
                          product?.attributes[0]?.items ?? [],
                          0
                        )
                      }
                    >
                      <AddToCartIcon className="add-to-cart-icon" />
                    </Link>
                  )}
                </div>
                <div className="product-desc">
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
              </Link>
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
