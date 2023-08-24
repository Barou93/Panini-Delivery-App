/** @format */

import React from "react";
import Footer from "../../Components/Footer";
import ArrowBlack from "../../styles/assets/icons/arrow-back.svg";
import { Link, NavLink } from "react-router-dom";

const Product = () => {
  return (
    <div>
      <header className="header product__head">
        <div className="header__topbar">
          <Link to="/" className="backtohome">
            <img src={ArrowBlack} alt="bouton retour à l'accueil" />
          </Link>
          <Link to="/">
            <p className="header__topbar__logo">Panini</p>
          </Link>
          <div className="header__cart__desktop">
            <span className="header__topbar__cart__value"></span>
            <a href="cart.html" className="header__topbar__cart__icon">
              Mon panier
            </a>
          </div>
        </div>
      </header>
      <main>
        <section>
          <article className="product">
            <header className="product__header">
              <Link to="/" className="product__header__back-icon">
                <img src={ArrowBlack} alt="retour à l'accueil" />
              </Link>
              <figure className="product__img">
                <img
                  src="../src/assets/img/sandwich.jpg"
                  alt="détails du produit"
                />
              </figure>
            </header>
            <div className="product__order">
              <hgroup className="product__order__title">
                <h3 className="product__order__name">Shawarma Viande</h3>
                <h4 className="product__order__price">1 000 F CFA</h4>
              </hgroup>
              <div className="product__order__category">
                <span>Catégorie de produit</span>
                <p className="strong">Panini</p>
              </div>
              <div className="product__footer">
                <div className="product__footer__btn">
                  <a
                    href="cart.html"
                    className="product__footer__btn__addtocart"
                  >
                    Ajouter au panier
                  </a>
                </div>
              </div>
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Product;
