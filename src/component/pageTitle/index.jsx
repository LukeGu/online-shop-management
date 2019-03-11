import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class PageTitle extends Component {
  componentWillMount() {
    document.title = this.props.title + " - OSM";
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h1 className="page-header">{this.props.title}</h1>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default PageTitle;
