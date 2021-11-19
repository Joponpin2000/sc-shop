import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./organisms/Navbar";
import Category from "./pages/Category/index";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Category />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
