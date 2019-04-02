import React, { Component } from "react";
import { Link } from "react-router-dom";

import Pagination from "utility/pagination/index.jsx";
import TableList from "utility/tableList/index.jsx";
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
      pageNum: 1
    };
  }

  componentDidMount() {
    this.loadUserList();
  }

  loadUserList() {
    _user.getUserList(this.state.pageNum).then(
      res => {
        this.setState(res);
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
    return (
      <div id="page-wrapper">
        <PageTitle title="USER LIST" />
        <TableList
          tableHeads={[
            "ID",
            "Username",
            "Email",
            "Phone Number",
            "Registration Time"
          ]}
        >
          {listBody}
        </TableList>
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
