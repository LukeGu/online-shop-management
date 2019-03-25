import Util from "utility/util.jsx";
import { list } from "postcss";

const _util = new Util();

class Product {
  //get product list
  getProductList(listParam) {
    let url = "",
      data = {},
      type = "";
    if (listParam.listType === "list") {
      url = "/manage/product/list.do";
      data.pageNum = listParam.pageNum;
    } else if (listParam.listType === "search") {
      url = "/manage/product/search.do";
      data.pageNum = listParam.pageNum;
      data[listParam.searchType] = listParam.keyword;
    }
    return _util.request({
      type: "post",
      url: url,
      data: data
    });
  }
  //get product details
  getProduct(productId) {
    return _util.request({
      type: "post",
      url: "/manage/product/detail.do",
      data: { productId: productId || 0 }
    });
  }
  //change prodcut sale status
  setProductStatus(productInfo) {
    return _util.request({
      type: "post",
      url: "/manage/product/set_sale_status.do",
      data: productInfo
    });
  }
  //check product data
  checkProduct(product) {
    let result = {
      status: true,
      msg: "Success"
    };
    if (typeof product.name !== "string" || product.name.length === 0) {
      return {
        status: false,
        msg: "Product name is empty"
      };
    }
    if (typeof product.subtitle !== "string" || product.subtitle.length === 0) {
      return {
        status: false,
        msg: "Product description is empty"
      };
    }
    if (typeof product.categoryId !== "number" || !(product.categoryId > 0)) {
      return {
        status: false,
        msg: "Please choose a category"
      };
    }
    if (typeof product.price !== "number" || !(product.price >= 0)) {
      return {
        status: false,
        msg: "Please enter correct price"
      };
    }
    if (typeof product.stock !== "number" || !(product.stock >= 0)) {
      return {
        status: false,
        msg: "Please enter correct number of stock"
      };
    }

    return result;
  }
  //save product
  saveProduct(product) {
    return _util.request({
      type: "post",
      url: "/manage/product/save.do",
      data: product
    });
  }

  /*
   * Category Handler
   */

  getCategoryList(parentCategoryId) {
    return _util.request({
      type: "post",
      url: "/manage/category/get_category.do",
      data: {
        categoryId: parentCategoryId || 0
      }
    });
  }
}

export default Product;
