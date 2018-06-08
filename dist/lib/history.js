"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createHashHistory = require("history/createHashHistory");

var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createJayceHistory(store) {
  var history = (0, _createHashHistory2.default)();

  /**
   * 监听url变化，通知服务端更新当前用户订阅器
   */
  history.listen(function (location, action) {
    console.log("The current URL is " + location.pathname + location.search + location.hash);

    // TODO: 告诉后台 订阅内容

    //jayce.subscribe(['GET_NEW_ARTICLE']);

    store.dispatch({
      type: 'UPDATE_URL',
      url: location.pathname
    });

    console.log(store.getState());
  });

  return history;
}

exports.default = createJayceHistory;