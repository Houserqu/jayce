'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var initialState = {
  cur_url: '/'
};

function jayceReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case 'UPDATE_URL':
      return Object.assign({}, state, {
        cur_url: action.url
      });
    default:
      return state;
  }
  return state;
}

exports.default = jayceReducer;