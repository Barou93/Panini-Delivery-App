"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = orderReducer;

var _orders = require("../actions/orders.action");

var initialState = {};

function orderReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _orders.GET_ORDERS:
      return action.payload;

    case _orders.UPDATE_ORDER:
      return action.payload;

    default:
      return state;
  }
}