/**
 * @format
 *
 */
import React, { useState } from "react";
import Footer from "../../Components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../../actions/orders.action";
import { createOrder } from "../../actions/order.action";
import { Link, useNavigate } from "react-router-dom";
import cookie from "js-cookie";

const Contact = () => {
  const cart = useSelector((state) => state.cartReducer);
  const [username, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(cart.cartId);
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expire: 1 });
    }
  };
  //console.log(id);
  const handleSubmitOrder = async () => {
    if (username && address && phoneNumber && cart.cartId) {
      const data = new FormData();
      data.append("cartId", cart.cartId);
      data.append("username", username);
      data.append("address", address);
      data.append("phone_number", phoneNumber);
      console.log(data);
      await dispatch(createOrder(data));
      //dispatch(getOrders());
      removeCookie("cart");
      clearForm();
      //window.location = "/commandes";
    } else {
      alert("Renseignez vos informations SVP!");
    }
  };
  const clearForm = () => {
    setUserName("");
    setAddress("");
    setPhoneNumber("");
  };
  return (
    <div>
      <header className="header">
        <div className="header__topbar">
          <Link to="/">
            <p className="header__topbar__logo">Panini</p>
          </Link>
          <div className="header__cart__desktop">
            <span className="header__topbar__cart__value"></span>
          </div>
        </div>
      </header>
      <main className="main">
        <section>
          <h1 className="form__title">Entrez vos informations</h1>
          <form
            action=""
            className="form__container"
            onSubmit={handleSubmitOrder}
          >
            <div className="form__contain">
              <div className="form__input__container">
                <label htmlFor="name">Nom</label>
                <input
                  onChange={(e) => setUserName(e.target.value)}
                  value={username}
                  type="text"
                  id="name"
                  placeholder="Entrez votre nom"
                />
              </div>
              <div className="form__input__container">
                <label htmlFor="location">Quartier</label>
                <input
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  type="text"
                  id="location"
                  placeholder="Entrez le nom de votre quartier"
                />
              </div>
              <div className="form__input__container">
                <label htmlFor="number">N° de téléphone</label>
                <input
                  type="text"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                  id="number"
                  placeholder="Entrez votre numéor de téléphone "
                />
              </div>
            </div>
            <input
              className="form__submit"
              type="submit"
              value="Valider votre commande"
            />
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
