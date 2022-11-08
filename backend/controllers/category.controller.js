const models = require('../models');
const Categorie = models.Categorie;
const Admin = models.Admin;
const jwt = require('jsonwebtoken');


module.exports.createCategory = async (req, res) => {

    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const adminToken = decoded.id;

    try {
        let { name } = req.body;
        await Admin.findOne({ where: { id: adminToken } })
            .then(async (admin) => {
                let categoryPicture;

                //req.file.fieldname = "category";

                if (admin !== null) {

                    if (req.file !== undefined) {
                        categoryPicture = `./uploads/category/${req.file.filename}`
                    }
                    else {
                        categoryPicture = ""
                    }


                    if (name == "null" && categoryPicture == "null") {
                        return res.status(400).json('Veuillez remplir les champs obligatoires SVP!')
                    } else {
                        await Categorie.create({
                            name,
                            picture: categoryPicture
                        })
                            .then((category) => {
                                return res.status(201).json(category.toJSON())
                            })
                            .catch((err) => res.status(400).json(err))
                    }

                }
            })

    } catch (error) {
        return res.status(500).json(error.message)

    }




}

module.exports.getAllCategory = async (req, res) => {

    await Categorie.findAll({
        order: [['createdAt', 'ASC']]

    })
        .then((categories) => {

            return res.status(200).json(categories)
        })
        .catch((err) => {
            return res.status(404).json('Aucune donnée trouvé' + err)
        })

}

module.exports.getCategory = async (req, res) => { }



module.exports.updateCategory = async (req, res) => { }

module.exports.deleteCategory = async (req, res) => { }

