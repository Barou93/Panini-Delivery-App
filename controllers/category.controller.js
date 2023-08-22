const models = require("../models");

const { Categorie, Admin, Product } = models;
const jwt = require("jsonwebtoken");
const fs = require("fs");

module.exports.createCategory = async (req, res) => {
  const token = req.cookies.jwt;
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  const adminId = decoded.id;

  try {
    let { name } = req.body;

    const isCreated = await Categorie.findOne({ where: { name: name } });
    if (isCreated) {
      return res
        .status(401)
        .json("Cette catégorie existe déjà, merci de saisir un autre nom");
    }

    await Admin.findOne({ where: { id: adminId } }).then(async (admin) => {
      let categoryPicture;
      if (admin !== null) {
        req.file.fieldname = "category";
        if (req.file !== undefined) {
          categoryPicture = `uploads/${req.file.fieldname}/${req.file.filename}`;
        }

        if (name == "null" && categoryPicture == "null") {
          return res
            .status(400)
            .json("Merci de remplir les champs obligatoires 😒");
        } else {
          await Categorie.create({
            name,
            picture: `${req.protocol}://${req.get("host")}/` + categoryPicture,
          })
            .then((category) => {
              return res.status(201).json(category.toJSON());
            })
            .catch((err) => res.status(400).json({ err }));
        }
      }
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

//Only User dashbord
module.exports.getAllCategory = async (req, res) => {
  await Categorie.findAll({
    order: [["createdAt", "ASC"]],
  })
    .then((categories) => {
      return res.status(200).json(categories);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

module.exports.getCategory = async (req, res) => {
  const { id } = req.params;
  await Categorie.findByPk(id)
    .then((category) => {
      return res.status(200).json(category);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

module.exports.updateCategory = async (req, res) => {
  const token = req.cookies.jwt;
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  const adminId = decoded.id;

  const { id } = req.params;

  const { name } = req.body;

  const admin = await Admin.findByPk(adminId);

  const category = await Categorie.findByPk(id);

  if (admin) {
    if (!category) return res.status(404).json("Catégorie non trouvé");
    else {
      category.name = name;
      category
        .save()
        .then(() => res.status(200).json(category))
        .catch((err) => res.status(401).json(err));
    }
  } else {
    return res.status(404).json("Vous devez être connecté");
  }
};

module.exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    //const token = req.cookies.jwt;
    const categorie = await Categorie.findOne({ where: { id } });
    const token = jwt.verify(req.cookies.jwt, process.env.TOKEN_SECRET);
    const admin = await Admin.findByPk(token.id);
    const filename = categorie.picture.split("./uploads/category/")[1];
    console.log(filename);

    fs.unlink(`../frontend/public/uploads/category/${filename}`, () => {
      const result = Categorie.destroy({ where: { id: categorie.id } });
      if (!result) res.status(404).json("Cette catégorie n'existe pas");
      if (result) {
        Product.destroy({ where: { categorieId: categorie.id } });
        return res.status(200).json("La catégorie a été bien supprimé");
      }
    });
    0;
  } catch (error) {
    next(error);
  }
};
