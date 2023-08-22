/** @format */

import React, { useEffect, useState } from "react";
import OrderValide from "../../styles/assets/icons/sent-yellow.svg";
import WaitOrder from "../../styles/assets/icons/wait.svg";
import DeliveryOrder from "../../styles/assets/icons/ok.svg";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions/orders.action";
import Orders from "../Orders";
import Pagination from "../../Components/Pagination";
import { isEmpty } from "../../Components/Utils";
import { dateFormatter } from "../../utils/HumanReadableDateFormat";
import EmptyItem from "../../Components/EmptyItem";

const Dashboard = () => {
  const [allRecentOrders, setAllRecentOrders] = useState([]);
  const [loadRecentOrders, setLoadRecentOrders] = useState(true);
  const orders = useSelector((state) => state.ordersReducer);
  const dispatch = useDispatch();
  const [ordersPage, setOrdersPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const allPeddingOrder = Object.values(orders).map(
    (pedding) => pedding.status === "En attente"
  );
  const allValidateOrder = Object.values(orders).map(
    (accepted) => accepted.status === "Accepter"
  );

  useEffect(() => {
    if (loadRecentOrders) {
      dispatch(getOrders());
      setAllRecentOrders(orders);
      setLoadRecentOrders(false);
    }
  }, [dispatch, orders, loadRecentOrders]);

  const lastOrders = ordersPage * ordersPerPage;
  const firstOrders = lastOrders - ordersPerPage;

  const recentOrders = Object.values(allRecentOrders).slice(
    firstOrders,
    lastOrders
  );
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
                <p>{recentOrders.length}</p>
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
                <p>{allPeddingOrder.length}</p>
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
                <p>{allValidateOrder}</p>
                <span>Commandes validée</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="sales-boxes">
        {!isEmpty(recentOrders[0]) ? (
          <div className="recent-sales box">
            <div className="title">Commandes récentes</div>
            <div className="sales-details">
              <ul className="details">
                <li className="topic"> Dates</li>
                {!isEmpty(recentOrders[0]) &&
                  recentOrders.map((date, index) => {
                    return (
                      <li key={index}>
                        <span>{dateFormatter(date.createdAt)}</span>
                      </li>
                    );
                  })}
              </ul>
              <ul className="details">
                <li className="topic"> Clients</li>
                {!isEmpty(recentOrders[0]) &&
                  recentOrders.map((order, index) => {
                    return (
                      <li key={index}>
                        <span>{order.username}</span>
                      </li>
                    );
                  })}
              </ul>
              <ul className="details">
                <li className="topic">N°Téléphone</li>
                {!isEmpty(recentOrders[0]) &&
                  recentOrders.map((order, index) => {
                    return (
                      <li key={index}>
                        <span>{order.phone_number}</span>
                      </li>
                    );
                  })}
              </ul>
              <ul className="details">
                <li className="topic"> Quartier</li>
                {!isEmpty(recentOrders[0]) &&
                  recentOrders.map((order, index) => {
                    return (
                      <li key={index}>
                        <span>{order.address}</span>
                      </li>
                    );
                  })}
              </ul>
              <ul className="details">
                <li className="topic"> Prix total</li>
                {!isEmpty(recentOrders[0]) &&
                  recentOrders.map((order, index) => {
                    return (
                      <li key={index}>
                        <span>{order.totalPrice} F CFA</span>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        ) : (
          <EmptyItem />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
