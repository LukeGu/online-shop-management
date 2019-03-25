import FileUpload from "./FileUpload.jsx";
import React, { Component } from "react";

class FileUploader extends Component {
  render() {
    const options = {
      baseUrl: "/manage/product/upload.do",
      fileFieldName: "upload_file",
      dataType: "json",
      chooseAndUpload: true,
      uploadSuccess: res => {
        this.props.onSuccess(res.data);
      },
      uploadError: err => {
        this.props.onError(err.message || "Fail to upload images");
      }
    };

    return (
      <FileUpload options={options}>
        <button className="btn btn-xs btn-default" ref="chooseAndUpload">
          choose a picture
        </button>
      </FileUpload>
    );
  }
}

export default FileUploader;
