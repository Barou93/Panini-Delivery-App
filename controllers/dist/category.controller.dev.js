"use strict";

var models = require("../models");

var Categorie = models.Categorie,
    Admin = models.Admin,
    Product = models.Product;

var jwt = require("jsonwebtoken");

var fs = require("fs");

module.exports.createCategory = function _callee2(req, res) {
  var token, decoded, adminId, name, isCreated;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          token = req.cookies.jwt;
          decoded = jwt.verify(token, process.env.TOKEN_SECRET);
          adminId = decoded.id;
          _context2.prev = 3;
          name = req.body.name;
          _context2.next = 7;
          return regeneratorRuntime.awrap(Categorie.findOne({
            where: {
              name: name
            }
          }));

        case 7:
          isCreated = _context2.sent;

          if (!isCreated) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", res.status(401).json("Cette catégorie existe déjà, merci de saisir un autre nom"));

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(Admin.findOne({
            where: {
              id: adminId
            }
          }).then(function _callee(admin) {
            var categoryPicture;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!(admin !== null)) {
                      _context.next = 9;
                      break;
                    }

                    req.file.fieldname = "category";

                    if (req.file !== undefined) {
                      categoryPicture = "uploads/".concat(req.file.fieldname, "/").concat(req.file.filename);
                    }

                    if (!(name == "null" && categoryPicture == "null")) {
                      _context.next = 7;
                      break;
                    }

                    return _context.abrupt("return", res.status(400).json("Merci de remplir les champs obligatoires 😒"));

                  case 7:
                    _context.next = 9;
                    return regeneratorRuntime.awrap(Categorie.create({
                      name: name,
                      picture: "".concat(req.protocol, "://").concat(req.get("host"), "/") + categoryPicture
                    }).then(function (category) {
                      return res.status(201).json(category.toJSON());
                    })["catch"](function (err) {
                      return res.status(400).json({
                        err: err
                      });
                    }));

                  case 9:
                  case "end":
                    return _context.stop();
                }
              }
            });
          }));

        case 12:
          _context2.next = 17;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](3);
          return _context2.abrupt("return", res.status(500).json(_context2.t0));

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 14]]);
}; //Only User dashbord


module.exports.getAllCategory = function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Categorie.findAll({
            order: [["createdAt", "ASC"]]
          }).then(function (categories) {
            return res.status(200).json(categories);
          })["catch"](function (err) {
            return res.status(400).json(err);
          }));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
};

module.exports.getCategory = function _callee4(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Categorie.findByPk(id).then(function (category) {
            return res.status(200).json(category);
          })["catch"](function (err) {
            return res.status(400).json(err);
          }));

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
};

module.exports.updateCategory = function _callee5(req, res) {
  var token, decoded, adminId, id, name, admin, category;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          token = req.cookies.jwt;
          decoded = jwt.verify(token, process.env.TOKEN_SECRET);
          adminId = decoded.id;
          id = req.params.id;
          name = req.body.name;
          _context5.next = 7;
          return regeneratorRuntime.awrap(Admin.findByPk(adminId));

        case 7:
          admin = _context5.sent;
          _context5.next = 10;
          return regeneratorRuntime.awrap(Categorie.findByPk(id));

        case 10:
          category = _context5.sent;

          if (!admin) {
            _context5.next = 20;
            break;
          }

          if (category) {
            _context5.next = 16;
            break;
          }

          return _context5.abrupt("return", res.status(404).json("Catégorie non trouvé"));

        case 16:
          category.name = name;
          category.save().then(function () {
            return res.status(200).json(category);
          })["catch"](function (err) {
            return res.status(401).json(err);
          });

        case 18:
          _context5.next = 21;
          break;

        case 20:
          return _context5.abrupt("return", res.status(404).json("Vous devez être connecté"));

        case 21:
        case "end":
          return _context5.stop();
      }
    }
  });
};

module.exports.deleteCategory = function _callee6(req, res, next) {
  var id, categorie, token, admin, filename;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.params.id; //const token = req.cookies.jwt;

          _context6.next = 4;
          return regeneratorRuntime.awrap(Categorie.findOne({
            where: {
              id: id
            }
          }));

        case 4:
          categorie = _context6.sent;
          token = jwt.verify(req.cookies.jwt, process.env.TOKEN_SECRET);
          _context6.next = 8;
          return regeneratorRuntime.awrap(Admin.findByPk(token.id));

        case 8:
          admin = _context6.sent;
          filename = categorie.picture.split("./uploads/category/")[1];
          console.log(filename);
          fs.unlink("../frontend/public/uploads/category/".concat(filename), function () {
            var result = Categorie.destroy({
              where: {
                id: categorie.id
              }
            });
            if (!result) res.status(404).json("Cette catégorie n'existe pas");

            if (result) {
              Product.destroy({
                where: {
                  categorieId: categorie.id
                }
              });
              return res.status(200).json("La catégorie a été bien supprimé");
            }
          });
          _context6.next = 17;
          break;

        case 14:
          _context6.prev = 14;
          _context6.t0 = _context6["catch"](0);
          next(_context6.t0);

        case 17:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 14]]);
};