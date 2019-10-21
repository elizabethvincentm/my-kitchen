import React from "react";
import "./home.css";
import "../../index.css";
import { Redirect, Route, Link } from "react-router-dom";
import DisplayRecipes from "../DisplayRecipes/DisplayRecipes";
import DisplayPantry from "../DisplayPantry/DisplayPantry";
import AppHeader from "../AppHeader";

class Home extends React.Component {
  state = {
    nextDisplay: "pantry"
  };
  toggleState() {
    this.setState(prevState => {
      return prevState.nextDisplay === "recipes"
        ? { nextDisplay: "pantry" }
        : { nextDisplay: "recipes" };
    });
  }
  render() {
    return (
      <div id="homepage">
        <header className="header">
          <AppHeader align="left" fontsize="1.5rem" />
          <div id="home-nav-btns" className="navbar">
            <Link
              className="buttons links"
              to={`/home/${this.state.nextDisplay}`}
              onClick={this.toggleState.bind(this)}
            >
              View {this.state.nextDisplay}
            </Link>
          </div>
        </header>
        <Redirect
          to={`/home/${
            this.state.nextDisplay === "recipes" ? "pantry" : "recipes"
          }`}
        />
        <Route path="/home/recipes" component={DisplayRecipes} />
        <Route path="/home/pantry" component={DisplayPantry} />
      </div>
    );
  }
}

export default Home;
