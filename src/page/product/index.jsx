import React, { Component } from "react";
import { Link } from "react-router-dom";

import Pagination from "utility/pagination/index.jsx";
import PageTitle from "component/pageTitle/index.jsx";
import Util from "utility/util.jsx";
import Product from "service/productService.jsx";
import TableList from "utility/tableList/index.jsx";
import ListSearch from "./listSearch.jsx";

import "./index.scss";

const _util = new Util();
const _product = new Product();

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNum: 1,
      listType: "list"
    };
  }

  componentDidMount() {
    this.loadProductList();
  }

  loadProductList() {
    let listParam = {};
    listParam.listType = this.state.listType;
    listParam.pageNum = this.state.pageNum;
    if (this.state.listType === "search") {
      listParam.searchType = this.state.searchType;
      listParam.keyword = this.state.searchKeyword;
    }

    _product.getProductList(listParam).then(
      res => {
        this.setState(res);
      },
      err => {
        this.setState({ list: [] });
        _util.errorTips(err);
      }
    );
  }

  onSearch(searchType, searchKeyword) {
    let listType = searchKeyword === "" ? "list" : "search";
    this.setState(
      {
        listType: listType,
        pageNum: 1,
        searchType: searchType,
        searchKeyword: searchKeyword
      },
      () => {
        this.loadProductList();
      }
    );
  }

  onChangePageNumber(pageNum) {
    this.setState(
      {
        pageNum: pageNum
      },
      () => {
        this.loadProductList();
      }
    );
  }

  onSetProductStatus(e, productId, currentStatus) {
    let newStatus = currentStatus == 1 ? 2 : 1;
    let confirmInfo =
      currentStatus == 1
        ? "Are you sure you want to remove the product?"
        : "Are you sure you want to launch the product?";
    if (window.confirm(confirmInfo)) {
      _product
        .setProductStatus({
          productId: productId,
          status: newStatus
        })
        .then(
          res => {
            _util.successTips("Modify product status successfully!");
            this.loadProductList();
          },
          err => {
            _util.errorTips("Modify product status failed!");
          }
        );
    }
  }

  render() {
    let listBody = this.state.list.map((product, index) => {
      return (
        <tr key={index}>
          <td>{product.id}</td>
          <td>
            <p>{product.name}</p>
            <p>{product.subtitle}</p>
          </td>
          <td>${product.price}</td>
          <td>
            <p>{product.status === 1 ? "Selling" : "No longer selling"}</p>
            <button
              className="btn btn-warning"
              onClick={e => {
                this.onSetProductStatus(e, product.id, product.status);
              }}
            >
              {product.status == 1 ? "Removed" : "Launched"}
            </button>
          </td>
          <td>
            <Link className="opt" to={`/product/detail/${product.id}`}>
              <button className="btn btn-info btn-lg">View</button>{" "}
            </Link>
            <Link className="opt" to={`/product/edit/${product.id}`}>
              <button className="btn btn-success btn-lg">Edit</button>{" "}
            </Link>
          </td>
        </tr>
      );
    });
    let tableHeads = [
      { name: "Product ID", width: "10%" },
      { name: "Product Info", width: "50%" },
      { name: "Price", width: "10%" },
      { name: "Status", width: "15%" },
      { name: "Operation", width: "15%" }
    ];
    return (
      <div id="page-wrapper">
        <PageTitle title="PRODUCT LIST">
          <div className="page-header-right">
            <Link to="/product/add-product" className="btn btn-primary">
              <i className="fa fa-plus" />
              <span>Add Product</span>
            </Link>
          </div>
        </PageTitle>
        <ListSearch
          onSearch={(searchType, searchKeyword) => {
            this.onSearch(searchType, searchKeyword);
          }}
        />
        <TableList tableHeads={tableHeads}>{listBody}</TableList>
        <Pagination
          current={this.state.pageNum}
          total={this.state.total}
          onChange={pageNum => this.onChangePageNumber(pageNum)}
        />
      </div>
    );
  }
}

export default ProductList;
