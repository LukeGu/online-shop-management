import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class NavSide extends Component {
  render() {
    return (
      <nav className="navbar-default navbar-side">
        <div className="sidebar-collapse">
          <ul className="nav">
            <li>
              <NavLink exact activeClassName="active-menu" to="/">
                <i className="fa fa-dashboard" /> <span>Home</span>
              </NavLink>
            </li>

            <li className="active">
              <Link to="/product">
                <i className="fa fa-list" /> <span>Product</span>
                <span className="fa arrow" />
              </Link>
              <ul className="nav nav-second-level collapse in">
                <li>
                  <NavLink activeClassName="active-menu" to="/product">
                    Product Mangement
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="active">
              <Link to="/category">
                <i className="fa fa-sitemap" /> <span>Category</span>
                <span className="fa arrow" />
              </Link>
              <ul className="nav nav-second-level collapse in">
                <li>
                  <NavLink activeClassName="active-menu" to="/category">
                    Category Mangement
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="active">
              <Link to="/order">
                <i className="fa fa-check-square-o" /> <span>Order</span>
                <span className="fa arrow" />
              </Link>
              <ul className="nav nav-second-level collapse in">
                <li>
                  <NavLink activeClassName="active-menu" to="/order">
                    Order Mangement
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="active">
              <Link to="/user">
                <i className="fa fa-user-o" /> <span>User</span>
                <span className="fa arrow" />
              </Link>
              <ul className="nav nav-second-level collapse in">
                <li>
                  <NavLink activeClassName="active-menu" to="/user">
                    User Mangement
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavSide;
