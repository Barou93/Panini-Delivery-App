import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/products.action";
import { isEmpty } from "../../Components/Utils";
import { Link } from "react-router-dom";
import Pagination from "../../Components/Pagination";
import DeleteProduct from "../DeleteProduct";

const Products = () => {
  const [loadProducts, setLoadProducts] = useState(true);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsReducer);
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  useEffect(() => {
    //Get all products in database
    if (loadProducts) {
      dispatch(getProducts());
      setAllProducts(products);
      setLoadProducts(false);
    }
  }, [dispatch, products, loadProducts]);

  // Get current posts
  console.log(allProducts);

  const paginate = (page) => {
    setCurrentPage(page);
  };

  const lastPageIndex = currentPage * productsPerPage;
  const firstPageIndex = lastPageIndex - productsPerPage;
  const currentProducts = Object.values(allProducts).slice(
    firstPageIndex,
    lastPageIndex
  );
  console.log(currentProducts);

  return (
    <div className="home_content product_content">
      <div className="text">Tous les produits</div>
      <main>
        <div className="dashboard__categories__container">
          <div className="dashboard__all__categories">
            {!isEmpty(currentProducts[0]) &&
              currentProducts.map((product) => {
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
              })}
          </div>
          <Pagination
            totalProducts={allProducts.length}
            productsPerPage={productsPerPage}
            paginate={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </main>
    </div>
  );
};

export default Products;
