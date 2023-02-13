import React from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../actions/product.action";

const DeleteProduct = (props) => {
  const dispatch = useDispatch();
  const deleteQuote = () => {
    dispatch(deleteProduct(props.id));
  };
  return (
    <div onClick={() => {
        if(window.confirm("Voulez-vous supprimer cet article ?")) {
            deleteQuote();
        }
    }}>
      <span className="delete__category delete__product">Supprimer</span>
      <span className="delete__category delete__product__mobile__delete"></span>
    </div>
  );
};

export default DeleteProduct;
