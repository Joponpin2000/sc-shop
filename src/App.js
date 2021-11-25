import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Category from "./pages/Category/index";

import "./App.css";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/Cart";
import Tech from "./pages/Category/Tech";
import Clothes from "./pages/Category/Clothes";

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Category />} />
          <Route path="/tech" element={<Tech />} />
          <Route path="/clothes" element={<Clothes />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
