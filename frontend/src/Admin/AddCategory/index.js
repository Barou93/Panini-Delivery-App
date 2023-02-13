import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory, getCategories } from "../../actions/categories.action";
import Img from "../../styles/assets/icons/img.svg";
import { Link } from "react-router-dom";
const AddCategory = () => {
  const [categoryText, setCategoryText] = useState("");
  const [categoryFile, setCategoryFile] = useState();
  const [categoryImg, setCategoryImg] = useState("");
  const [isUpload, setIsUpload] = useState(false);
  const [previewCatImg, setPreviewCatImg] = useState("");
  const dispatch = useDispatch();

  const handlePreviewCatImg = (e) => {
    const isRead = new FileReader();
    isRead.onload = () => {
      if (isRead.readyState === 2) {
        setPreviewCatImg(isRead.result);
        setIsUpload(true);
      }
    };
    isRead.readAsDataURL(e.target.files[0]);
    setCategoryFile(e.target.files[0]);
  };

  const handleCategory = async () => {
    if (categoryText && categoryFile) {
      const data = new FormData();
      if (categoryText) data.append("name", categoryText);
      if (categoryFile) data.append("category", categoryFile);
      await dispatch(addCategory(data));
      dispatch(getCategories());
      window.location.pathname = "/admin/categories";
      cancelCategory();
    }
  };
  const cancelCategory = () => {
    setCategoryText("");
    setCategoryImg("");
  };

  return (
    <div className="home_content categories_content">
      <div className="text">Créer une catégorie</div>
      <div className="dashboard__categories">
        <div className="dashboard__categories__container">
          <form
            onSubmit={handleCategory}
            className="dashboard__categories__form"
          >
            <div className="dashboard__categories__form__container">
              <div className="dashboard__categories__form__text">
                <label htmlFor="name">Nom de la catégorie</label>
                <input
                  type="text"
                  onChange={(e) => setCategoryText(e.target.value)}
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
                  onChange={handlePreviewCatImg}
                />
                <label htmlFor="file">
                  {!isUpload ? (
                    <img src={Img} alt="categorie-pic" />
                  ) : (
                    <img src={previewCatImg} alt="categorie-pic" />
                  )}
                </label>
              </div>
              <div className="dashboard__categories__form__buttons">
                <input
                  type="submit"
                  value="Ajouter"
                  className="dashboard__categories__form__buttons__add"
                />
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

export default AddCategory;
