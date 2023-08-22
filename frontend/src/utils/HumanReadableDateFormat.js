export const dateFormatter = (num) => {
  let dateOptions = {
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  let timestamp = Date.parse(num);
  const date = new Date(timestamp).toLocaleDateString("fr-FR", dateOptions);
  return date.toString();
};
