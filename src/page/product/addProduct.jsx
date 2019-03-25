import React, { Component } from "react";

import PageTitle from "component/pageTitle/index.jsx";
import Util from "utility/util.jsx";
import Product from "service/productService.jsx";
import CategorySelector from "./categorySelector/categorySelector.jsx";
import FileUploader from "utility/fileUploader/index.jsx";
import Editor from "utility/editor/index.jsx";

import "./addProduct.scss";

const _util = new Util();
const _product = new Product();

class ProductAdd extends Component {
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
          res.defaultDetail = res.detail;
          this.setState(res);
        },
        err => {
          _util.errorTips(err);
        }
      );
    }
  }

  //name, description, price, stock
  onValueChange(e) {
    let name = e.target.name,
      value = e.target.value.trim();
    this.setState({
      [name]: value
    });
  }

  onCategoryChange(categoryId, parentCategoryId) {
    this.setState({
      categoryId: categoryId,
      parentCategoryId: parentCategoryId
    });
  }

  onUploadSuccess(res) {
    let subImages = this.state.subImages;
    subImages.push(res);
    this.setState({
      subImages: subImages
    });
  }

  onUploadError(err) {
    _util.errorTips(err);
  }

  onImageDelete(e) {
    let index = parseInt(e.target.getAttribute("index")),
      subImages = this.state.subImages;
    subImages.splice(index, 1);
    this.setState({
      subImages: subImages
    });
  }

  onDetailValueChange(value) {
    this.setState({
      detail: value
    });
  }

  getSubImagesString() {
    return this.state.subImages.map(image => image.uri).join(",");
  }

  onSubmit(e) {
    let product = {
        name: this.state.name,
        subtitle: this.state.subtitle,
        categoryId: parseInt(this.state.categoryId),
        subImages: this.getSubImagesString(),
        detail: this.state.detail,
        price: parseFloat(this.state.price),
        stock: parseInt(this.state.stock),
        status: this.state.status
      },
      productCheckResult = _product.checkProduct(product);
    if (this.state.id) {
      product.id = this.state.id;
    }
    if (productCheckResult.status) {
      _product.saveProduct(product).then(
        res => {
          _util.successTips("Add a new product!");
          this.props.history.push("/product/index");
        },
        err => {
          _util.errorTips(err);
        }
      );
    } else {
      _util.errorTips(productCheckResult.msg);
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
              <input
                type="text"
                className="form-control"
                placeholder="Please enter the product name"
                name="name"
                value={this.state.name}
                onChange={e => this.onValueChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Description</label>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Please enter the product description"
                name="subtitle"
                value={this.state.subtitle}
                onChange={e => this.onValueChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Category</label>
            <CategorySelector
              categoryId={this.state.categoryId}
              parentCategoryId={this.state.parentCategoryId}
              onCategoryChange={(categoryId, parentCategoryId) =>
                this.onCategoryChange(categoryId, parentCategoryId)
              }
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
                  placeholder="Product price"
                  name="price"
                  value={this.state.price}
                  onChange={e => this.onValueChange(e)}
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
                placeholder="Product stock"
                name="stock"
                value={this.state.stock}
                onChange={e => this.onValueChange(e)}
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
                    <i
                      className="fa fa-close"
                      index={index}
                      onClick={e => this.onImageDelete(e)}
                    />
                  </div>
                ))
              ) : (
                <div>Please upload image</div>
              )}
            </div>
            <div className="col-md-offset-2 col-md-10 file-upload-con">
              <FileUploader
                onSuccess={res => this.onUploadSuccess(res)}
                onError={err => this.onUploadError(err)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">Product details</label>
            <div className="col-md-10">
              <Editor
                detail={this.state.detail}
                defaultDetail={this.state.defaultDetail}
                onValueChange={value => this.onDetailValueChange(value)}
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
    );
  }
}

export default ProductAdd;
