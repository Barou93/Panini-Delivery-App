/** @format */

import React, { useEffect } from "react";
import Footer from "../../Components/Footer";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "../../Components/Utils";
import TotalPrice from "../../Components/TotalPrice";
import axios from "axios";
import Cookies from "js-cookie";
import { setCart } from "../../actions/cart.action";
import EmptyCart from "../../Components/EmptyCart";

const Cart = () => {
  const cart = useSelector((state) => state.cartReducer);
  const cartItems = useSelector((state) => state.cartsReducer);
  const products = useSelector((state) => state.productsReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    // Utilisez l'ID du panier stocké dans le cookie pour récupérer les données du panier
    const cartId = cart.cartId;

    if (cartId) {
      dispatch(setCart());
    }
  }, [cart.cartId, dispatch]);

  return (
    <div>
      <header className="header">
        <div className="header__topbar">
          <Link to="/">
            <p className="header__topbar__logo">Panini</p>
          </Link>
          <div className="header__cart__desktop">
            <span className="header__topbar__cart__value">
              {/* Afficher la quantité totale d'articles dans le panier ici */}
              {/* Vous devez implémenter la logique pour afficher la quantité ici */}
            </span>
            <Link to="/panier" className="header__topbar__cart__icon">
              Mon panier
            </Link>
          </div>
        </div>
        <div className="cart__header">
          <Link to="/" className="cart__back-icon"></Link>
          <h1 className="header__insight">Mon Panier</h1>
        </div>
      </header>
      <main className="main">
        <section className="table">
          {cart.cartId !== null ? (
            <>
              <table className="cart__table">
                <thead>
                  <tr>
                    <th>Produits</th>
                    <th>Quantités</th>
                    <th>Prix</th>
                    <th>#</th>
                  </tr>
                </thead>
                <tbody>
                  {!isEmpty(cartItems) &&
                    cartItems
                      .filter((cartItem) => cartItem.cartId === cart.cartId)
                      .map((cartItem) => {
                        const product = products.find(
                          (p) => p.id === cartItem.productId
                        );

                        if (product) {
                          return (
                            <tr data-label="Produits" key={cartItem.id}>
                              <td className="cart__items__product">
                                <div className="cart__items__product__img">
                                  <img
                                    src={product.product_image}
                                    alt="produit ajouté au panier"
                                  />
                                </div>
                                <div className="cart__items__product__infos">
                                  <p>{product.name}</p>
                                </div>
                              </td>
                              <td className="cart__items__quantity">
                                <div className="cart__items__quantity__container">
                                  <button
                                    className="cart__items__quantity__btn"
                                    id="minus"
                                  >
                                    -
                                  </button>
                                  <span className="cart__items__quantity__product">
                                    {cartItem.quantity}
                                  </span>
                                  <button
                                    className="cart__items__quantity__btn"
                                    id="plus"
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td className="cart__items__price__infos">
                                <p>{product.price} F CFA</p>
                              </td>
                              <td className="cart__items__delete">
                                <button className="cart__items__delete__btn"></button>
                              </td>
                            </tr>
                          );
                        } else {
                          return null;
                        }
                      })}
                </tbody>
              </table>
              <TotalPrice cartId={cart.cartId} />
              <div className="cart__items__next">
                <Link to="/contact" className="cart__items__next__btn">
                  Continuer
                </Link>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
