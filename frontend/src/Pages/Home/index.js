/** @format */

import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Pagination from "../../Components/Pagination";
import OrderWhite from "../../styles/assets/icons/order-white.svg";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "../../Components/Utils";
import { getProducts } from "../../actions/products.action";
import Search from "../../Components/Search";

const Home = () => {
  const categories = useSelector((state) => state.categoriesReducer);
  const dispatch = useDispatch();

  const products = useSelector((state) => state.productsReducer);

  const [selectedCategory, setSelectedCateogry] = useState(null);

  const [loadProducts, setLoadProducts] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    //Get all products in database
    if (loadProducts) {
      dispatch(getProducts());
      setAllProducts(products);
      setLoadProducts(false);
    }
  }, [dispatch, products, loadProducts]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      const productsByCategory = selectedCategory
        ? products.filter(
            (product) => product.categorieId === selectedCategory.id
          )
        : products;
      setDisplayedProducts(productsByCategory);
    } else {
      //Filter products based on searchQuery
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDisplayedProducts(filteredProducts);
    }
  }, [products, searchQuery, selectedCategory]);

  const lastPageIndex = currentPage * productsPerPage;
  const fristPageIndex = lastPageIndex - productsPerPage;
  // const currentProducts = Object.values(allProducts).slice(
  //   fristPageIndex,
  //   lastPageIndex
  // );
  //console.log(currentProducts);
  return (
    <div>
      <Header />
      <div className="header__infos">
        <h1 className="header__insight">
          Que voulez-vous manger
          <strong className="header__insight__strong"> aujourd’hui ?</strong>
        </h1>
      </div>
      <Search onSearch={setSearchQuery} />
      <main className="main">
        <section>
          <h2 className="title">Rechercher par catégorie</h2>
          <div className="categorie">
            <button
              className={
                selectedCategory === null
                  ? "categorie__link active-link__default"
                  : "categorie__link"
              }
              onClick={() => setSelectedCateogry(null)}
            >
              Tout
            </button>
            {!isEmpty(categories[0]) &&
              categories.map((category, index) => {
                return (
                  <button
                    key={index}
                    className={
                      selectedCategory === category
                        ? "categorie__link active-link"
                        : "categorie__link"
                    }
                    onClick={() => setSelectedCateogry(category)}
                  >
                    <img
                      src={category.picture}
                      alt="categories-icons"
                      className="categorie__img"
                    />
                    {category.name}
                  </button>
                );
              })}
          </div>
          <div className="store">
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product, index) => (
                <article key={index} className="store__product">
                  <Link to={`/product/${product.id}`}>
                    <figure className="store__product__img__header">
                      <img
                        src={product.product_image}
                        alt={`le produit ${product.name}`}
                        className="store__product__img"
                      />
                    </figure>
                    <header className="store__product__contain">
                      <hgroup className="store__product__infos">
                        <h3>{product.name} </h3>
                        <h4 className="price">{product.price} F CFA</h4>
                      </hgroup>
                      <button className="addtocart">
                        <img src={OrderWhite} alt="ajouter au panier" />
                      </button>
                    </header>
                  </Link>
                </article>
              ))
            ) : (
              <p>Aucun produit n'est disponible pour cette recherche.</p>
            )}
          </div>
          <Pagination
            totalProducts={allProducts.length}
            productsPerPage={productsPerPage}
            paginate={setCurrentPage}
            currentPage={currentPage}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
