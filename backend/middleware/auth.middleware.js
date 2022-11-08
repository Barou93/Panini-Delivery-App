const jwt = require('jsonwebtoken');
const models = require('../models');
const Admin = models.Admin;


module.exports.checkAdmin = (req, res, next) => {

    //Token
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.admin = null;
                res.cookie('jwt', '', { maxAge: 1 });
                next();
            } else {
                let admin = await Admin.findByPk(decodedToken.id);
                res.locals.admin = admin
                console.log(res.locals.admin);
                next();
            }
        })
    } else {
        res.locals.admin = null;
        next();
    }
}


module.exports.requireAuth = (req, res, next) => {

    //Token 
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);

            } else {
                console.log(decodedToken.id)
                next();
            }
        })
    } else {
        console.log("No Token")
    }
}