import React, { Component } from "react";
import Simditor from "simditor";

import "simditor/styles/simditor.scss";
import "./index.scss";

//rely on jQuery
class Editor extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadEditor();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.defaultDetail !== nextProps.defaultDetail) {
      this.simditor.setValue(nextProps.defaultDetail);
    }
  }

  loadEditor() {
    let element = this.refs["textarea"];
    this.simditor = new Simditor({
      textarea: $(element),
      defaultValue: this.props.placeholder || "Please enter the content",
      upload: {
        url: "/manage/product/richtext_img_upload.do",
        defaultImage: "",
        fileKey: "upload_file"
      }
    });
    this.bindEditorEvent();
  }
  //init editor event
  bindEditorEvent() {
    this.simditor.on("valuechanged", e => {
      this.props.onValueChange(this.simditor.getValue());
    });
  }

  render() {
    return (
      <div className="editor">
        <textarea ref="textarea" />
      </div>
    );
  }
}

export default Editor;
