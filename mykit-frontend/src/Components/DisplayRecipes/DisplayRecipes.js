import React from "react";
import axios from "axios";
import "./display-recipes.css";
import "../../index.css";
import { Switch, Route, Link } from "react-router-dom";
import Recipe from "../RecipePage/Recipe";
import RecipeForm from "../RecipeForm/recipe-form";

export default class DisplayRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      currentRecipe: {}
    };
    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData(user) {
    axios
      .get("http://localhost:4000/recipes/")
      .then(response => {
        this.setState(prevState => {
          if (
            JSON.stringify(prevState.recipes) !== JSON.stringify(response.data)
          ) {
            console.log("recipelist changed");
            return Object.assign({ recipes: response.data });
          }
        });
        console.log(response.data);
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
  componentWillUnmount() {
    console.log("recipes componentWillUnmount");
  }
  componentDidUpdate() {
    console.log("recipes componentDidUpdate");
    this.fetchData();
  }

  render() {
    return (
      <Switch>
        <Route
          path="/recipe/view/:id"
          render={props => (
            <Recipe
              {...props}
              data={this.state.recipes.find(
                x => x._id === props.match.params.id
              )}
              //deleteRecipe={this.deleteRecipe.bind(this)}
            />
          )}
        />
        <Route
          path="/recipe/create"
          render={props => <RecipeForm {...props} />}
        />
        <Route
          path="/recipe/edit/:id"
          render={props => (
            <RecipeForm
              {...props}
              data={this.state.recipes.find(
                x => x._id === props.match.params.id
              )}
            />
          )}
        />
        <Route path="/">
          <div id="display-recipes">
            <header className="header">
              <h1>My Recipes</h1>
              <div className="actionbar">
                <div className="toolbar">
                  <div className="searchbar">
                    <input
                      type="text"
                      className="search-input"
                      placeholder="search recipes"
                    />
                    <button className="buttons">Search</button>
                  </div>

                  <button className="buttons">
                    <Link className="links" to="/recipe/create">
                      New Recipe
                    </Link>
                  </button>
                </div>
                <div id="home-nav-btns" className="navbar">
                  <button className="buttons">Visit Pantry</button>
                </div>
              </div>
            </header>

            <main id="recipe-list">
              {this.state.recipes.map((x, i) => (
                <Link
                  key={x._id}
                  className="links recipe-link"
                  to={"/recipe/view/" + x._id}
                >
                  <div className="recipe-icon-name">{x.recipe_name}</div>
                  <img
                    src={x.recipe_image !== undefined ? x.recipe_image.url : ""}
                    alt={"image-" + x.recipe_name}
                  />

                  <div className="infobar">
                    <div className="info-item">{x.recipe_difficulty}</div>
                    <div className="info-item">
                      <i className="fas fa-clock"></i> {x.recipe_time}
                    </div>
                    <div className="info-item">
                      <i className="fas fa-chart-pie"></i> {x.recipe_servings}
                    </div>
                  </div>
                </Link>
              ))}
            </main>
          </div>
        </Route>
      </Switch>
    );
  }
}