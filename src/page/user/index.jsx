import React, { Component } from "react";
import { Link } from "react-router-dom";

import Pagination from "utility/pagination/index.jsx";
import PageTitle from "component/pageTitle/index.jsx";
import Util from "utility/util.jsx";
import User from "service/userService.jsx";

const _util = new Util();
const _user = new User();

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNum: 1,
      firstLoading: true
    };
  }

  componentDidMount() {
    this.loadUserList();
  }

  loadUserList() {
    _user.getUserList(this.state.pageNum).then(
      res => {
        this.setState(res, () => {
          this.setState({ firstLoading: false });
        });
      },
      err => {
        this.setState({ list: [] });
        _util.errorTips(err);
      }
    );
  }

  onChangePageNumber(pageNum) {
    this.setState(
      {
        pageNum: pageNum
      },
      () => {
        this.loadUserList();
      }
    );
  }

  render() {
    let listBody = this.state.list.map((user, index) => {
      return (
        <tr key={index}>
          <td>{user.id}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{new Date(user.createTime).toLocaleString()}</td>
        </tr>
      );
    });
    let listError = (
      <tr>
        <td colSpan="5" className="text-center">
          {this.state.firstLoading ? "Loading..." : "Not Found User List"}
        </td>
      </tr>
    );
    let tableBody = this.state.list.length > 0 ? listBody : listError;
    return (
      <div id="page-wrapper">
        <PageTitle title="USER LIST" />
        <div className="row">
          <div className="col-md-12">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th> Registration time</th>
                </tr>
              </thead>
              <tbody>{tableBody}</tbody>
            </table>
          </div>
        </div>
        <Pagination
          current={this.state.pageNum}
          total={this.state.total}
          onChange={pageNum => this.onChangePageNumber(pageNum)}
        />
      </div>
    );
  }
}

export default UserList;
