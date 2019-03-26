import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  Route,
  Link,
  Switch,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";

import Home from "page/home/index.jsx";
import Login from "page/login/index.jsx";
import ErrorPage from "page/error/index.jsx";
import UserList from "page/user/index.jsx";
import ProductRouter from "page/product/router.jsx";
import CategoryRouter from "page/category/router.jsx";

import Layout from "component/layout/index.jsx";
class App extends Component {
  render() {
    let LayoutRouter = (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/product" component={ProductRouter} />
          <Route path="/category" component={CategoryRouter} />
          <Route path="/order" component={Home} />
          <Route path="/user" component={UserList} />
          <Route component={ErrorPage} />
        </Switch>
      </Layout>
    );
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" render={props => LayoutRouter} />
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
