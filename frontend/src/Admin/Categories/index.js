import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../actions/categories.action";
import { Link } from "react-router-dom";
import { isEmpty } from "../../Components/Utils";

import DeleteCategory from "../DeleteCategory";

const Categories = () => {
  const [loadCategories, setLoadCategories] = useState(true);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoriesReducer);
  //console.log(categories);
  useEffect(() => {
    if (loadCategories) {
      //Load all categories of products
      dispatch(getCategories());
      setLoadCategories(false);
    }
  }, [loadCategories, dispatch]);
  return (
    <div className="home_content category-content">
      <div className="text">Tous les catégories de produits</div>
      <main>
        <div className="dashboard__categories__container">
          <div className="dashboard__all__categories">
            {!isEmpty(categories[0]) &&
              categories.map((category) => {
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
          <div className="categories__paginate">
            <span className="categories-pag-active">1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Categories;
