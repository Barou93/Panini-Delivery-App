import React from "react";
import OrderValide from "../../styles/assets/icons/sent-yellow.svg";
import WaitOrder from "../../styles/assets/icons/wait.svg";
import DeliveryOrder from "../../styles/assets/icons/ok.svg";

const index = () => {
  return (
    <div className="home_content">
      <div className="text">Accueil</div>
      <main className="dashboard">
        <div className="dashboard__summary">
          <div className="dashboard__summary__resume">
            <div className="dashboard__summary__resume__infos">
              <div className="dashboard__summary__resume__icons">
                <img src={OrderValide} alt="commande valider" />
              </div>
              <div className="dashboard__summary__resume__text">
                <p>125</p>
                <span>Commandes du jour</span>
              </div>
            </div>
          </div>
          <div className="dashboard__summary__resume">
            <div className="dashboard__summary__resume__infos">
              <div className="dashboard__summary__resume__icons">
                <img src={WaitOrder} alt="commandes en attente" />
              </div>
              <div className="dashboard__summary__resume__text">
                <p>125</p>
                <span>Commandes en attente</span>
              </div>
            </div>
          </div>
          <div className="dashboard__summary__resume">
            <div className="dashboard__summary__resume__infos">
              <div className="dashboard__summary__resume__icons">
                <img src={DeliveryOrder} alt="commandes en attente" />
              </div>
              <div className="dashboard__summary__resume__text">
                <p>125</p>
                <span>Commandes en attente</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default index;
