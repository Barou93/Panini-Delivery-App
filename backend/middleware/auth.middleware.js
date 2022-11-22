const jwt = require('jsonwebtoken');
const models = require('../models');
const { Admin, Cart, OrderItem } = models;



module.exports.checkAdmin = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
            if (err) {
                res.locals.admin = null;
                res.cookie('jwt', '', { maxAge: 1 });
                next();
            } else {
                const admin = await Admin.findByPk(decodedToken.id)
                res.locals.admin = admin;
                next()
            }
        })
    } else {
        res.locals.admin = null;
        next();

    }

}

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
            } else {
                console.log(decodedToken.id);
                next();
            }
        })
    }

}

module.exports.checkCart = async (req, res, next) => {
    const token = req.cookies.cart;

    if (token) {
        jwt.verify(token, process.env.CART_TOKEN, async (err, decodedToken) => {
            if (err) {
                res.locals.cart = null;

                res.cookie('cart', '', { maxAge: 1 });
                next();
            } else {
                const cart = await Cart.findByPk(decodedToken.id)
                res.locals.cart = cart;
                next()
            }
        })
    } else {
        res.locals.admin = null;
        next();

    }

}