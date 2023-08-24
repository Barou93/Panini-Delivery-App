/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCategory } from "../../actions/category.action";
import { getProducts } from "../../actions/products.action";
import Pagination from "../../Components/Pagination";
import { isEmpty } from "../../Components/Utils";
import DeleteProduct from "../DeleteProduct";

const CategoryProduct = () => {
  const [loadAllProducts, setLoadAllProducts] = useState(true);
  const [allCateProducts, setAllCateProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [cateProductsPerPage] = useState(6);
  const products = useSelector((state) => state.productsReducer);

  const { id: cateId } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    if (loadAllProducts) {
      dispatch(getProducts());
      setAllCateProducts(products);
      setLoadAllProducts(false);
    }
  }, [dispatch, loadAllProducts, cateId, products]);

  const lastPageIndex = page * cateProductsPerPage;
  const firstPageIndex = lastPageIndex - cateProductsPerPage;
  const currentProd = Object.values(allCateProducts).slice(
    firstPageIndex,
    lastPageIndex
  );

  return (
    <div className="home_content product_content">
      <div className="text">Tous les produits</div>
      <main>
        <div className="dashboard__categories__container">
          <div className="dashboard__all__categories">
            {!isEmpty(currentProd[0]) &&
              currentProd.map((product) => {
                if (product.categorieId == cateId) {
                  return (
                    <>
                      <div className="dashboard__all__categories__content dashboard__product">
                        <Link
                          key={product.id}
                          to={`/admin/products/update-product/${product.id}`}
                        >
                          <img src={product.product_image} alt="product-pic" />
                          <div className="categories__text product__text">
                            <p className="product_p">{product.name}</p>
                          </div>
                        </Link>
                        <div className="categories__buttons product__buttons">
                          <Link
                            to={`/admin/products/update-product/${product.id}`}
                          >
                            <span className="update__category update__product">
                              Modifier
                            </span>
                            <span className="update__category update__product__mobile__update"></span>
                          </Link>
                          <DeleteProduct id={product.id} />
                        </div>
                      </div>
                    </>
                  );
                }
                return null;
              })}
            {isEmpty(currentProd[0]) && (
              <>
                <h1>Aucun produit disponible</h1>
              </>
            )}
          </div>
          <Pagination
            totalProducts={allCateProducts.length}
            productsPerPage={cateProductsPerPage}
            paginate={setPage}
            currentPage={page}
          />
        </div>
      </main>
    </div>
  );
};

export default CategoryProduct;
