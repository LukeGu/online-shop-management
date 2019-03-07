import React, { Component } from "react";

import PageTitle from "component/pageTitle/index.jsx";
import "./index.css";

class Home extends Component {
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="HOME" />
        <div className="row">
          <div className="col-md-12">body</div>
        </div>
      </div>
    );
  }
}

export default Home;
