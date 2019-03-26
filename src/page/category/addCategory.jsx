import React, { Component } from "react";

import PageTitle from "component/pageTitle/index.jsx";
import Util from "utility/util.jsx";
import Product from "service/productService.jsx";

const _util = new Util();
const _product = new Product();

class CategoryAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      parentId: 0,
      categoryName: ""
    };
  }

  componentDidMount() {
    this.loadCategoryList();
  }

  loadCategoryList() {
    _product.getCategoryList().then(
      res => {
        this.setState({ categoryList: res });
      },
      err => {
        _util.errorTips(err);
      }
    );
  }

  onValueChange(e) {
    let name = e.target.name,
      value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  onSubmit(e) {
    let categoryName = this.state.categoryName.trim();
    if (categoryName) {
      _product
        .addCategory({
          parentId: this.state.parentId,
          categoryName: categoryName
        })
        .then(
          res => {
            _util.successTips("Success to add a new category");
            this.props.history.push("/category/index");
          },
          err => {
            _util.errorTips(err);
          }
        );
    } else {
      _util.errorTips("Please enter a category!");
    }
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="CATEGORY LIST" />
        <div className="row">
          <div className="col-md-12">
            <div className="form-horizontal">
              <div className="form-group">
                <label className="col-md-2 control-label">Root Category</label>
                <div className="col-md-5">
                  <select
                    name="parentId"
                    className="form-control"
                    onChange={e => this.onValueChange(e)}
                  >
                    <option value="0">Root Category /</option>
                    {this.state.categoryList.map((category, index) => {
                      return (
                        <option value={category.id} key={index}>
                          Root Category / {category.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-2 control-label">Category</label>
                <div className="col-md-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Please enter a category"
                    name="categoryName"
                    value={this.state.name}
                    onChange={e => this.onValueChange(e)}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={e => this.onSubmit(e)}
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryAdd;
