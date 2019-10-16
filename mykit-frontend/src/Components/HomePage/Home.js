import React from "react";
import "./home.css";
import "../../index.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import DisplayRecipes from "../DisplayRecipes/DisplayRecipes";

class Home extends React.Component {
  render() {
    return (
      <div id="homepage">
        <Router>
          <Route path="/" component={DisplayRecipes} />
        </Router>
      </div>
    );
  }
}

export default Home;
