/** @format */

import React from "react";
import { Link } from "react-router-dom";
import HomeRed from "../../styles/assets/icons/home-red.svg";
import CartWhite from "../../styles/assets/icons/cart-white.svg";
import OrderWhite from "../../styles/assets/icons/order-white.svg";
const Footer = () => {
  return (
    <div>
      <footer class="mobile__appviewer footer">
        <div class="footer__details">
          <div class="footer__logo">
            <a href="index.html">
              <p class="header__topbar__logo">Panini</p>
            </a>
          </div>

          <div className="footer__social">
            <div className="footer__social__icons">
              <h2>Suivez-nous sur :</h2>
              <Link
                to="www.facebook.com"
                className="footer__social__icon fb"
              ></Link>
              <Link
                to="www.instagram.com"
                className="footer__social__icon ins"
              ></Link>
            </div>
          </div>
        </div>
        <div className="footer__infos">
          <div className="footer__infos__copy">
            <p>&copy; 2022 Panini. Tout droit réservé</p>
          </div>
          <div className="footer__infos__author">
            <a href="https://www.linkedin.com/in/oumar-mauret-257489bb/">
              Design by Oumar MAURET
            </a>
          </div>
        </div>
        <div className="mobile__appviewer__contain">
          <div className="mobile__appviewer__container">
            <Link to="/">
              <img
                src={HomeRed}
                alt="page d'accueil"
                className="mobile__appviewer__icons"
              />
              <p className="active">Accueil</p>
            </Link>
            <Link to="/panier">
              <img
                src={CartWhite}
                alt="page panier"
                className="mobile__appviewer__icons"
              />
              <p>Panier</p>
            </Link>
            <Link to="/commandes">
              <img
                src={OrderWhite}
                alt="page commande"
                className="mobile__appviewer__icons"
              />
              <p>Commandes</p>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
