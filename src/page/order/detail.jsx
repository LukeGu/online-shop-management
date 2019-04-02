import React, { Component } from "react";

import PageTitle from "component/pageTitle/index.jsx";
import Util from "utility/util.jsx";
import Order from "service/orderService.jsx";
import TableList from "utility/tableList/index.jsx";
import "./detail.scss";

const _util = new Util();
const _order = new Order();

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNumber: this.props.match.params.orderNumber,
      orderInfo: {}
    };
  }

  componentDidMount() {
    this.loadOrderDetail();
  }

  loadOrderDetail() {
    _order.getOrderDetail(this.state.orderNumber).then(
      res => {
        this.setState({
          orderInfo: res
        });
      },
      err => {
        _util.errorTips(err);
      }
    );
  }

  onDelivery(e) {
    if (window.confirm("Please confirm the order has been shipped")) {
      _order.delivery(this.state.orderNumber).then(
        res => {
          _util.successTips("Successful delivery!");
          this.loadOrderDetail();
        },
        err => {
          _util.errorTips(err);
        }
      );
    }
  }

  render() {
    let receiverInfo = this.state.orderInfo.shippingVo || {},
      productList = this.state.orderInfo.orderItemVoList || [];
    let tableHeads = [
      { name: "Product Pics", width: "10%" },
      { name: "Product Info", width: "45%" },
      { name: "Price", width: "15%" },
      { name: "Status", width: "15%" },
      { name: "Sum", width: "15%" }
    ];

    let listBody = productList.map((product, index) => {
      return (
        <tr key={index}>
          <td>
            <img
              className="p-img"
              src={`${this.state.orderInfo.imageHost}${product.productImage}`}
              alt={product.productName}
            />
          </td>
          <td>{product.productName}</td>
          <td>${product.currentUnitPrice}</td>
          <td>{product.quantity}</td>
          <td>${product.totalPrice}</td>
        </tr>
      );
    });
    return (
      <div id="page-wrapper">
        <PageTitle title="ORDER DETAILS" />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">Order Number</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {this.state.orderInfo.orderNo}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Creation Time</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {this.state.orderInfo.createTime}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Recipient</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {receiverInfo.receiverName}, {receiverInfo.receiverProvince}
                {receiverInfo.receiverCity}
                {receiverInfo.receiverAddress}
                {receiverInfo.receiverMobile || receiverInfo.receiverPhone}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Status of Order</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {this.state.orderInfo.status === 0
                  ? "Canceled"
                  : this.state.orderInfo.status === 10
                  ? "Unpaid"
                  : this.state.orderInfo.status === 20
                  ? "Paid"
                  : "Shipped"}
                {this.state.orderInfo.status === 20 ? (
                  <button
                    className="btn btn-default btn-sm btn-delivery"
                    onClick={e => this.onDelivery(e)}
                  >
                    Delivery
                  </button>
                ) : null}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Payment Type</label>
            <div className="col-md-5">
              <p className="form-control-static">Online Payment</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Order Price</label>
            <div className="col-md-5">
              <p className="form-control-static">
                $ {this.state.orderInfo.payment}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Products</label>
            <div className="col-md-10">
              <TableList tableHeads={tableHeads}>{listBody}</TableList>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderDetail;
