import React, { Component } from "react";

import NavTop from "component/navTop/index.jsx";
import NavSide from "component/navSide/index.jsx";

import "./theme.css";
import "./index.scss";
class Layout extends Component {
  render() {
    return (
      <div id="wrapper">
        <NavTop />
        <NavSide />
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
