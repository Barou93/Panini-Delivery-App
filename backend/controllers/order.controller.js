const { Op } = require('sequelize');
const models = require('../models');

const { Product, OrderItem, Cart, Option, ShopOrder } = models;

const { pagination } = require('../utils/pagination')

/**
 * 
 * @param {JSON STRING}  
 * @param {string}  
 * @returns  {JSON String}
 */

module.exports.createOrder = async (req, res) => {


    const { username, phone_number, address, status, totalPrice } = req.body;

    try {
        const { id } = req.params;

        const cart = await Cart.findByPk(id);

        console.log(cart.id)

        const order = await OrderItem.findAll({
            where: { cartId: cart.id }
        });


        //Vérifier si le panier contient des éléments;
        if (!cart.id) {
            return res.status(404).json("Cet article n'est plus disponible");
        }


        //Récupérer toutes les valeurs contenu dans le tableau et les ajouter
        const total = await Promise.all(order.map(async (orderItemId) => {
            const products = await Product.findOne({ where: { id: orderItemId.productId } });
            const options = await Option.findOne({ where: { id: orderItemId.optionId } });
            const qty = await OrderItem.findOne({ where: { quantity: orderItemId.quantity } });

            let prices;

            //Ajouter le prix de l'article + la quantité
            prices = products.price * qty.quantity;
            //console.log(prices)

            return prices;
        }))


        //Faire la somme total des prix des produits contenu dans le tableau
        const totalPrices = total.reduce((a, b) => a + b, 0);

        console.log(totalPrices)

        //Créer la commande après vérification
        const createOrder = await ShopOrder.create({

            orderId: cart.id,
            username,
            phone_number,
            address,
            status,
            totalPrice: totalPrices
        });

        createOrder.save();
        res.cookie('cart', '', { maxAge: 1 });
        return res.status(201).json(createOrder);

    } catch (error) {
        return res.status(500).json(error.message)

    }

};
module.exports.getAllOrders = async (req, res, next) => {
    try {

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

        const allOrders = await ShopOrder.findAndCountAll({
            limit: size,
            offset: page * size,
            order: [['createdAt', 'DESC']]

        })
        return res.send({
            content: allOrders.rows,
            totalPages: Math.ceil(allOrders.count / Number.parseInt(size))
        })


    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports.getOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        await ShopOrder.findByPk(id).then((order) => {
            return res.status(200).json(order);
        }).catch((err) => {
            return res.status(404).json('Commande non disponible' + err)
        })

    } catch (error) {
        return res.status(500).json(error);
    }
};

//Modifier l'état de la commande
module.exports.updateOrder = async (req, res) => {
    //Stauts values: Pedding, Accepted, Rejected, Delivery
    try {
        const { id } = req.params;

        const order = await ShopOrder.findOne({ where: { id } });

        if (order) {
            const acceptedOrder = await ShopOrder.update({ status: 'Delivery' },
                { where: { id: order.id } });

            if (acceptedOrder) return res.status(204).json('Commande acceptée');

            else return res.status(400).json('Une erreur est detecter');

        } else {
            return res.status(404).json("Commande non trouvé");
        }

    } catch (error) {

        return res.status(500).json(error)

    }

}


module.exports.deleteOrders = async (req, res, next) => {

    try {
        const { id } = req.params;
        const order = await ShopOrder.findOne({ where: { id } });

        if (order) {
            const deleteOrder = await ShopOrder.destroy({ where: { id: order.id } })
            if (deleteOrder) return res.status(200).json("La commande a été supprimé avec succès");
            else return res.status(400).json("Une erreur est disponible");
        } else {
            return res.status(404).json("Cet article n'est plus disponible")
        }

    } catch (error) {

        return res.status(500).json(error)

    }
};