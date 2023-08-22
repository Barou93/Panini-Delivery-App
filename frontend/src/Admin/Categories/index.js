/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../actions/categories.action";
import { Link } from "react-router-dom";
import { isEmpty } from "../../Components/Utils";

import DeleteCategory from "../DeleteCategory";
import Pagination from "../../Components/Pagination";

const Categories = () => {
  const [loadCategories, setLoadCategories] = useState(true);
  const dispatch = useDispatch();
  const [allCategories, setAllCategories] = useState([]);
  const [currentCatePage, setCurrentCatePage] = useState(1);
  const [catePerPage] = useState(12);
  const categories = useSelector((state) => state.categoriesReducer);
  //console.log(categories);
  useEffect(() => {
    if (loadCategories) {
      //Load all categories of products
      dispatch(getCategories());
      setAllCategories(categories);
      setLoadCategories(false);
    }
  }, [loadCategories, dispatch, categories]);

  const lastIndex = currentCatePage * catePerPage;
  const firstIndex = lastIndex - catePerPage;
  const currentCategories = Object.values(allCategories).slice(
    firstIndex,
    lastIndex
  );
  return (
    <div className="home_content category-content">
      <div className="text">Tous les catégories de produits</div>
      <main>
        <div className="dashboard__categories__container">
          <div className="dashboard__all__categories">
            {!isEmpty(currentCategories[0]) &&
              currentCategories.map((category) => {
                return (
                  <>
                    <div
                      className="dashboard__all__categories__content"
                      key={category.id}
                    >
                      <Link to={`/admin/categories/${category.id}/products`}>
                        <img src={category.picture} alt="" />
                        <div className="categories__te">
                          <p>{category.name}</p>
                        </div>
                      </Link>
                      <div className="categories__buttons">
                        <Link
                          to={`/admin/category/${category.id}/update-category`}
                        >
                          <span className="update__category"></span>
                        </Link>
                        <DeleteCategory id={category.id} />
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
        <Pagination
          totalProducts={allCategories.length}
          productsPerPage={catePerPage}
          paginate={setCurrentCatePage}
          currentPage={currentCatePage}
        />
      </main>
    </div>
  );
};

export default Categories;
