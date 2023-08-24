/** @format */

import React from "react";

const Header = () => {
  return (
    <div>
      <header className="header">
        <div className="header__topbar">
          <a href="index.html">
            <p className="header__topbar__logo">Panini</p>
          </a>
          <div className="header__cart__desktop">
            <span className="header__topbar__cart__qty"></span>
            <span className="header__topbar__cart__value"></span>
            <a href="cart.html" className="header__topbar__cart__icon">
              Mon panier
            </a>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
