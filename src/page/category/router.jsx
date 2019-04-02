import React, { Component } from "react";
import {
  Route,
  Link,
  Switch,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";

import CategoryList from "page/category/index.jsx";
import CategoryAdd from "page/category/addCategory.jsx";
// import ProductDetail from "page/category/detail.jsx";

class CategoryRouter extends Component {
  render() {
    return (
      <Switch>
        <Route path="/category/index/:categoryId?" component={CategoryList} />
        <Route path="/category/add-category" component={CategoryAdd} />
        {/*<Route path="/category/edit/:pid" component={ProductAdd} />
        <Route path="/category/detail/:pid" component={ProductDetail} /> */}
        <Redirect exact from="/category" to="/category/index" />
      </Switch>
    );
  }
}

export default CategoryRouter;
