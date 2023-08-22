"use strict";

var _require = require("sequelize"),
    Op = _require.Op;

var models = require("../models");

var Product = models.Product,
    OrderItem = models.OrderItem,
    Cart = models.Cart,
    Option = models.Option,
    ShopOrder = models.ShopOrder;

var _require2 = require("../utils/pagination"),
    pagination = _require2.pagination;
/**
 *
 * @param {JSON STRING}
 * @param {string}
 * @returns  {JSON String}
 */


module.exports.createOrder = function _callee2(req, res) {
  var _req$body, username, phone_number, address, status, totalPrice, id, cart, order, total, totalPrices, createOrder;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, phone_number = _req$body.phone_number, address = _req$body.address, status = _req$body.status, totalPrice = _req$body.totalPrice;
          _context2.prev = 1;
          id = req.params.id;
          _context2.next = 5;
          return regeneratorRuntime.awrap(Cart.findByPk(id));

        case 5:
          cart = _context2.sent;
          console.log(cart.id);
          _context2.next = 9;
          return regeneratorRuntime.awrap(OrderItem.findAll({
            where: {
              cartId: cart.id
            }
          }));

        case 9:
          order = _context2.sent;

          if (cart.id) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(404).json("Cet article n'est plus disponible"));

        case 12:
          _context2.next = 14;
          return regeneratorRuntime.awrap(Promise.all(order.map(function _callee(orderItemId) {
            var products, options, qty, prices;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(Product.findOne({
                      where: {
                        id: orderItemId.productId
                      }
                    }));

                  case 2:
                    products = _context.sent;
                    _context.next = 5;
                    return regeneratorRuntime.awrap(Option.findOne({
                      where: {
                        id: orderItemId.optionId
                      }
                    }));

                  case 5:
                    options = _context.sent;
                    _context.next = 8;
                    return regeneratorRuntime.awrap(OrderItem.findOne({
                      where: {
                        quantity: orderItemId.quantity
                      }
                    }));

                  case 8:
                    qty = _context.sent;
                    //Ajouter le prix de l'article + la quantité
                    prices = products.price * qty.quantity;
                    return _context.abrupt("return", prices);

                  case 11:
                  case "end":
                    return _context.stop();
                }
              }
            });
          })));

        case 14:
          total = _context2.sent;
          //Faire la somme total des prix des produits contenu dans le tableau
          totalPrices = total.reduce(function (a, b) {
            return a + b;
          }, 0);
          console.log(totalPrices); //Créer la commande après vérification

          _context2.next = 19;
          return regeneratorRuntime.awrap(ShopOrder.create({
            orderId: cart.id,
            username: username,
            phone_number: phone_number,
            address: address,
            status: status,
            totalPrice: totalPrices
          }));

        case 19:
          createOrder = _context2.sent;
          createOrder.save();
          res.cookie("cart", "", {
            maxAge: 1
          });
          return _context2.abrupt("return", res.status(201).json(createOrder));

        case 25:
          _context2.prev = 25;
          _context2.t0 = _context2["catch"](1);
          return _context2.abrupt("return", res.status(500).json(_context2.t0.message));

        case 28:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 25]]);
};

module.exports.getAllOrders = function _callee3(req, res, next) {
  var allOrders;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(ShopOrder.findAll({
            order: [["createdAt", "DESC"]]
          }));

        case 3:
          allOrders = _context3.sent;
          return _context3.abrupt("return", res.send(allOrders));

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(500).json(_context3.t0));

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

module.exports.getOrder = function _callee4(req, res, next) {
  var id;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(ShopOrder.findByPk(id).then(function (order) {
            return res.status(200).json(order);
          })["catch"](function (err) {
            return res.status(404).json("Commande non disponible" + err);
          }));

        case 4:
          _context4.next = 9;
          break;

        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", res.status(500).json(_context4.t0));

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 6]]);
}; //Modifier l'état de la commande


module.exports.updateOrder = function _callee5(req, res) {
  var id, order, acceptedOrder;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          _context5.next = 4;
          return regeneratorRuntime.awrap(ShopOrder.findOne({
            where: {
              id: id
            }
          }));

        case 4:
          order = _context5.sent;

          if (!order) {
            _context5.next = 16;
            break;
          }

          _context5.next = 8;
          return regeneratorRuntime.awrap(ShopOrder.update({
            status: "Accepted"
          }, {
            where: {
              id: order.id
            }
          }));

        case 8:
          acceptedOrder = _context5.sent;

          if (!acceptedOrder) {
            _context5.next = 13;
            break;
          }

          return _context5.abrupt("return", res.status(204).json("Commande acceptée"));

        case 13:
          return _context5.abrupt("return", res.status(400).json("Une erreur est detecter"));

        case 14:
          _context5.next = 17;
          break;

        case 16:
          return _context5.abrupt("return", res.status(404).json("Commande non trouvé"));

        case 17:
          _context5.next = 22;
          break;

        case 19:
          _context5.prev = 19;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", res.status(500).json(_context5.t0));

        case 22:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 19]]);
};

module.exports.deleteOrders = function _callee6(req, res, next) {
  var id, order, deleteOrder;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.params.id;
          _context6.next = 4;
          return regeneratorRuntime.awrap(ShopOrder.findOne({
            where: {
              id: id
            }
          }));

        case 4:
          order = _context6.sent;

          if (!order) {
            _context6.next = 16;
            break;
          }

          _context6.next = 8;
          return regeneratorRuntime.awrap(ShopOrder.destroy({
            where: {
              id: order.id
            }
          }));

        case 8:
          deleteOrder = _context6.sent;

          if (!deleteOrder) {
            _context6.next = 13;
            break;
          }

          return _context6.abrupt("return", res.status(200).json("La commande a été supprimé avec succès"));

        case 13:
          return _context6.abrupt("return", res.status(400).json("Une erreur est disponible"));

        case 14:
          _context6.next = 17;
          break;

        case 16:
          return _context6.abrupt("return", res.status(404).json("Cet article n'est plus disponible"));

        case 17:
          _context6.next = 22;
          break;

        case 19:
          _context6.prev = 19;
          _context6.t0 = _context6["catch"](0);
          return _context6.abrupt("return", res.status(500).json(_context6.t0));

        case 22:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 19]]);
};