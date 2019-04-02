import Util from "utility/util.jsx";

const _util = new Util();

class Statistic {
  //get home statistic count
  getHomeCount() {
    return _util.request({
      url: "/manage/statistic/base_count.do"
    });
  }
}

export default Statistic;
