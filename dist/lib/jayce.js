'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jayceReducer = exports.createJayceHistory = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _history = require('./history');

var _history2 = _interopRequireDefault(_history);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _messageParser = require('./messageParser');

var _messageParser2 = _interopRequireDefault(_messageParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Jayce(store, option) {

  // 判断是否存在实例
  if (_typeof(Jayce.instance) === 'object') {
    return Jayce.instance;
  }

  var ws = new WebSocket(option.url);

  console.log('new ws');

  ws.onmessage = function (msg) {
    // 消息解析器
    (0, _messageParser2.default)(msg, store);
  };
  ws.onerror = function () {
    console.log('error');
  };
  ws.onclose = function () {
    console.log('close');
  };

  // 发送 立即消息
  this.post = function (url, data) {
    var send = {
      header: {
        type: 'POST',
        url: url
      },
      body: data
    };
    this.send(JSON.stringify(send));
  };

  // 发送 订阅型消息
  this.subscribe = function (action) {
    console.log('subscribe ', action);
    var send = {
      header: {
        type: 'SUBSCRIBE',
        url: '/subscribe'
      },
      body: action
    };
    this.send(JSON.stringify(send));
  };

  this.unsubscribe = function (action) {
    console.log('unsubscribe ', action);
    var send = {
      header: {
        type: 'UNSUBSCRIBE',
        url: '/unsubscribe'
      },
      body: action
    };
    this.send(JSON.stringify(send));
  };

  this.send = function (message, callback) {
    this.waitForConnection(function () {
      ws.send(message);
      if (typeof callback !== 'undefined') {
        callback();
      }
    }, 1000);
  };

  this.waitForConnection = function (callback, interval) {
    if (ws.readyState === 1) {
      callback();
    } else {
      var that = this;
      // optional: implement backoff for interval here
      setTimeout(function () {
        that.waitForConnection(callback, interval);
      }, interval);
    }
  };

  Jayce.instance = this;
}

exports.default = Jayce;
var createJayceHistory = exports.createJayceHistory = _history2.default;
var jayceReducer = exports.jayceReducer = _reducer2.default;