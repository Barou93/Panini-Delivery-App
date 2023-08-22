/** @format */

import React from "react";
import EmptyItem from "../../Components/EmptyItem";
import DeleteOrder from "../DeleteOrder";
import { useParams } from "react-router-dom";
import { isEmpty } from "../../Components/Utils";
import { useSelector } from "react-redux";
const OrderDetails = () => {
  const orders = useSelector((state) => state.ordersReducer);
  const products = useSelector((state) => state.productsReducer);
  const carts = useSelector((state) => state.cartsReducer);
  const { id: orderId } = useParams();
  const orderid = orders.map((order) => order.id);

  const IdOrder = parseInt(orderId);
  console.log(orderid.includes(orderId));

  return (
    <div>
      <div className="home_content white">
        <div className="text">Détails de la commande</div>
        {orderId ? (
          <div className="order-details__container">
            <div className="order-details__product">
              <div className="order-details__product__items">
                {!isEmpty(carts[0]) &&
                  carts.map((cart, index) => {
                    for (let i = 0; i < products.length; i++) {
                      if (cart.productId === products[i].id && cart.cartId) {
                        return (
                          <li className="order-details__list" key={index}>
                            <img
                              className="order-details__img"
                              src={products[i].product_image}
                              alt=""
                            />
                            <p className="order-details__productname">
                              {products[i].name}
                            </p>
                            <p className="order-details__productname">
                              {products[i].price} F CFA
                            </p>
                            <span className="order-details__qty">
                              x {cart.quantity}
                            </span>
                          </li>
                        );
                      }
                    }
                    return null;
                  })}
              </div>
              <div className="order-details__customer">
                <div className="order-details__customer__infos">
                  {orders.map((order, index) => {
                    if (order.id === IdOrder) {
                      return (
                        <li
                          className="order-details__customer-list"
                          key={index}
                        >
                          <h2 className="order-details__customer-list__h2">
                            {order.username}
                          </h2>
                          <div className="order-details__customer-list__para">
                            <p className="order-details__customer-list__p">
                              {order.phone_number}
                            </p>
                            <span className="order-details__customer-list__span">
                              {order.address}
                            </span>
                          </div>
                        </li>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
            <div className="order-details__customer__infos">
              {orders.map((order, index) => {
                if (order.id === IdOrder) {
                  return (
                    <li
                      className="order-details__customer-list__totalprice"
                      key={index}
                    >
                      <h2 className="order-details__customer-list__totalprice__h2">
                        Total : {order.totalPrice} F CFA
                      </h2>
                    </li>
                  );
                }
              })}
            </div>
          </div>
        ) : (
          <EmptyItem />
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
