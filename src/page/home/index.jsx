import React, { Component } from "react";
import { Link } from "react-router-dom";

import PageTitle from "component/pageTitle/index.jsx";
import Util from "utility/util.jsx";
import Statistic from "service/statisticService.jsx";
import "./index.scss";

const _util = new Util();
const _statistic = new Statistic();
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCount: "-",
      productCount: "-",
      orderCount: "-"
    };
  }
  componentDidMount() {
    this.loadCount();
  }
  loadCount() {
    _statistic.getHomeCount().then(
      res => {
        this.setState(res);
      },
      err => {
        _util.errorTips(err);
      }
    );
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="HOME" />
        <div className="row">
          <div className="col-md-4">
            <Link to="/user" className="color-box brown">
              <p className="count">{this.state.userCount}</p>
              <p className="desc">
                <i className="fa fa-user-o" />
                <span>USER COUNT</span>
              </p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="/product" className="color-box green">
              <p className="count">{this.state.productCount}</p>
              <p className="desc">
                <i className="fa fa-list" />
                <span>PRODUCT COUNT</span>
              </p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="/order" className="color-box blue">
              <p className="count">{this.state.orderCount}</p>
              <p className="desc">
                <i className="fa fa-check-square-o" />
                <span>ORDER COUNT</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
