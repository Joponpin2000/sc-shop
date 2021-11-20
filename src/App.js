import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./organisms/Navbar";
import Category from "./pages/Category/index";

import "./App.css";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/Cart";

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Category />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
