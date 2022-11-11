const models = require('../models');

const { Admin, Categorie, Product } = models;
const jwt = require('jsonwebtoken');

const fs = require('fs');

module.exports.createProduct = async (req, res) => {
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const adminId = decoded.id;


    try {

        const admin = await Admin.findByPk(adminId);
        const { categorieId } = req.params;

        const { name, product_image, price, quantity } = req.body;

        let image;

        if (req.file !== undefined) {
            image = `./uploads/food/${req.file.filename}`;
        }


        if (admin && categorieId) {

            //const productFound = await Product.findOne({});

            const product = await Product.create({
                categorieId,
                name,
                product_image: image,
                price,
                quantity

            })

            if (product) {
                return res.status(201).json(product.toJSON());
            } else {
                return res.status(400).json("Impossible d'ajouter ce produit")
            }
        }

    } catch (error) {
        return res.status(500).json(error)

    }


}

//Only Admin Dashboard
module.exports.getAllProducts = async (req, res) => {
    const { categorieId } = req.params;
    if (categorieId) {
        await Product.findAll({ where: { categorieId } }, {
            order: [['createdAt', 'ASC']]
        }).then((products) => {
            return res.status(200).json(products);
        }).catch((err) => {
            return res.status(400).json(err);
        })

    } else {
        return res.status(404).json('Aucun produit disponible');
    }
}

module.exports.showAllProducts = async (req, res) => {
    //const categorieId = req.params.categorieId;

    //if(categorieId)

    const allProduct = await Product.findAll({
        order: [['createdAt', 'ASC']]
    });

    if (allProduct) return res.status(200).json(products);

    else return res.status(400).json("Aucun produit disponible, Ajouter un produit");


}


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
                        return res.status(404).json("Produit non trouvé")
                    }
                })
                .catch((err) => {
                    return res.status(400).json(err)
                })
        } else {
            return res.status(404).json("Impossible d'afficher le produit séléctionner")
        }



    } catch (error) {
        return res.status(500).json(error)

    }
}

module.exports.showProduct = async (req, res) => {

    //For customer screen 
    try {

        const { id } = req.params;

        await Product.findByPk(id)
            .then((product) => {
                if (product) {
                    return res.status(200).json(product);
                } else {
                    return res.status(404).json("Produit non trouvé")
                }
            })
            .catch((err) => {
                return res.status(400).json(err)
            })
    }



    catch (error) {
        return res.status(500).json(error)

    }
}
module.exports.updateProduct = async (req, res) => {
    const token = jwt.verify(req.cookies.jwt, process.env.TOKEN_SECRET);
    const adminId = token.id;

    console.log(req.body);

    const productId = req.params.id;

    //const { product_image } = req.body;

    let image;


    // check new file and Update product picture 

    if (req.file !== undefined) {
        image = `./uploads/food/${req.file.filename}`;
    }


    if (productId) {
        const product = await Product.update(
            {
                name: req.body.name,
                product_image: image,
                price: req.body.price,
                quantity: req.body.price
            },
            { where: { id: productId } })
        if (product) {
            return res.status(200).json(product);
        } else {
            return res.status(400).json('Impossible de mettre le produit à jour.')
        }


    } else {
        return res.status(404).json('Le product séléctionner est indisponible');
    }

}
module.exports.deleteProduct = async (req, res) => {

    try {
        const { id } = req.params;

        const token = jwt.verify(req.cookies.jwt, process.env.TOKEN_SECRET);

        const product = await Product.findOne({ where: { id: id } });

        const admin = await Admin.findByPk(token.id);

        const filename = product.product_image.split('./uploads/food/')[1];

        if (!admin) return res.status(401).json("Vous n'êtes pas authorisé à faire cette action");
        console.log(product.id)

        fs.unlink(`../frontend/public/uploads/food/${filename}`, () => {
            const result = Product.destroy({ where: { id: product.id } });
            if (!result) return res.status(404).json("Ce produit n'est pas disponible");
            return res.status(200).json('Le produit a été bien supprimé');

        });

    } catch (error) {
        return res.status(500).json(error);

    }
}