import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { updateCategory } from "../../actions/categories.action";
import { getCategory } from "../../actions/category.action";

const UpdateCategory = () => {
  const [editCategory, setEditCategory] = useState("");
  const [loadCategory, setLoadCategory] = useState(true);
  const [locked, setLocked] = useState(false);
  const oneCategory = useSelector((state) => state.categoryReducer);

  const { id: cateId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (loadCategory) {
      dispatch(getCategory(cateId));
      setLoadCategory(false);
    }
  }, [dispatch, loadCategory, cateId]);

  const handleEditCategory = async () => {
    if (editCategory) {
      const data = new FormData();
      data.append("name", editCategory);
      await dispatch(updateCategory(cateId, editCategory));
      window.location = "/admin/categories";
    }
  };
  return (
    <div className="home_content categories_content">
      <div className="text">Mettre à jour la catégorie</div>
      <div className="dashboard__categories">
        <div className="dashboard__categories__container">
          <form
            onSubmit={handleEditCategory}
            className="dashboard__categories__form"
          >
            <div className="dashboard__categories__form__container">
              <div className="dashboard__categories__form__text">
                <label htmlFor="name">Nom de la catégorie</label>
                <input
                  type="text"
                  value={oneCategory.name}
                  onChange={(e) => setEditCategory(e.target.value)}
                  placeholder="Entrez le nom de la catégorie"
                  className="dashboard__categories__form__container__input"
                />
              </div>
              <div className="dashboard__categories__form__picture">
                <input
                  type="file"
                  name="cate"
                  id="file"
                  accept=".jpg, .jpeg, .png"
                  className="inputfile"
                />
                <label htmlFor="file">
                  <img src={oneCategory.picture} alt="categorie-pic" />
                </label>
              </div>
              <div className="dashboard__categories__form__buttons">
                <input
                  type="submit"
                  value="Ajouter"
                  className="dashboard__categories__form__buttons__add"
                />
                <span
                  onClick={(e) => setLocked(!locked)}
                  className="dashboard__categories__form__buttons__cancel"
                >
                  Annuler
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
