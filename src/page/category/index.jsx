import React, { Component } from "react";
import { Link } from "react-router-dom";

import Pagination from "utility/pagination/index.jsx";

import PageTitle from "component/pageTitle/index.jsx";
import TableList from "utility/tableList/index.jsx";
import Util from "utility/util.jsx";
import Product from "service/productService.jsx";

const _util = new Util();
const _product = new Product();

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      parentCategoryId: this.props.match.params.categoryId || 0
    };
  }

  componentDidMount() {
    this.loadCategoryList();
  }

  componentDidUpdate(prevProps, prevState) {
    let oldPath = prevProps.location.pathname,
      newPath = this.props.location.pathname,
      newId = this.props.match.params.categoryId || 0;
    if (newPath !== oldPath) {
      this.setState(
        {
          parentCategoryId: newId
        },
        () => {
          this.loadCategoryList();
        }
      );
    }
  }

  loadCategoryList() {
    _product.getCategoryList(this.state.parentCategoryId).then(
      res => {
        this.setState({ list: res });
      },
      err => {
        this.setState({ list: [] });
        _util.errorTips(err);
      }
    );
  }

  onUpdateName(categoryId, categoryName) {
    let newName = window.prompt("Please enter new category name", categoryName);
    if (newName) {
      _product
        .updateCategoryName({
          categoryId: categoryId,
          categoryName: newName
        })
        .then(
          res => {
            _util.successTips("Update new name");
            this.loadCategoryList();
          },
          err => {
            _util.errorTips(err);
          }
        );
    }
  }

  render() {
    let listBody = this.state.list.map((category, index) => {
      return (
        <tr key={index}>
          <td>{category.id}</td>
          <td>{category.name}</td>
          <td>
            <a
              className="operation"
              onClick={e => this.onUpdateName(category.id, category.name)}
            >
              Change Category Name
            </a>
            <span> ... </span>
            {category.parentId === 0 ? (
              <Link to={`/category/index/${category.id}`}>
                View subcategory
              </Link>
            ) : null}
          </td>
        </tr>
      );
    });
    return (
      <div id="page-wrapper">
        <PageTitle title="CATEGORY LIST">
          <div className="page-header-right">
            <Link to="/category/add-category" className="btn btn-primary">
              <i className="fa fa-plus" />
              <span>Add Category</span>
            </Link>
          </div>
        </PageTitle>
        <div className="row">
          <div className="col-md-12">
            <p>Parent Category ID: {this.state.parentCategoryId}</p>
          </div>
        </div>
        <TableList tableHeads={["Category ID", "Category Name", "Operation"]}>
          {listBody}
        </TableList>
      </div>
    );
  }
}

export default CategoryList;
