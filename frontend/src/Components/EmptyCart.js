/** @format */

import React from "react";
import { Link } from "react-router-dom";
import EmptyCartImg from ".././styles/assets/img/empty-cart.gif";
const EmptyCart = () => {
  return (
    <div className="empty__cart">
      <img src={EmptyCartImg} alt="panier vide" className="empty__cart__img" />
      <p className="empty__cart__text">Votre panier est vide !</p>

      <Link className="empty__cart__link" to="/">
        Continuer vos achats
      </Link>
    </div>
  );
};

export default EmptyCart;
