import React from "react";
import "./home.css";
import "../../index.css";
import { Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <div id="homepage">
        <header className="header">
          <div id="home-navbar">
            <textarea id="searchbar" placeholder="search recipes" />
            <button className="buttons">View Pantry/ShoppingList</button>
            <div id="recipe-settings">
              <button className="buttons">
                <Link className="links" to="/home/create_recipe">
                  Create New Recipe
                </Link>
              </button>
              {/*<button className="buttons">Edit</button>
              <button className="buttons">Delete</button>*/}
            </div>
          </div>
        </header>
        <main id="display-recipes">
          <ol id="recipe-list">
            <li>
              <Link className="links recipe-link" to="/home/recipe">
                recipe1
              </Link>
            </li>
            <li>
              <Link className="links recipe-link" to="/home/recipe">
                recipe2
              </Link>
            </li>
          </ol>
        </main>
      </div>
    );
  }
}

export default Home;
