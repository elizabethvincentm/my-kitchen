import React from "react";
import "./home.css";
import "../../index.css";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link
} from "react-router-dom";
import DisplayRecipes from "../DisplayRecipes/DisplayRecipes";
import DisplayPantry from "../DisplayPantry/DisplayPantry";
import AppHeader from "../AppHeader";

class Home extends React.Component {
  state = {
    display: "recipes"
  };
  toggleState() {
    this.setState(prevState =>
      prevState.display === "recipes" ? "pantry" : "recipes"
    );
  }
  render() {
    return (
      <div id="homepage">
        <Router>
          <header className="header">
            <AppHeader align="left" fontsize="1.5rem" />
            <div id="home-nav-btns" className="navbar">
              <Link
                className="buttons links"
                to={`/home/${
                  this.state.display === "recipes" ? "pantry" : "recipes"
                }`}
                onClick={this.toggleState.bind(this)}
              >
                View {this.state.display === "recipes" ? "Pantry" : "Recipes"}
              </Link>
            </div>
          </header>
          <Redirect to={`/home/${this.state.display}`} />

          <Route path="/home/recipes" component={DisplayRecipes} />
          <Route path="/home/pantry" component={DisplayPantry} />
        </Router>
      </div>
    );
  }
}

export default Home;
