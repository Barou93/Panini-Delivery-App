module.exports.pagination = (data) => {
  const totalPages = Math.ceil(data.count / data.limit);
  const limit = data.limit;
  const totalRecords = data.count;
  const currentPage = data.page;
  const previousPage = currentPage === 1 ? null : currentPage - 1;
  const nextPage = currentPage === totalPages ? null : currentPage + 1;

  const result = {
    data: data.data,
    totalPages,
    totalRecords,
    currentPage,
    previousPage,
    nextPage,
  };
  return result;
};
