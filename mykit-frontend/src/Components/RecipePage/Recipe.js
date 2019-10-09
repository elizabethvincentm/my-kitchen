import React from "react";
import axios from "axios";
//import "./recipe.css";
//import "../../index.css";
import { useParams } from "react-router-dom";

class Recipe extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // let recipe_id=useParams();
    axios
      .get(`http://localhost:4000/recipes/`)
      .then(response => {
        this.setState({ name: response.data });
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  render() {
    console.log(this.props.match.params.id);
    return (
      <div id="recipepage">
        <header className="recipe-header">
          <h1 id="recipe-name">{this.props.recipe_name}Recipe Name</h1>
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
          <div id="desc">recipe description</div>
          <div id="ingredients">ingredients</div>
          <div id="method">method</div>
        </main>
      </div>
    );
  }
}

export default Recipe;
