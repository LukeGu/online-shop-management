import React, { Component } from "react";
import {
  Route,
  Link,
  Switch,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";

import ProductList from "page/product/index.jsx";
import ProductAdd from "page/product/addProduct.jsx";
import ProductDetail from "page/product/detail.jsx";

class ProductRouter extends Component {
  render() {
    return (
      <Switch>
        <Route path="/product/index" component={ProductList} />
        <Route path="/product/add-product" component={ProductAdd} />
        <Route path="/product/edit/:pid" component={ProductAdd} />
        <Route path="/product/detail/:pid" component={ProductDetail} />
        <Redirect exact from="/product" to="/product/index" />
      </Switch>
    );
  }
}

export default ProductRouter;
