import React, { Component } from "react";
import { Link } from "react-router-dom";

import PageTitle from "component/pageTitle/index.jsx";

class ErrorPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="Something Wrong!" />
        <div className="row">
          <div className="col-md-12">
            <span>Cannot find this path, </span>
            <Link to="/">click this to go back Home</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorPage;
