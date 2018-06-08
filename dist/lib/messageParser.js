'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function messageParser(msg, store) {
  var response = JSON.parse(msg.data);

  console.log(response);

  switch (response.header.type) {
    case 'POST':
      break;
    case 'SUBSCRIBE':
      store.dispatch(response.body);
  }
}

exports.default = messageParser;