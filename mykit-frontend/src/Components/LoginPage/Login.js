import React from "react";
import "./login.css";
import "../../index.css";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: "login",
      user: {
        name: "",
        pswd: "",
        auth: false
      }
    };
    this.changeForm = this.changeForm.bind(this);
    this.displayForm = this.displayForm.bind(this);
    this.authLogin = this.authLogin.bind(this);
    this.createUser = this.createUser.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRePassword = this.onChangeRePassword.bind(this);
  }
  authLogin(e) {
    e.preventDefault();
    /*stub*/
    this.setState({
      user: {
        name: "",
        pswd: "",
        auth: false
      }
    });
    /*****/
  }
  createUser(e) {
    e.preventDefault();
    this.setState({
      user: {
        name: "",
        pswd: "",
        auth: false
      }
    });
    /*Stub*/
    alert("My Kitchen created successfully!");
  }
  changeForm(formType) {
    this.setState({
      formType: formType
    });
  }
  onChangeUsername(e) {
    this.setState({
      user: {
        name: e.target.value
      }
    });
  }
  onChangePassword(e) {
    this.setState({
      user: {
        pswd: e.target.value
      }
    });
  }
  onChangeRePassword(e) {
    /*Stub*/
  }
  displayForm() {
    if (this.state.formType === "login") {
      return (
        <form className="form login-form" onSubmit={this.authLogin}>
          <input
            type="text"
            value={this.state.user.name}
            placeholder="chefName"
            onChange={this.onChangeUsername}
          />
          <input
            type="text"
            value={this.state.user.pswd}
            placeholder="password"
            onChange={this.onChangePassword}
          />
          <Link className="links" to="/home">
            <div className="buttons" type="submit">
              Login
            </div>
          </Link>
        </form>
      );
    } else {
      return (
        <form className="form signup-form" onSubmit={this.createUser}>
          <input
            type="text"
            value={this.state.user.name}
            placeholder="chefName"
            onChange={this.onChangeUserName}
          />
          <input
            type="text"
            value={this.state.user.pswd}
            placeholder="password"
            onChange={this.onChangePassword}
          />
          <input
            type="text"
            value={this.state.user.pswd}
            placeholder="confirm password"
            onChange={this.onChangeRePassword}
          />
          <button className="buttons" type="submit">
            Create
          </button>
        </form>
      );
    }
  }
  render() {
    return (
      <div id="login-page">
        <nav className="navbar">
          <div
            className="nav-link"
            id="login-nav-link"
            onClick={() => {
              this.changeForm("login");
            }}
          >
            Login to My Kitchen
          </div>
          <div
            className="nav-link"
            id="signup-nav-link"
            onClick={() => {
              this.changeForm("create");
            }}
          >
            Create My Kitchen
          </div>
        </nav>
        {this.displayForm()}
      </div>
    );
  }
}

export default Login;
