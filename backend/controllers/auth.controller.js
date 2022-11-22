
const models = require('../models');
const Admin = models.Admin;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const maxAge = 3 * 24 * 60 * 60 * 1000; // 3 jours

const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
}


//Verify if eamil and password values matched with the regex values
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

module.exports.register = async (req, res, next) => {
    console.log(req.body);

    const { name, lastname, email, password } = req.body;

    if (name === "" && lastname === "" && email === "" && password === "") {

        const errors = { message: "Veuillez remplir les champs obligatoires" };

        return res.send(errors);
    }

    if (!emailRegex.test(email)) {

        const errors = {
            email: "Cet email est incorrect, reesayer SVP!",
            password: "",
            firstname: "",
            lastname: ""
        };


        return res.send({ errors });
    }

    if (!passwordRegex.test(password)) {

        const errors = {
            name: "",
            lastname: "",
            email: "",
            password: "Le mot de passe doit avoir 8 caractères et inclure 1 lettre majuscule, 1 chiffre et 1 caractère spécial",

        }
        return res.send({ errors });
    }

    try {
        let emailFound = await Admin.findOne({ where: { email } });
        if (emailFound) {
            console.log(emailFound)
            const errors = {
                email: 'Cet email est déjà pris! Saisissez un autre e-mail',
                name: "",
                lastname: "",
                password: "",

            }
            return res.send({ errors });
        }

        //Encrypted password 
        bcrypt.hash(password, 10)
            .then(async hash => {
                const admin = await Admin.create({
                    name,
                    lastname,
                    email,
                    password: hash
                })
                return res.status(201).json({ admin: admin.toJSON() })
            })



    } catch (error) {
        res.status(500).json({ error });
        console.log(error)
    }

};


module.exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const admin = await Admin.findOne({ where: { email }, raw: true });

        //If fields have empty values

        if (email === "" && password === "") {
            const errors = {
                email: "Veuillez saisir votre adresse e-mail.",
                password: "Veuillez saisir votre mot de passe."
            }
            res.send({ errors });
            return;
        }

        //Check if isAdmin in database

        if (!admin) {
            const errors = {
                email: "Email incorrect",
                password: ''
            }
            res.send({ errors });
            return;
        }

        //Compare Admin password value in DB password
        const auth = await bcrypt.compare(password, admin.password);

        if (!auth) {

            const errors = {
                email: '',
                password: 'Mot de passe erroné'
            }
            res.send({ errors });
            return;

        }

        //All values is valiates
        const adminToken = createToken(admin.id);
        res.cookie('jwt', adminToken, { httpOnly: true, maxAge });
        return res.status(200).json({ admin: admin.id, adminToken })

    } catch (error) {

        res.status(500).json(error);
        console.log(error)
    }
};

module.exports.changePassword = async (req, res) => {

};


module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}