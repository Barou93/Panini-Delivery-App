const models = require('../models');

const { Admin, Categorie, Product } = models;
const jwt = require('jsonwebtoken');
const sharp = require('sharp');
const fs = require('fs');

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
        const { categorieId } = req.params;

        const { filename: food } = req.file;
        const { file } = req;
        const { name, product_image, price } = req.body;

        let image;

        //Store the compress img in db
        const productImg = file.destination + '/' + 'resized_' + food;

        //Verify if product is also stored in DB
        const productIsFound = await Product.findOne({ where: { name: name } });
        
        if (productIsFound) return res.status(401).json(`${name} existe déjà sur la liste des produits`);

        //Convert any input to very high quality JPEG
        await sharp(file.path)
            .resize(640, 427)
            .jpeg({
                quality: 100,
                chromaSubsampling: '4:4:4'
            }).toFile(productImg);
        fs.unlinkSync(file.path);
            
        //Check if picture fields isn't undefined
        if (file !== undefined) {
            image = productImg;
        }

        //Check if admin is connected and the category exist in DB
        if (admin && categorieId) {

            const product = await Product.create({
                categorieId,
                name,
                product_image: image,
                price,
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
        const pageAsNumber = Number.parseInt(req.query.page);
        const sizeAsNumber = Number.parseInt(req.query.size);

        let page = 0;

        if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
            page = pageAsNumber;
        }

        let size = 0;

        if (!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 10) && !(sizeAsNumber < 1)) {
            size = sizeAsNumber;
        }

        const allCatProducts = await Product.findAndCountAll({
            limit: size,
            offset: page * size,
            order: [['createdAt', 'DESC']]

        })
        return res.send({
            content: allCatProducts.rows,
            totalPages: Math.ceil(allCatProducts.count / Number.parseInt(size))
        })



    } else {
        return res.status(404).json('Aucun produit disponible');
    }
}

module.exports.showAllProducts = async (req, res) => {
    //const categorieId = req.params.categorieId;

    //if(categorieId)
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);

    let page = 0;

    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        page = pageAsNumber;
    }

    let size = 0;

    if (!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 6) && !(sizeAsNumber < 1)) {
        size = sizeAsNumber;
    }

    const allProducts = await Product.findAndCountAll({
        limit: size,
        offset: page * size,
        order: [['createdAt', 'ASC']]

    })
    return res.send({
        content: allProducts.rows,
        totalPages: Math.ceil(allProducts.count / Number.parseInt(size))
    })




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

    try {

        let image;
        const { file } = req;
        const { filename: food } = req.file;

        //Store the compress image with resize name
        const updateImg = file.destination + '/' + 'resized' + food;
     
         // Convert any input to very high quality JPEG output
        await sharp(file.path)
            .resize(640, 427)
            .jpeg({
                quality: 100,
                chromaSubsampling: '4:4:4'
            })
            .toFile(updateImg);
        
        fs.unlinkSync(file.path);

        // check new file and Update product picture
        if (req.file !== undefined) {
            image = updateImg;
        } else {
            req.body
        }

        if (productId) {
            const product = await Product.update(
                {
                    name: req.body.name,
                    product_image: image,
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

    } catch (error) {
        return res.status(500).json(error);

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

        //Delete  product with image in the DB Base  
        fs.unlink(`../frontend/public/uploads/food/${filename}`, () => {
            const result = Product.destroy({ where: { id: product.id } });
            if (!result) return res.status(404).json("Ce produit n'est pas disponible");
            return res.status(200).json('Le produit a été bien supprimé');

        });

    } catch (error) {
        return res.status(500).json(error);

    }
}