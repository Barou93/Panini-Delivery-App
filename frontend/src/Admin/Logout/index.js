import React from "react";
import axios from "axios";
import cookie from "js-cookie";

const index = () => {
  const removeCookie = (key) => {
    if (window === "undefined") {
      cookie.remove(key, { expire: 1 });
    }
  };

  const logout = async () => {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/admin/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));
    localStorage.clear();
    window.location = "/login";
  };

  return (
    <>
      <span
        onClick={logout}
        className="sidebar__icon logout"
        id="log_out"
      ></span>
    </>
  );
};

export default index;
