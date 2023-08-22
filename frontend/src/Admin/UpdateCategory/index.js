import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { updateCategory } from "../../actions/categories.action";
import { getCategory } from "../../actions/category.action";

const UpdateCategory = () => {
  const [editCategory, setEditCategory] = useState("");
  const [updatedCate, setUpdatedCate] = useState(false);
  const [loadCategory, setLoadCategory] = useState(true);
  const oneCategory = useSelector((state) => state.categoryReducer);

  //console.log(oneCategory);

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

      <Navigate to="/admin/categories" />;
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
                {updatedCate === false && (
                  <p className="dashboard__categories__form__container__input">
                    {oneCategory.name}
                  </p>
                )}
                {updatedCate && (
                  <input
                    type="text"
                    defaultValue={oneCategory.name}
                    onChange={(e) => setEditCategory(e.target.value)}
                    placeholder="Entrez le nom de la catégorie"
                    className="dashboard__categories__form__container__input"
                  />
                )}
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
                {updatedCate ? (
                  <input
                    type="submit"
                    value="Enregistrer"
                    className="dashboard__categories__form__buttons__add"
                  />
                ) : (
                  <button
                    onClick={() => setUpdatedCate(!updatedCate)}
                    className="dashboard__categories__form__buttons__add"
                  >
                    Modifier
                  </button>
                )}
                <Link
                  to="/admin/categories"
                  className="dashboard__categories__form__buttons__cancel"
                >
                  Annuler
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
