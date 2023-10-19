/** @format */

import React from "react";
import { useSelector } from "react-redux";

const TotalPrice = ({ cartId }) => {
  const carts = useSelector((state) => state.cartsReducer);
  const products = useSelector((state) => state.productsReducer);

  const filteredCartItems = carts.filter((cart) => cart.cartId === cartId);

  const totalPrice = filteredCartItems.reduce((total, cartItem) => {
    const product = products.find(
      (product) => product.id === cartItem.productId
    );
    if (product) {
      return total + product.price * cartItem.quantity;
    }
    return total;
  }, 0);

  return (
    <div className="cart__items__total">
      <div className="cart__items__total__container">
        <p>Montant total :</p>
        <span className="cart__items__total__price">{totalPrice} FCFA</span>
      </div>
    </div>
  );
};

export default TotalPrice;
