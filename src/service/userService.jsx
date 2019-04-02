import Util from "utility/util.jsx";

const _util = new Util();

class User {
  //login
  login(loginInfo) {
    return _util.request({
      type: "post",
      url: "/manage/user/login.do",
      data: loginInfo
    });
  }
  //check info
  checkLoginInfo(loginInfo) {
    let username = $.trim(loginInfo.username),
      password = $.trim(loginInfo.password);
    if (typeof username !== "string" || username.length === 0) {
      return {
        status: false,
        msg: "username is empty"
      };
    }
    if (typeof password !== "string" || password.length === 0) {
      return {
        status: false,
        msg: "password is empty"
      };
    }
    return {
      status: true,
      msg: "authenticated"
    };
  }
  //logout
  logout() {
    return _util.request({
      type: "post",
      url: "/user/logout.do"
    });
  }
  //get user list
  getUserList(pageNum) {
    return _util.request({
      type: "post",
      url: "/manage/user/list.do",
      data: {
        pageNum: pageNum
      }
    });
  }
}

export default User;
