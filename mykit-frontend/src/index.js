import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import "./index.css";
import Login from "./Components/LoginPage/Login";
import Home from "./Components/HomePage/Home";
import Recipe from "./Components/RecipePage/Recipe";
import CreateRecipe from "./Components/CreateRecipe/create-recipe";

import * as serviceWorker from "./serviceWorker";

class RecipeApp extends React.Component {
  render() {
    return (
      <Router>
        <div id="app">
          <header id="header">
            {" "}
            <Link className="links" to="/">
              <div id="app-logo">My Kitchen</div>
            </Link>
          </header>

          <Route path="/" exact component={Login} />
          <Route path="/home" exact component={Home} />
          <Route path="/home/recipe/" component={Recipe} />
          <Route path="/home/create_recipe" component={CreateRecipe} />
          <footer className="footer">&copy; elizabethvincentm</footer>
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
