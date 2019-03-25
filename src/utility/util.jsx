class Util {
  request(param) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: param.type || "get",
        url: param.url || "",
        dataType: param.dataType || "json",
        data: param.data || null,
        success: res => {
          //reuqest success
          if (0 === res.status) {
            typeof resolve === "function" && resolve(res.data, res.msg);
          } else if (10 === res.status) {
            // login
            this.onLogin();
          } else if (1 === res.status) {
            typeof reject === "function" && reject("Wrong Password!");
          } else {
            //console.log(res.msg);
            typeof reject === "function" && reject(res.msg || res.data);
          }
        },
        error: err => {
          typeof reject === "function" && reject(err.statusText);
        }
      });
    });
  }
  //redirect login
  onLogin() {
    window.location.href =
      "/login?redirect=" + encodeURIComponent(window.location.pathname);
  }
  //get URL Param
  getUrlParam(name) {
    let queryString = window.location.search.split("?")[1] || "",
      reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
      result = queryString.match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  }
  //success Tips
  successTips(successMsg) {
    alert(successMsg || "Succeeded!");
  }
  //error Tips
  errorTips(errMsg) {
    alert(errMsg || "Something Wrong!");
  }
  //store in localStorage
  setStorage(name, data) {
    let dataType = typeof data;
    if (dataType === "object") {
      localStorage.setItem(name, JSON.stringify(data));
    } else if (["number", "string", "boolean"].indexOf(dataType) >= 0) {
      localStorage.setItem(name, data);
    } else {
      alert("this type cannot be stored in localStorage");
    }
  }
  //get info from localStorage
  getStorage(name) {
    let data = window.localStorage.getItem(name);
    if (data) {
      return JSON.parse(data);
    } else {
      return "";
    }
  }
  //remove localStorage
  removeStorage(name) {
    window.localStorage.removeItem(name);
  }
}

export default Util;
