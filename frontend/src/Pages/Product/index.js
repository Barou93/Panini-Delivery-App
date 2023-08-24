/** @format */

import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer";
import ArrowBlack from "../../styles/assets/icons/arrow-back.svg";
import { Link, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../actions/product.action";
import { getProducts } from "../../actions/products.action";

import { isEmpty } from "../../Components/Utils";
import { useDispatch, useSelector } from "react-redux";

const Product = () => {
  const [loadProduct, setLoadProduct] = useState(true);
  const product = useSelector((state) => state.productReducer);
  const categories = useSelector((state) => state.categoriesReducer);
  const dispatch = useDispatch();
  const { id: productId } = useParams();
  const productID = parseInt(productId);
  console.log(productID);
  console.log(product.id);
  useEffect(() => {
    if (loadProduct) {
      dispatch(getProduct(productId));
    }
  }, [dispatch, loadProduct, productId]);
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
            <Link to="/panier" className="header__topbar__cart__icon">
              Mon panier
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section>
          <article className="product">
            {productID === product.id ? (
              <>
                {" "}
                <header className="product__header">
                  <Link to="/" className="product__header__back-icon">
                    <img src={ArrowBlack} alt="retour à l'accueil" />
                  </Link>
                  <figure className="product__img">
                    <img src={product.product_image} alt="détails du produit" />
                  </figure>
                </header>
                <div className="product__order">
                  <hgroup className="product__order__title">
                    <h3 className="product__order__name">{product.name} </h3>
                    <h4 className="product__order__price">
                      {product.price} FCFA{" "}
                    </h4>
                  </hgroup>
                  <div className="product__order__category">
                    <span>Catégorie de produit</span>
                    {!isEmpty(categories[0]) &&
                      categories.map((category, index) => {
                        if (product.categorieId === category.id) {
                          return (
                            <p key={index} className="strong">
                              {category.name}
                            </p>
                          );
                        }
                        return null;
                      })}
                  </div>
                  <div className="product__footer">
                    <div className="product__footer__btn">
                      <button
                        href="/panier"
                        className="product__footer__btn__addtocart"
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <h1>Ce produit n'est pas disponible</h1>
            )}
          </article>
        </section>
      </main>
      <footer className="mobile__appviewer footer footer-product">
        <div className="footer__details">
          <div className="footer__logo">
            <a href="index.html">
              <p className="header__topbar__logo">Panini</p>
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
      </footer>
    </div>
  );
};

export default Product;
