import React from "react";
import Recipe from "../RecipePage/Recipe";
import "./home.css";
//import "../../index.css";
import { Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    console.log(this.props);
    return (
      <div id="homepage">
        <nav id="home-navbar">
          <div id="home-nav-btns">
            <button className="buttons">
              <Link className="links" to="/home/create_recipe">
                New Recipe
              </Link>
            </button>
            <button className="buttons">Visit Pantry</button>
          </div>

          <div id="recipes-toolbar">
            <textarea id="searchbar" placeholder="search recipes" />
            <button className="buttons">Search</button>
          </div>
        </nav>

        <main id="display-recipes">
          <div id="recipe-list">
            {this.props.recipes.map((x, i) => (
              <li key={i}>
                <Link
                  className="links recipe-link"
                  to={"/home/recipe/" + x._id}
                >
                  {x.recipe_name}
                </Link>
              </li>
            ))}
          </div>
        </main>
      </div>
    );
  }
}

export default Home;
