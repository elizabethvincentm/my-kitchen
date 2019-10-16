import React from "react";
import "./home.css";
import "../../index.css";
import { Link } from "react-router-dom";

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }
  componentDidUpdate() {
    console.log("componentDidUpdate");
  }
  render() {
    return (
      <div id="homepage">
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
                <Link className="links" to="/home/recipe/create">
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
          {this.props.recipes.map((x, i) => (
            <Link
              key={x._id}
              className="links recipe-link"
              to={"/home/recipe/view/" + x._id}
              onClick={() => {
                this.props.setCurrentRecipe(x._id);
              }}
            >
              <h3>{x.recipe_name}</h3>
              <img
                src={x.recipe_image !== undefined ? x.recipe_image.url : ""}
                alt={"image-" + x.recipe_name}
              />
            </Link>
          ))}
        </main>
      </div>
    );
  }
}

export default Home;
