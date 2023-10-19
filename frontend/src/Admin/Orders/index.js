/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCarts } from "../../actions/carts.action";
import { getOrders } from "../../actions/orders.action";
import { getProducts } from "../../actions/products.action";
import Pagination from "../../Components/Pagination";
import { isEmpty } from "../../Components/Utils";
import { dateFormatter } from "../../utils/HumanReadableDateFormat";
import DeleteOrder from "../DeleteOrder";
import UpdateOrder from "../UpdateOrder";
import EmptyItem from "../../Components/EmptyItem";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loadOrders, setLoadOrders] = useState(true);
  const [currentOrderPage, setCurrentOrderPage] = useState(1);
  const [ordersPerPage] = useState(6);
  const orders = useSelector((state) => state.ordersReducer);
  const products = useSelector((state) => state.productsReducer);
  const carts = useSelector((state) => state.cartsReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    if (loadOrders) {
      dispatch(getOrders());
      setAllOrders(orders);
      setLoadOrders(false);
    }
  }, [dispatch, loadOrders, orders]);

  const LastPageIndex = currentOrderPage * ordersPerPage;

  const firstPageIndex = LastPageIndex - ordersPerPage;

  const currentOrders = Object.values(allOrders).slice(
    firstPageIndex,
    LastPageIndex
  );

  return (
    <div className="home_content">
      <div className="sales-boxes">
        {!isEmpty(currentOrders[0]) ? (
          <div className="recent-sales box">
            <div className="title">Toutes les commandes</div>
            <div className="sales-details">
              <ul className="details">
                <li className="topic"> Dates</li>
                {!isEmpty(currentOrders[0]) &&
                  currentOrders.map((date, index) => {
                    return (
                      <li key={index}>
                        <span className="order-infos">
                          {dateFormatter(date.createdAt)}
                        </span>
                      </li>
                    );
                  })}
              </ul>
              <ul className="details">
                <li className="topic"> Clients</li>
                {!isEmpty(currentOrders[0]) &&
                  currentOrders.map((order, index) => {
                    return (
                      <li key={index}>
                        <span className="order-infos">{order.username}</span>
                      </li>
                    );
                  })}
              </ul>
              <ul className="details">
                <li className="topic">N°Téléphone</li>
                {!isEmpty(currentOrders[0]) &&
                  currentOrders.map((order, index) => {
                    return (
                      <li key={index}>
                        <span>{order.phone_number}</span>
                      </li>
                    );
                  })}
              </ul>
              <ul className="details">
                <li className="topic"> Quartier</li>
                {!isEmpty(currentOrders[0]) &&
                  currentOrders.map((order, index) => {
                    return (
                      <li key={index}>
                        <span className="order-infos">{order.address}</span>
                      </li>
                    );
                  })}
              </ul>
              <ul className="details">
                <li className="topic"> Prix total</li>
                {!isEmpty(currentOrders[0]) &&
                  currentOrders.map((order, index) => {
                    return (
                      <li key={index}>
                        <span className="order-infos">
                          {order.totalPrice} F CFA
                        </span>
                      </li>
                    );
                  })}
              </ul>
              <ul className="details">
                <li className="topic">Détails</li>
                {!isEmpty(currentOrders[0]) &&
                  currentOrders.map((order, index) => {
                    return (
                      <li key={index}>
                        <Link className="order-print" to={`${order.id}`}>
                          Afficher
                        </Link>
                      </li>
                    );
                  })}
              </ul>
              <ul className="details">
                <li className="topic"></li>
                {!isEmpty(currentOrders[0]) &&
                  currentOrders.map((order, index) => {
                    return <DeleteOrder id={order.id} key={index} />;
                  })}
              </ul>
            </div>
            <Pagination
              totalProducts={allOrders.length}
              productsPerPage={ordersPerPage}
              paginate={setCurrentOrderPage}
              currentPage={currentOrderPage}
            />
          </div>
        ) : (
          <EmptyItem />
        )}
      </div>
    </div>
  );
};

export default Orders;
