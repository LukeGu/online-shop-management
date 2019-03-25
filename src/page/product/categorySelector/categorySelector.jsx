import React, { Component } from "react";

import "./categorySelector.scss";
import Util from "utility/util.jsx";
import Product from "service/productService.jsx";

const _util = new Util();
const _product = new Product();

class CategorySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      categoryId: 0,
      subcategoryList: [],
      subcategoryId: 0
    };
  }

  componentDidMount() {
    this.loadCategory();
  }

  componentWillReceiveProps(nextProps) {
    let categoryIdChange = this.props.categoryId !== nextProps.categoryId,
      parentCategoryIdChange =
        this.props.parentCategoryId !== nextProps.parentCategoryId;
    //data  has no changed
    if (!categoryIdChange && !parentCategoryIdChange) {
      return;
    }
    //only has category
    if (nextProps.parentCategoryId === 0) {
      this.setState({
        categoryId: nextProps.categoryId,
        subcategoryId: 0
      });
    }
    //have category and subcategory
    else {
      this.setState(
        {
          categoryId: nextProps.parentCategoryId,
          subcategoryId: nextProps.categoryId
        },
        () => {
          parentCategoryIdChange && this.loadSubcategory();
        }
      );
    }
  }

  loadCategory() {
    if (this.props.readOnly) {
      return;
    }
    _product.getCategoryList().then(
      res => {
        this.setState({
          categoryList: res
        });
      },
      err => {
        _util.errorTips(err);
      }
    );
  }

  loadSubcategory() {
    if (this.props.readOnly) {
      return;
    }
    _product.getCategoryList(this.state.categoryId).then(
      res => {
        this.setState({
          subcategoryList: res
        });
      },
      err => {
        _util.errorTips(err);
      }
    );
  }

  //select category
  onCategoryChange(e) {
    let newValue = e.target.value || 0;
    this.setState(
      {
        categoryId: newValue,
        subcategoryId: 0,
        subcategoryList: []
      },
      () => {
        //update subcategory
        this.loadSubcategory();
        this.onPropsCategoryChange();
      }
    );
  }

  onSubcategoryChange(e) {
    let newValue = e.target.value || 0;
    this.setState(
      {
        subcategoryId: newValue
      },
      () => {
        this.onPropsCategoryChange();
      }
    );
  }

  onPropsCategoryChange() {
    //props has callback function or not
    let catChanged = typeof this.props.onCategoryChange === "function";
    if (this.state.subcategoryId) {
      catChanged &&
        this.props.onCategoryChange(
          this.state.subcategoryId,
          this.state.categoryId
        );
    } else {
      catChanged && this.props.onCategoryChange(this.state.categoryId, 0);
    }
  }

  render() {
    return (
      <div className="col-md-10">
        <select
          className="form-control cate-select"
          value={this.props.categoryId}
          readOnly={this.props.readOnly}
          onChange={e => this.onCategoryChange(e)}
        >
          <option>Please select a category</option>
          {this.state.categoryList.map((category, index) => (
            <option value={category.id} key={index}>
              {category.name}
            </option>
          ))}
        </select>
        {this.state.subcategoryList.length ? (
          <select
            className="form-control cate-select"
            value={this.props.subcategoryId}
            readOnly={this.props.readOnly}
            onChange={e => this.onSubcategoryChange(e)}
          >
            <option>Please select a subcategory</option>
            {this.state.subcategoryList.map((category, index) => (
              <option value={category.id} key={index}>
                {category.name}
              </option>
            ))}
          </select>
        ) : null}
      </div>
    );
  }
}

export default CategorySelector;
