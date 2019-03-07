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
import Layout from "component/layout/index.jsx";
class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/product" component={Home} />
            <Route path="/category" component={Home} />
            <Route path="/order" component={Home} />
            <Route path="/user" component={Home} />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
