import React from "react";
import { Link } from "react-router-dom";
import "./recipe.css";
import "../../index.css";
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
    this.state = {
      display: "ingr"
    };
    this.toggleRecipeDisplay = this.toggleRecipeDisplay.bind(this);
    this.recipeDisplay = this.recipeDisplay.bind(this);
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
  render() {
    let id = this.props.match.params.id;
    return (
      <div id="recipe-page">
        <header className="header">
          <h1 id="recipe-name">{this.props.data.recipe_name}</h1>
          <div className="actionbar">
            <div className="navbar">
              <button className="buttons">
                <Link className="links recipe-link" to="/home">
                  home
                </Link>
              </button>
            </div>
            <div className="toolbar">
              <button className="buttons">
                <Link
                  className="links recipe-link"
                  to={`/home/recipe/edit/${id}`}
                >
                  edit
                </Link>
              </button>
              <button className="buttons" onClick={this.props.deleteRecipe}>
                delete
              </button>
            </div>
          </div>

          <div className="infobar">
            <div className="info-item">
              DifficultyLevel:{this.props.data.recipe_difficulty}
            </div>
            <div className="info-item">
              Total Cooking Time:{this.props.data.recipe_time}
            </div>
            <div className="info-item">
              Servings:{this.props.data.recipe_servings}
            </div>
          </div>
        </header>
        <main className="recipe-details">
          <div id="photos">
            <img
              src={
                "https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/mrtrending0475.jpg?itok=ULkGk3Pn"
              }
            />
          </div>
          <div id="desc">{this.props.data.recipe_desc}</div>
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
          {/*<div id="ingredients">{this.props.data.recipe_ingr}</div>
          <div id="method">{this.props.data.recipe_method}</div>*/}
        </main>
      </div>
    );
  }
}

export default Recipe;
