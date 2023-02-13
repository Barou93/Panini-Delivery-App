const models = require("../models");

const { Admin, Categorie, Product } = models;
const jwt = require("jsonwebtoken");
const sharp = require("sharp");
const fs = require("fs");

/**
 *
 * @param {String} req
 * @param {Sting} res
 * @returns {String}
 * @returns {Number}
 */

//Only Admin routes

module.exports.createProduct = async (req, res) => {
  const token = req.cookies.jwt;
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  const adminId = decoded.id;

  try {
    const admin = await Admin.findByPk(adminId);

    req.file.fieldname = "food";
    const { filename: food } = req.file;
    //const { file } = req;
    const { name, product_image, price, categorieId } = req.body;

    let image;

    //Store the compress img in db

    const productImg = `uploads/${req.file.fieldname}/resized_${food}`;
    //Verify if product is also stored in DB
    const productIsFound = await Product.findOne({ where: { name: name } });

    if (productIsFound)
      return res
        .status(401)
        .json(`${name} existe déjà sur la liste des produits`);

    const { file } = req;

    //Convert any input to very high quality JPEG

    await sharp(file.path)
      .resize(640, 427, { fit: "cover" })
      .jpeg({
        quality: 100,
        chromaSubsampling: "4:4:4",
      })
      .toFile(productImg);

    fs.unlinkSync(file.path);

    //Check if picture fields isn't undefined
    if (file !== undefined) {
      image = productImg;
    }

    //Check if admin is connected and the category exist in DB

    if (admin) {
      const product = await Product.create({
        categorieId,
        name,
        product_image: `${req.protocol}://${req.get("host")}/` + image,
        price,
      });
      if (product) {
        return res.status(201).json(product.toJSON());
      } else {
        return res.status(400).json("Impossible d'ajouter ce produit");
      }
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

//Only Admin Dashboard
module.exports.getAllProducts = async (req, res) => {
  const { categorieId } = req.params;

  //Vérifier si l'id de la catégorie existe dans la base de donnée
  const category = await Categorie.findOne({ where: { id: categorieId } });

  if (category.id) {
    // effectuer la requête avec la limite et l'offset
    const productsByCategorie = await Product.findAll({
      where: {
        categorieId: category.id,
      },
      order: [["updatedAt", "ASC"]],
    });
    // retourner les résultats paginés
    res.status(200).send(productsByCategorie);
  } else {
    return res.status(404).json("Aucun produit disponible");
  }
};

module.exports.showAllProducts = async (req, res, next) => {
  // effectuer la requête avec la limite et l'offset
  const products = await Product.findAll({
    order: [["createdAt", "ASC"]],
  });

  res.status(200).send(products);
  next();

  // retourner les résultats paginés
};

//Only Admin Dashboard

module.exports.readOneProduct = async (req, res) => {
  try {
    const categorieId = req.params.categorieId;
    const { id } = req.params;

    if (categorieId) {
      await Product.findOne({ where: { categorieId, id } })
        .then((product) => {
          if (product) {
            return res.status(200).json(product);
          } else {
            return res.status(404).json("Produit non trouvé");
          }
        })
        .catch((err) => {
          return res.status(400).json(err);
        });
    } else {
      return res
        .status(404)
        .json("Impossible d'afficher le produit séléctionner");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports.showProduct = async (req, res) => {
  //For customer screen
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json("Produit non trouvé");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports.updateProduct = async (req, res) => {
  const token = jwt.verify(req.cookies.jwt, process.env.TOKEN_SECRET);
  const adminId = token.id;

  const productId = req.params.id;

  try {
    let image;

    const { file } = req;
    const { name, price, product_image } = req.body;

    const productItem = file
      ? {
          name,
          price,
          product_image: `${req.protocol}://${req.get("host")}/` + image,
        }
      : { name, price };

    if (file) {
      const { filename: food } = req.file;

      const updateImg = `uploads/food/resized_${food}`;

      // Convert any input to very high quality JPEG output
      await sharp(file.path)
        .resize(640, 427, { fit: "cover" })
        .jpeg({
          quality: 100,
          chromaSubsampling: "4:4:4",
        })
        .toFile(updateImg);

      fs.unlinkSync(file.path);
    }

    console.log(productItem);

    if (productId) {
      const product = await Product.update(
        {
          ...productItem,
        },
        { where: { id: productId } }
      );

      if (product) {
        return res.status(200).json({ "Mise à jour effectué": product.name });
      } else {
        return res.status(400).json("Impossible de mettre le produit à jour.");
      }
    } else {
      return res.status(404).json("Le product séléctionner est indisponible");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const token = jwt.verify(req.cookies.jwt, process.env.TOKEN_SECRET);

    const product = await Product.findOne({ where: { id: id } });

    const admin = await Admin.findByPk(token.id);

    const filename = product.product_image.split("./uploads/food/")[1];

    if (!admin)
      return res
        .status(401)
        .json("Vous n'êtes pas authorisé à faire cette action");

    //Delete  product with image in the DB Base
    fs.unlink(`../frontend/public/uploads/food/${filename}`, () => {
      const result = Product.destroy({ where: { id: product.id } });
      if (!result)
        return res.status(404).json("Ce produit n'est pas disponible");
      return res.status(200).json("Le produit a été bien supprimé");
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
/*
module.exports.deleteAllProducts = async (req, res) => {
  try {
    const token = jwt.verify(req.cookies.jwt, process.env.TOKEN_SECRET);

    const { categorieId } = req.params;
    console.log(categorieId);

    const category = await Categorie.findOne({ where: { id: categorieId } });

    const admin = await Admin.findByPk(token.id);

    if (!admin)
      return res
        .status(401)
        .json("Vous n'êtes pas authorisé à faire cette action");

    if (category.id) {
      await Product.destroy({
        where: { categorieId: category.id },
        truncate: true,
      })
        .then(() => {})
        .catch(() => {
          return res.status(400).json("Impossible de supprimer les produits");
        });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
*/
