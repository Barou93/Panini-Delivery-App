import React from "react";

const Pagination = ({
  productsPerPage,
  totalProducts,
  currentPage,
  paginate,
}) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="categories__paginate">
      <ul>
        {pages.map((page, index) => {
          return (
            <>
              <span
                key={index}
                onClick={() => paginate(page)}
                className={page === currentPage ? "categories-pag-active" : ""}
              >
                {page}
              </span>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
