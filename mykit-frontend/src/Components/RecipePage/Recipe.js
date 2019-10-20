import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./recipe.css";
import "../../index.css";
import AppHeader from "../AppHeader";

const setRecipeDisplay = str => {
  let curLink = document.querySelector(".active-display");
  let nxtLink = document.getElementById(str + "-nav-link");
  if (nxtLink !== curLink) {
    curLink.classList.remove("active-display");

    nxtLink.classList.add("active-display");
  }
};
class Recipe extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      display: "ingr"
    };
    this.toggleRecipeDisplay = this.toggleRecipeDisplay.bind(this);
    this.recipeDisplay = this.recipeDisplay.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  toggleRecipeDisplay() {
    if (this.state.display === "ingr") this.setState({ display: "method" });
    else {
      this.setState({ display: "ingr" });
    }
  }
  recipeDisplay() {
    if (this.state.display === "ingr") {
      setRecipeDisplay("ingr");
      return <div id="ingredients">{this.props.data.recipe_ingr}</div>;
    } else {
      setRecipeDisplay("method");
      return <div id="method">{this.props.data.recipe_method}</div>;
    }
  }
  deleteRecipe() {
    axios
      .delete(
        `http://localhost:4000/recipes/delete/${this.props.match.params.id}`
      )
      .then(res => {
        console.log(res.data);
        this.props.history.push("/home");
      });
  }
  render() {
    let id = this.props.match.params.id;
    return (
      <div id="recipe-page">
        <div className="actionbar">
          <div className="toolbar">
            <Link className="buttons links recipe-link" to="/home/recipes">
              <i className="fas fa-home"></i>
            </Link>

            <Link
              className="buttons links recipe-link"
              to={`/recipe/edit/${id}`}
            >
              <i className="fas fa-edit"></i>
            </Link>

            <button className="buttons" onClick={this.deleteRecipe}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>

          <div className="infobar">
            <div className="info-item">{this.props.data.recipe_difficulty}</div>
            <div className="info-item">
              <i className="fas fa-clock"></i> {this.props.data.recipe_time}
            </div>
            <div className="info-item">
              <i className="fas fa-chart-pie"></i>{" "}
              {this.props.data.recipe_servings}
            </div>
          </div>
        </div>
        <main className="recipe-details">
          <div id="photos">
            <img
              src={
                this.props.data.recipe_image !== undefined
                  ? this.props.data.recipe_image.url
                  : ""
              }
              alt={`${this.props.data.recipe_name}`}
            />
          </div>
          <div id="desc">
            <h1 id="recipe-name">{this.props.data.recipe_name}</h1>
            {this.props.data.recipe_desc}
          </div>
          <nav className="recipe-navbar togglebar">
            <div
              className="nav-link active-display"
              id="ingr-nav-link"
              onClick={() => {
                this.toggleRecipeDisplay();
              }}
            >
              Ingredients
            </div>
            <div
              className="nav-link"
              id="method-nav-link"
              onClick={() => {
                this.toggleRecipeDisplay();
              }}
            >
              Method
            </div>
          </nav>
          <div className="recipe-content">{this.recipeDisplay()}</div>
        </main>
      </div>
    );
  }
}

export default Recipe;
