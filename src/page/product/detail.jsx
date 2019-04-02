import React, { Component } from "react";

import PageTitle from "component/pageTitle/index.jsx";
import Util from "utility/util.jsx";
import Product from "service/productService.jsx";
import CategorySelector from "./categorySelector/categorySelector.jsx";

import "./addProduct.scss";

const _util = new Util();
const _product = new Product();

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.pid,
      name: "",
      subtitle: "",
      categoryId: 0,
      parentCategoryId: 0,
      subImages: [],
      price: "",
      stock: "",
      detail: "",
      status: 1 // 1 -- sale
    };
  }

  componentDidMount() {
    this.loadProduct();
  }

  loadProduct() {
    if (this.state.id) {
      _product.getProduct(this.state.id).then(
        res => {
          let images = res.subImages.split(",");
          res.subImages = images.map(imgUri => {
            return {
              uri: imgUri,
              url: res.imageHost + imgUri
            };
          });

          this.setState(res);
        },
        err => {
          _util.errorTips(err);
        }
      );
    }
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="PRODUCT LIST" />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">Product Name</label>
            <div className="col-md-5">
              <p className="form-control-static">{this.state.name}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Description</label>
            <div className="col-md-5">
              <p className="form-control-static">{this.state.subtitle}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Category</label>
            <CategorySelector
              readOnly
              categoryId={this.state.categoryId}
              parentCategoryId={this.state.parentCategoryId}
            />
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Price</label>
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-addon">$</span>
                <input
                  type="number"
                  className="form-control"
                  aria-label="Amount (to the nearest dollar)"
                  value={this.state.price}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Stock</label>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                value={this.state.stock}
                readOnly
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Product pictures</label>
            <div className="col-md-10">
              {this.state.subImages.length ? (
                this.state.subImages.map((image, index) => (
                  <div key={index} className="img-con">
                    <img className="img" src={image.url} />
                  </div>
                ))
              ) : (
                <div>No images</div>
              )}
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Product details</label>
            <div
              className="col-md-10"
              dangerouslySetInnerHTML={{ __html: this.state.detail }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;
