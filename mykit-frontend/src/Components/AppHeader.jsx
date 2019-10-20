import React, { PureComponent } from "react";
import "../index.css";
import { Link } from "react-router-dom";
export default class AppHeader extends PureComponent {
  render() {
    return (
      <div className="app-header">
        <Link className="links" to="/">
          <div
            className="app-logo"
            style={{
              textAlign: this.props.align,
              fontSize: this.props.fontsize,
              color: this.props.logoColor
            }}
          >
            MyKitchen
          </div>
        </Link>
      </div>
    );
  }
}
