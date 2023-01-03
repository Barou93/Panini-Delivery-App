import React, { useState } from "react";
import { useSelector } from "react-redux";

const Settings = () => {
  const adminData = useSelector((state) => state.adminReducer);
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUpdateProfil = (e) => {
    e.preventDefault();
  };
  return (
    <div className="home_content add__content">
      <div className="text">Paramètres</div>
      <main className="dashboard__categories add__product">
        <div className="dashboard__categories__container add__product__container">
          <form
            onSubmit={handleUpdateProfil}
            className="dashboard__categories__form add__product__form"
          >
            <div className="add__product__content">
              <div className="dashboard__categories__form__container add__product__form__container">
                <div className="dashboard__categories__form__text add__product__form__text">
                  <label htmlFor="name">
                    <input
                      value={adminData.name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="Modifier votre nom"
                      className="dashboard__categories__form__container__input add__product__input"
                    />
                  </label>
                </div>
                <div className="dashboard__categories__form__text add__product__form__text">
                  <label htmlFor="lastname">Prénom</label>
                  <input
                    type="text"
                    value={adminData.lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Entrez votre prénom"
                    className="dashboard__categories__form__container__input add__product__input"
                  />
                </div>
                <div className="dashboard__categories__form__text add__product__form__text">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    value={adminData.email}
                    placeholder="Entrez votre email"
                    readOnly
                    className="dashboard__categories__form__container__input add__product__input"
                  />
                </div>
                <div class="dashboard__categories__form__text add__product__form__text">
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    type="password"
                    value={adminData.password}
                    readOnly
                    placeholder="Entrez votre mot de passe"
                    className="dashboard__categories__form__container__input add__product__input"
                  />
                </div>
              </div>
              <div className="dashboard__categories__form__picture add__product__picture">
                <input
                  type="file"
                  name="cate"
                  id="file"
                  className="inputfile"
                />
                <label htmlFor="file">
                  <img src={adminData.picture} alt="icon pic" />
                </label>
              </div>
            </div>
            <div className="dashboard__categories__form__buttons">
              <input
                type="submit"
                value="Mettre à jour"
                class="dashboard__categories__form__buttons__add"
              />
              <div className="dashboard__categories__form__buttons__cancel">
                <a href="#">Annuler</a>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Settings;
