"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateFormatter = void 0;

var dateFormatter = function dateFormatter(num) {
  var dateOptions = {
    hour: "2-digit",
    minute: "2-digit",
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  };
  var timestamp = Date.parse(num);
  var date = new Date(timestamp).toLocaleDateString("fr-FR", dateOptions);
  return date.toString();
};

exports.dateFormatter = dateFormatter;