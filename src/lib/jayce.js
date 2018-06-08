import history from './history';
import reducer from './reducer';
import messageParser from './messageParser';

function Jayce(store, option) {

  // 判断是否存在实例
  if (typeof Jayce.instance === 'object') {
    return Jayce.instance;
  }

  var ws = new WebSocket(option.url);

  console.log('new ws');

  ws.onmessage = function (msg) {
    // 消息解析器
    messageParser(msg, store);
  };
  ws.onerror = function () {
    console.log('error');
  }
  ws.onclose = function () {
    console.log('close')
  }

  // 发送 立即消息
  this.post = function (url, data) {
    var send = {
      header: {
        type: 'POST',
        url: url,
      },
      body: data
    }
    this.send(JSON.stringify(send));
  }

  // 发送 订阅型消息
  this.subscribe = function(action) {
    console.log('subscribe ', action)
    var send = {
      header: {
        type: 'SUBSCRIBE',
        url: '/subscribe',
      },
      body: action
    }
    this.send(JSON.stringify(send));
  }

  this.unsubscribe = function(action) {
    console.log('unsubscribe ', action)
    var send = {
      header: {
        type: 'UNSUBSCRIBE',
        url: '/unsubscribe',
      },
      body: action
    }
    this.send(JSON.stringify(send));
  }

  this.send = function(message, callback){
    this.waitForConnection(function () {
      ws.send(message);
      if (typeof callback !== 'undefined') {
        callback();
      }
    }, 1000);
  }

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

export default Jayce;
export const createJayceHistory = history;
export const jayceReducer = reducer;
