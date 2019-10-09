import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import "./index.css";
import axios from "axios";
import Login from "./Components/LoginPage/Login";
import Home from "./Components/HomePage/Home";
import Recipe from "./Components/RecipePage/Recipe";
import CreateRecipe from "./Components/CreateRecipe/create-recipe";

import * as serviceWorker from "./serviceWorker";

class RecipeApp extends React.Component {
  state = {
    recipes: []
  };

  fetchData(user) {
    // fetch data and save to this component state this.state.data
    axios
      .get("http://localhost:4000/recipes/")
      .then(response => {
        this.setState({ recipes: response.data });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  render() {
    return (
      <Router>
        <div id="app">
          <header id="header">
            <Link className="links" to="/">
              <div className="app-logo">MyKitchen</div>
            </Link>
          </header>

          <Route path="/" exact component={Login} />
          <Route
            path="/home"
            exact
            render={props => (
              <Home
                {...props}
                fetchData={this.fetchData.bind(this)}
                recipes={this.state.recipes}
              />
            )}
          />
          <Route
            path="/home/recipe/:id"
            render={props => <Recipe {...props} data={this.state.recipes} />}
          />
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
