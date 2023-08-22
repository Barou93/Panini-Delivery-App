/** @format */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "../../Components/Utils";
import Img from "../../styles/assets/icons/img.svg";
import { createProduct } from "../../actions/product.action";
import { getProducts } from "../../actions/products.action";
import { Link, Navigate } from "react-router-dom";
const AddProduct = () => {
  const [productText, setProductText] = useState("");
  const [productFile, setProductFile] = useState();
  const [productPrice, setProductPrice] = useState(0);
  const [productImg, setProductImg] = useState("");
  const [isDownload, setIsDownload] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const [preview, setPreview] = useState("");

  const categories = useSelector((state) => state.categoriesReducer);

  const dispatch = useDispatch();

  //console.log(categoryId)

  const handlePreviewImg = (e) => {
    const bloUrl = URL.createObjectURL(e.target.files[0]);
    setPreview(bloUrl);
    setIsDownload(true);
    setProductFile(e.target.files[0]);
  };

  const handleProduct = async () => {
    if (productText && productPrice && productFile && categoryId) {
      const data = new FormData();

      if (categoryId) data.append("categorieId", categoryId);
      if (productText) data.append("name", productText);
      if (productPrice) data.append("price", productPrice);
      if (productFile) data.append("file", productFile);
      await dispatch(createProduct(data));
      cancelProduct();
      <Navigate to="/admin/products" />;
    }
  };

  const cancelProduct = () => {
    setProductImg("");
    setProductText("");
  };

  console.log(categoryId);

  return (
    <div className="home_content  add__content">
      <div className="text">Créer un produit</div>
      <main className="dashboard__categories add__product">
        <div className="dashboard__categories__container add__product__container">
          <form
            onSubmit={handleProduct}
            className="dashboard__categories__form add__product__form"
          >
            <div className="add__product__content">
              <div className="dashboard__categories__form__container add__product__form__container ">
                <div className="dashboard__categories__form__text add__product__form__text">
                  <label htmlFor="name">Nom du produit</label>
                  <input
                    type="text"
                    onChange={(e) => setProductText(e.target.value)}
                    placeholder="Entrez le nom du produit"
                    className="dashboard__categories__form__container__input add__product__input"
                  />
                </div>
                <div className="dashboard__categories__form__text add__product__form__text">
                  <label htmlFor="price">Prix du produit</label>
                  <input
                    type="number"
                    onChange={(e) =>
                      setProductPrice(parseInt(e.target.value, 10))
                    }
                    placeholder="Entrez le prix du produit"
                    className="dashboard__categories__form__container__input add__product__input"
                  />
                </div>
                <div className="dashboard__categories__form__text add__product__form__text">
                  <label htmlFor="category">
                    Selectionner la catégorie du produit
                  </label>
                  <select
                    id="category"
                    value={categoryId}
                    onChange={(e) =>
                      setCategoryId(parseInt(e.target.value, 10))
                    }
                  >
                    {!isEmpty(categories[0]) &&
                      categories.map((category, index) => {
                        return (
                          <>
                            <option value={category.id} key={index}>
                              {category.name}
                            </option>
                          </>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="dashboard__categories__form__picture add__product__picture">
                <input
                  type="file"
                  name="product"
                  id="file"
                  accept=".jpg, .jpeg, .png"
                  className="inputfile"
                  onChange={handlePreviewImg}
                />
                <label htmlFor="file">
                  {!isDownload ? (
                    <img src={Img} alt="icons" />
                  ) : (
                    <img src={preview} alt="categorie-pic" />
                  )}
                </label>
              </div>
            </div>
            <div className="dashboard__categories__form__buttons">
              <input
                type="submit"
                value="Ajouter"
                className="dashboard__categories__form__buttons__add"
              />
              <div className="dashboard__categories__form__buttons__cancel">
                <Link to="/admin/products">Annuler</Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;
