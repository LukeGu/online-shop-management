import React, { Component } from "react";
import { Link } from "react-router-dom";

import Util from "utility/util.jsx";
import User from "service/userService.jsx";

const _util = new Util();
const _user = new User();
class NavTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: _util.getStorage("userInfo").username || ""
    };
  }

  onLogout() {
    _user.logout().then(
      res => {
        _util.removeStorage("userInfo");
        window.location.href = "/login";
      },
      err => {
        _util.errorTips(err);
      }
    );
  }

  render() {
    return (
      <div className="navbar navbar-default top-navbar">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            <b>Online</b>Shop
          </Link>
        </div>

        <ul className="nav navbar-top-links navbar-right">
          <li className="dropdown">
            <a className="dropdown-toggle" href="javascript:;">
              <i className="fa fa-user fa-fw" />
              {this.state.username ? (
                <span>Hi {this.state.username}</span>
              ) : (
                <span>Hi Stranger</span>
              )}

              <i className="fa fa-caret-down" />
            </a>
            <ul className="dropdown-menu dropdown-user">
              <li>
                <a onClick={() => this.onLogout()}>
                  <i className="fa fa-sign-out fa-fw" /> <span>Logout</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavTop;
