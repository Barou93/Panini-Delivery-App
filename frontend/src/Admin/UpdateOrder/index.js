import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../../actions/orders.action";

const UpdateOrder = ({ orderId }) => {
  const [isAccepted, setIsAccepted] = useState(false);

  const dispatch = useDispatch();
  const orders = useSelector((state) => state.ordersReducer);

  const handleUpdateStatus = () => {
    dispatch(updateOrder(orderId));
    setIsAccepted(true);
  };

  const status = orders.map((order) => order.status === "Accepter");
  console.log(status);

  useEffect(() => {
    if (status) {
      setIsAccepted(true);
    } else setIsAccepted(false);
  }, [status, isAccepted]);

  return (
    <div>
      {isAccepted === false && (
        <li>
          <span onClick={handleUpdateStatus} className="validate-order"></span>
        </li>
      )}{" "}
      {isAccepted && (
        <li>
          <span className="order-infos"></span>
        </li>
      )}
    </div>
  );
};

export default UpdateOrder;
