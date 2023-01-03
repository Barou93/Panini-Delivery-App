import React, { useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import Logo from "../../styles/assets/img/Panini_logo.png";

const Register = () => {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const firstnameError = document.querySelector(".firstname.errors");
    const lastnameError = document.querySelector(".lastname.errors");
    const emailError = document.querySelector(".email.errors");
    const passwordError = document.querySelector(".password.errors");
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/admin/register`,
      withCredentials: true,
      data: {
        name,
        lastname,
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          firstnameError.innerHTML = res.data.errors.name;
          lastnameError.innerHTML = res.data.errors.lastname;
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          setFormSubmit(true);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div>
      {formSubmit ? (
        <>
          <Navigate to="/dashboard" />
        </>
      ) : (
        <>
          <div className="register">
            <div className="logo__container">
              <img
                src={Logo}
                alt="Logo Panini"
                className="logo__container__img"
              />
            </div>
            <div className="register__form">
              <h1 className="main_title">Créer un compte</h1>
              <div className="message errors"></div>
              <form
                action="#"
                onSubmit={handleRegister}
                className="form_signup"
              >
                <div className="firstname-container">
                  <label htmlFor="firstname">Prénom</label>
                  <br />
                  <input
                    type="text"
                    id="firstname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Entrez votre nom"
                  />
                </div>
                <div className="firstname errors"></div>
                <div className="lastname-container">
                  <label htmlFor="lastname">Nom</label>
                  <br />
                  <input
                    type="text"
                    id="lastname"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Entrez votre prénom"
                  />
                </div>
                <div className="lastname errors"></div>
                <div className="email-container">
                  <label htmlFor="email">Email</label>
                  <br />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    placeholder="Entrez votre adresse email"
                  />
                </div>
                <div className="email errors"></div>
                <br />
                <div className="password-container">
                  <label htmlFor="password">
                    Mot de passe (8 caractères minimum)
                  </label>
                  <br />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    placeholder="Entrez votre mot de passe"
                  />
                </div>
                <div className="password errors"></div>
                <br />
                <input type="submit" value="S'inscrire" />
                <div className="account">
                  <p>Déjà inscrit(e) ?</p>
                  <Link to="/login" className="account__signup">
                    S'identifier
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
