import React, { Component } from "react";

import Util from "utility/util.jsx";
import User from "service/userService.jsx";
import "./index.scss";

const _util = new Util();
const _user = new User();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: _util.getUrlParam("redirect") || "/"
    };
  }

  componentWillMount() {
    document.title = "Login - OSM";
  }

  onInputChange(e) {
    let inputName = e.target.name;
    this.setState({
      [inputName]: e.target.value
    });
    //console.log(inputName + "   " + e.target.value);
  }

  onSubmit() {
    let loginInfo = {
        username: this.state.username,
        password: this.state.password
      },
      checkedResult = _user.checkLoginInfo(loginInfo);
    if (checkedResult.status) {
      _user.login(loginInfo).then(
        res => {
          _util.setStorage("userInfo", res);
          this.props.history.push(this.state.redirect);
        },
        errMsg => {
          _util.errorTips(errMsg);
        }
      );
    } else {
      _util.errorTips(checkedResult.msg);
    }
  }

  onInputKeyUp(e) {
    if (e.keyCode === 13) {
      this.onSubmit();
    }
  }

  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default login-panel">
          <div className="panel-heading">
            <h3 className="panel-title">Welcome to OSM</h3>
          </div>
          <div className="panel-body">
            <div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Email"
                  onChange={e => this.onInputChange(e)}
                  onKeyUp={e => this.onInputKeyUp(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={e => this.onInputChange(e)}
                  onKeyUp={e => this.onInputKeyUp(e)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
                onClick={e => this.onSubmit(e)}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
