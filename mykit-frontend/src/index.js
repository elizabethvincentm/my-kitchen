import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./index.css";
import axios from "axios";
import Login from "./Components/LoginPage/Login";
import Home from "./Components/HomePage/Home";
import DisplayRecipes from "./Components/DisplayRecipes/DisplayRecipes";
import DisplayPantry from "./Components/DisplayPantry/DisplayPantry";
import Footer from "./Components/Footer";
import * as serviceWorker from "./serviceWorker";

class RecipeApp extends React.Component {
  render() {
    return (
      <Router>
        <div id="app">
          <Route path="/" exact component={Login} />
          <Route path="/home" exact render={props => <Home {...props} />} />

          <Footer />
        </div>
      </Router>
    );
  }
}
ReactDOM.render(<RecipeApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
