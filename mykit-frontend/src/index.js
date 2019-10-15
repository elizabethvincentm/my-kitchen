import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
//import "./index.css";
import axios from "axios";
import Login from "./Components/LoginPage/Login";
import Home from "./Components/HomePage/Home";
import Recipe from "./Components/RecipePage/Recipe";
import RecipeForm from "./Components/RecipeForm/recipe-form";

import * as serviceWorker from "./serviceWorker";

class RecipeApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      currentRecipe: {},
      updateRecipeList: false
    };
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(user) {
    axios
      .get("http://localhost:4000/recipes/")
      .then(response => {
        this.setState({ recipes: response.data });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  setCurrentRecipe(id) {
    this.setState({
      currentRecipe: this.state.recipes.find(x => x._id === id)
    });
  }
  addRecipe(recipe_data) {
    let result = true;
    axios
      .post("http://localhost:4000/recipes/create", recipe_data)
      .then(res => {
        console.log(res.data);
        if (res.status === 200) {
          alert("recipe created");
          this.setState({ updateRecipeList: true });
        } else {
          alert("failed to add recipe!", res.statusText);
          result = false;
        }
      });
    return result;
  }
  editRecipe(recipe_data, recipe_id) {
    let result = true;
    axios
      .post(`http://localhost:4000/recipes/update/${recipe_id}`, recipe_data)
      .then(res => {
        console.log(res.data);
        if (res.status === 200) {
          alert("recipe updated");
        } else {
          alert("failed to update recipe!", res.statusText);
          result = false;
        }
      });
    return result;
  }
  deleteRecipe() {
    let result = true;
    axios
      .delete(
        `http://localhost:4000/recipes/delete/${this.state.currentRecipe._id}`
      )
      .then(res => {
        console.log(res.data);
      });
  }
  render() {
    return (
      <Router>
        <div id="app">
          <header id="app-header">
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
                setCurrentRecipe={this.setCurrentRecipe.bind(this)}
                recipes={this.state.recipes}
                updateRecipeList={this.state.updateRecipeList}
              />
            )}
          />
          <Route
            path="/home/recipe/view/:id"
            render={props => (
              <Recipe
                {...props}
                data={this.state.currentRecipe}
                deleteRecipe={this.deleteRecipe.bind(this)}
              />
            )}
          />
          {/*<Route path="/home/create_recipe" component={CreateRecipe} />*/}
          <Route
            path="/home/recipe/create"
            render={props => (
              <RecipeForm {...props} data={null} action={this.addRecipe} />
            )}
          />
          <Route
            path="/home/recipe/edit/:id"
            render={props => (
              <RecipeForm
                {...props}
                data={this.state.recipes.find(
                  x => x._id === props.match.params.id
                )}
                action={this.editRecipe}
                imageHandler={this.imageHandler}
              />
            )}
          />
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
