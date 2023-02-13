import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Logo from "../../styles/assets/img/Panini_logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.errors");
    const passwordError = document.querySelector(".password.errors");
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/admin/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          localStorage.setItem("isAuthenticated", "true");
          window.location = "/admin";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="register register_signin">
      <div className="logo__container">
        <img src={Logo} alt="Logo Panini" className="logo__container__img" />
      </div>
      <div className="register__form signin">
        <form onSubmit={handleLogin} action="" id="sign-in-form">
          <div className="email-container">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              id="email"
              className="mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre adresse email"
            />
          </div>
          <div className="email errors"></div>

          <br />
          <div className="password-container">
            <label htmlFor="password"> Mot de passe </label>
            <br />
            <input
              type="password"
              id="password"
              className="pass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
            />
          </div>
          <div className="password errors"></div>
          <br />
          <Link to="/forgot-password" className="forgot-password">
            Mot de passe oublié ?{" "}
          </Link>
          <br />
          <input type="submit" value="Se connecter" className="submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;
