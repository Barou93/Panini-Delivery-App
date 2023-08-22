import React from "react";
import { useDispatch } from "react-redux";
import { removeOrder } from "../../actions/orders.action";

const DeleteOrder = (props) => {
  const dispatch = useDispatch();
  const deleteItem = () => {
    dispatch(removeOrder(props.id));
  };
  return (
    <li>
      <span
        onClick={() => {
          if (window.confirm("Voulez supprimer cette commande ?")) {
            deleteItem();
          }
        }}
        className="delete-order"
      ></span>
    </li>
  );
};

export default DeleteOrder;
