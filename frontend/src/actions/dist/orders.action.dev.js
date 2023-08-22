"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateOrder = exports.getOrders = exports.UPDATE_ORDER = exports.GET_ORDERS = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GET_ORDERS = "GET_ORDERS";
exports.GET_ORDERS = GET_ORDERS;
var UPDATE_ORDER = "UPDATE_ORDER";
exports.UPDATE_ORDER = UPDATE_ORDER;

var getOrders = function getOrders() {
  return function (dispatch) {
    return _axios["default"].get("".concat(process.env.REACT_APP_API_URL, "api/cart/orders")).then(function (res) {
      dispatch({
        type: GET_ORDERS,
        payload: res.data
      });
    })["catch"](function (err) {
      return console.log(err);
    });
  };
};

exports.getOrders = getOrders;

var updateOrder = function updateOrder(id) {
  return function (dispatch) {
    return (0, _axios["default"])({
      method: "patch",
      url: "".concat(process.env.REACT_APP_API_URL, "api/cart/orders/").concat(id)
    }).then(function (res) {
      dispatch({
        type: UPDATE_ORDER,
        payload: res.data
      });
    });
  };
};

exports.updateOrder = updateOrder;