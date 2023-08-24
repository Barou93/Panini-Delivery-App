/** @format */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../actions/product.action";
import { getProducts } from "../../actions/products.action";

import { isEmpty } from "../../Components/Utils";

const UpdateProduct = () => {
  const [editProduct, setEditProduct] = useState(null);
  const [updateImg, setUpdateImg] = useState("");
  const [updatePrice, setUpdatePrice] = useState(null);
  const [loadProduct, setLoadProduct] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);

  const [isLoad, setIsLoad] = useState(false);
  const [isImgUpload, setIsImgUpload] = useState("");
  const product = useSelector((state) => state.productReducer);
  const categories = useSelector((state) => state.categoriesReducer);

  const dispatch = useDispatch();
  const { id: productId } = useParams();

  useEffect(() => {
    if (loadProduct) {
      dispatch(getProduct(productId));
      setLoadProduct(false);
    }
  }, [dispatch, loadProduct, productId]);

  const handlePreviewPicture = (e) => {
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setIsImgUpload(imageUrl);
    setIsLoad(true);
    setUpdateImg(e.target.files[0]);
  };

  const handleEditProduct = async () => {
    if (editProduct || updatePrice || updateImg) {
      const data = new FormData();
      data.append("name", editProduct);
      data.append("price", updatePrice);
      data.append("file", updateImg);
      await dispatch(updateProduct(productId, data));
      dispatch(getProducts());
      setIsUpdated(false);
      cancelEdit();
      <Navigate to="/admin/products" />;
    }
  };

  const cancelEdit = () => {
    setEditProduct(null);
    setUpdatePrice(null);
  };
  return (
    <div className="home_content  add__content">
      <div className="text">{product.name}</div>
      <main className="dashboard__categories add__product">
        <div className="dashboard__categories__container add__product__container">
          <form
            onSubmit={handleEditProduct}
            className="dashboard__categories__form add__product__form"
          >
            <div className="add__product__content">
              <div className="dashboard__categories__form__container add__product__form__container ">
                <div className="dashboard__categories__form__text add__product__form__text">
                  <label htmlFor="name">Nom du produit</label>
                  {isUpdated === false && (
                    <p className="dashboard__categories__form__container__input add__product__input">
                      {product.name}
                    </p>
                  )}
                  {isUpdated && (
                    <input
                      type="text"
                      defaultValue={product.name}
                      onChange={(e) => setEditProduct(e.target.value)}
                      placeholder="Entrez le nom du produit"
                      className="dashboard__categories__form__container__input add__product__input"
                    />
                  )}
                </div>
                <div className="dashboard__categories__form__text add__product__form__text">
                  <label htmlFor="price">Prix du produit</label>
                  {isUpdated === false && (
                    <p className="dashboard__categories__form__container__input add__product__input">
                      {product.price}
                    </p>
                  )}
                  {isUpdated && (
                    <input
                      type="text"
                      defaultValue={product.price}
                      onChange={(e) =>
                        setUpdatePrice(parseInt(e.target.value, 10))
                      }
                      placeholder="Entrez le prix du produit"
                      className="dashboard__categories__form__container__input add__product__input"
                    />
                  )}
                </div>
                <div className="dashboard__categories__form__text add__product__form__text">
                  <label htmlFor="category">
                    Selectionner la catégorie du produit
                  </label>
                  <select id="category" disabled value={product.categorieId}>
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
                  onChange={handlePreviewPicture}
                />
                <label htmlFor="file">
                  {!isLoad ? (
                    <img src={product.product_image} alt="icons" />
                  ) : (
                    <img src={isImgUpload} alt="categorie-pic" />
                  )}
                </label>
              </div>
            </div>
            <div className="dashboard__categories__form__buttons">
              {isUpdated ? (
                <input
                  type="submit"
                  value="Enregister"
                  className="dashboard__categories__form__buttons__add"
                />
              ) : (
                <button
                  onClick={() => setIsUpdated(!isUpdated)}
                  className="dashboard__categories__form__buttons__add"
                >
                  Modifier
                </button>
              )}
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

export default UpdateProduct;
