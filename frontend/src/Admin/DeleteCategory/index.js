import React from "react";
import { useDispatch } from "react-redux";
import { deleteCategory } from "../../actions/categories.action";

const DeleteCategory = (props) => {
  const dispatch = useDispatch();

  const deleteCat = () => {
    dispatch(deleteCategory(props.id));
  };
  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer cette catégorie ?")) {
          deleteCat();
        }
      }}
    >
      <span className="delete__category"></span>
    </div>
  );
};

export default DeleteCategory;
