/** @format */

import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header className="header">
        <div className="header__topbar">
          <Link to="/">
            <p className="header__topbar__logo">Panini</p>
          </Link>
          <div className="header__cart__desktop">
            <span className="header__topbar__cart__qty"></span>
            <span className="header__topbar__cart__value"></span>
            <Link to="/panier" className="header__topbar__cart__icon">
              Mon panier
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
