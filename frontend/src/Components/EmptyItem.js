/** @format */

import React from "react";
import EmptyOrder from ".././styles/assets/img/empty_orders.png";
const EmptyItem = () => {
  return (
    <div className="empty-container empty-home">
      <h1>Aucune commande pour le moment</h1>
      <img src={EmptyOrder} alt="icon empty order" />
    </div>
  );
};

export default EmptyItem;
