/** @format */

const models = require("../models");

const { Product, Option, Cart, OrderItem } = models;

const jwt = require("jsonwebtoken");

const maxAge = 24 * 60 * 60 * 1000; // 24h

const createToken = (id) => {
  return jwt.sign({ id }, process.env.CART_TOKEN, {
    expiresIn: maxAge,
  });
};

//Create a cart
module.exports.addToCart = async (req, res, next) => {
  try {
    const token = req.cookies.cart;

    let cartId; // Initialisez la variable cartId

    // Récupérez l'ID du panier à partir du cookie
    if (token) {
      const decoded = jwt.verify(token, process.env.CART_TOKEN);
      cartId = decoded.id;
    }
    const { productId, optionId, quantity } = req.body;
    const product = await Product.findByPk(productId);

    let option;

    if (optionId !== undefined) {
      option = req.body.optionId;
    }
    const isFound = await OrderItem.findOne({
      where: {
        productId: product.id,
        cartId: cartId,
      },
    });

    //Check if item has already been added to cart
    if (isFound)
      return res
        .status(401)
        .json(`${product.name} a déjà été ajouter au panier`);

    if (!token) {
      const cart = await Cart.create({});
      cart.save();

      const sessionToken = createToken(cart.id);
      res.cookie("cart", sessionToken, { httpOnly: true, maxAge });
      if (cart) {
        const createOrder = await OrderItem.create({
          CartId: cart.id,
          productId,
          quantity,
          optionId: option,
        });
        return res
          .status(201)
          .json({ order: createOrder.toJSON(), sessionToken });
      }
    } else {
      const decoded = jwt.verify(token, process.env.CART_TOKEN);
      const cartId = decoded.id;
      const cardExisting = await Cart.findByPk(cartId);

      if (cardExisting) {
        const addOrder = await OrderItem.create({
          CartId: cartId,
          productId,
          quantity,
          optionId: option,
        });
        return res.status(201).json(addOrder.toJSON());
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
// module.exports.addToCart = async (req, res, next) => {
//   try {
//     const { productId, optionId, quantity } = req.body;
//     const product = await Product.findByPk(productId);

//     let option;

//     if (optionId !== undefined) {
//       option = req.body.optionId;
//     }

//     const existingCart = JSON.parse(localStorage.getItem("cartData")) || [];
//     // Check if the item is already in the cart
//     const isFound = existingCart.find((item) => item.productId === productId);

//     if (isFound) {
//       return res
//         .status(401)
//         .json(`${product.name} a déjà été ajouté au panier`);
//     }

//     // If the item is not in the cart, add it to the local cart data
//     existingCart.push({ productId, optionId: option, quantity });
//     localStorage.setItem("cartData", JSON.stringify(existingCart));

//     // Create a new cart (if it doesn't exist)
//     const cart = await Cart.create({});
//     cart.save();

//     // Continue with other logic, like creating an OrderItem in the database.
//     const createOrder = await OrderItem.create({
//       CartId: cart.id,
//       productId,
//       quantity,
//       optionId: option,
//     });

//     // Respond with success.
//     return res.status(201).json({ order: createOrder.toJSON() });
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// };

//Get all cart
// module.exports.getCarts = async (req, res) => {
//   try {
//     const allCartItems = await OrderItem.findAll({
//       order: [["createdAt", "DESC"]],
//     });
//     return res.send(allCartItems);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };
//Get cart by cartId
module.exports.getCarts = async (req, res) => {
  try {
    //const cart = await OrderItem.findOne({ where: { cartId: id } });
    const cartByCartId = await OrderItem.findAll({
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json(cartByCartId);
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports.addQuantity = async (req, res) => {
  const { id } = req.params;

  try {
    const addQty = await OrderItem.findByPk(id);

    if (addQty) {
      addQty = addQty.quantity += 1;
      addQty
        .save()
        .then(() => {
          return res
            .status(200)
            .json(`Votre commande à  ${addQty.quantity} quantités`);
        })
        .catch((err) => {
          return res.status(400).json(err);
        });
    } else {
      return res
        .status(404)
        .json("Le produit séléctionner n'est plus disponible");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports.removeQuantity = async (req, res) => {
  const { id } = req.params;

  try {
    const removeQty = await OrderItem.findByPk(id);

    if (removeQty) {
      removeQty.quantity = removeQty.quantity -= 1;
      removeQty
        .save()
        .then(() => {
          return res
            .status(200)
            .json(`Votre commande a  ${removeQty.quantity} quantités`);
        })
        .catch((err) => {
          return res.status(400).json(err);
        });
    } else {
      return res
        .status(404)
        .json("Le produit séléctionner n'est plus disponible");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports.deleteCartItem = async (req, res) => {
  try {
    const { id } = req.body;
    //const cartId = req.params.cartId;

    const item = await OrderItem.findOne({ where: { id } });
    console.log(item.id);
    const deleteCart = await OrderItem.destroy({ where: { id: item.id } });

    if (deleteCart)
      return res.status(200).json("Le produit a été rétirer du panier");
    else return res.status(404).json("Cet article n'est plus disponible");
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports.deleteAllItems = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findOne({ where: { id } });

    if (cart) {
      const deleteAllItems = await OrderItem.destroy({
        where: {},
        truncate: true,
        cascade: false,
      });

      await Cart.destroy({ where: { id: cart.id } })
        .then((isEmpty) => {
          res.cookie("cart", "", { maxAge: 1 });
          return res.status(200).json("Le panier est vide" + isEmpty);
        })
        .catch((err) => {
          return res.status(400).json(err);
        });
    } else {
      return res.status(404).json("Le panier est indisponible");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
