import React from "react";
//import "./recipe.css";
//import "../../index.css";

class Recipe extends React.Component {
  render() {
    return (
      <div id="recipepage">
        <header className="header">
          <div id="recipe-navbar">
            <button className="buttons">home</button>
            <button className="buttons">edit</button>
            <button className="buttons">delete</button>
          </div>
          <div id="info-bar">
            <div className="recipe-info">difficulty</div>
            <div className="recipe-info">time</div>
            <div className="recipe-info">servings</div>
          </div>
        </header>
        <main id="recipe-details">
          <div id="photos">photos</div>
          <div id="desc">
            <h1 id="recipe-name">Recipe Name</h1>recipe description
          </div>
          <div id="ingredients">ingredients</div>
          <div id="method">method</div>
        </main>
      </div>
    );
  }
}

export default Recipe;
