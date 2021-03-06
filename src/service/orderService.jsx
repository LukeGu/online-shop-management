import Util from "utility/util.jsx";

const _util = new Util();

class Order {
  //get order list
  getOrderList(listParam) {
    let url = "",
      data = {},
      type = "";
    if (listParam.listType === "list") {
      url = "/manage/order/list.do";
      data.pageNum = listParam.pageNum;
    } else if (listParam.listType === "search") {
      url = "/manage/order/search.do";
      data.pageNum = listParam.pageNum;
      data.orderNo = listParam.orderNo;
    }
    return _util.request({
      type: "post",
      url: url,
      data: data
    });
  }
  getOrderDetail(orderNumber) {
    return _util.request({
      type: "post",
      url: "/manage/order/detail.do",
      data: {
        orderNo: orderNumber
      }
    });
  }
  delivery(orderNumber) {
    return _util.request({
      type: "post",
      url: "/manage/order/send_goods.do",
      data: {
        orderNo: orderNumber
      }
    });
  }
}
export default Order;
