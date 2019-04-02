import React, { Component } from "react";
import { Link } from "react-router-dom";

import Pagination from "utility/pagination/index.jsx";
import PageTitle from "component/pageTitle/index.jsx";
import Util from "utility/util.jsx";
import Order from "service/orderService.jsx";
import TableList from "utility/tableList/index.jsx";
import ListSearch from "./listSearch.jsx";

const _util = new Util();
const _order = new Order();

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNum: 1,
      listType: "list"
    };
  }

  componentDidMount() {
    this.loadOrderList();
  }

  loadOrderList() {
    let listParam = {};
    listParam.listType = this.state.listType;
    listParam.pageNum = this.state.pageNum;
    if (this.state.listType === "search") {
      listParam.orderNo = this.state.orderNumber;
    }

    _order.getOrderList(listParam).then(
      res => {
        this.setState(res);
      },
      err => {
        this.setState({ list: [] });
        _util.errorTips(err);
      }
    );
  }

  onSearch(orderNumber) {
    let listType = orderNumber === "" ? "list" : "search";
    this.setState(
      {
        listType: listType,
        pageNum: 1,
        orderNumber: orderNumber
      },
      () => {
        this.loadOrderList();
      }
    );
  }

  onChangePageNumber(pageNum) {
    this.setState(
      {
        pageNum: pageNum
      },
      () => {
        this.loadOrderList();
      }
    );
  }

  render() {
    let listBody = this.state.list.map((order, index) => {
      return (
        <tr key={index}>
          <td>
            <Link to={`/order/detail/${order.orderNo}`}>{order.orderNo}</Link>
          </td>
          <td>{order.receiverName}</td>
          <td>{order.statusDesc}</td>
          <td>${order.payment}</td>
          <td>{order.createTime}</td>
          <td>
            <Link to={`/order/detail/${order.orderNo}`}>
              <button className="btn btn-info btn-lg">Details</button>
            </Link>
          </td>
        </tr>
      );
    });
    let tableHeads = [
      "Order Number",
      "Recipient",
      "Status of Order",
      "Total Order Price",
      "Creation time",
      "Operation"
    ];
    return (
      <div id="page-wrapper">
        <PageTitle title="ORDER LIST" />
        <ListSearch
          onSearch={orderNumber => {
            this.onSearch(orderNumber);
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

export default OrderList;
