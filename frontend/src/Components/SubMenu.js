import React, { useState } from "react";
import { Link } from "react-router-dom";

const SubMenu = ({ item }) => {
  const [subnav, setSubNav] = useState(false);
  const showSubNav = () => setSubNav(!subnav);
  return (
    <>
      {" "}
      <span
        onClick={showSubNav}
        className={subnav ? "downicon rotate open" : "downicon rotate"}
      ></span>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <ul key={index} className={subnav ? "submenu open" : "submenu"}>
              <li className={item.class}>
                <Link to={item.path}>
                  <p>{item.title}</p>
                </Link>
              </li>
            </ul>
          );
        })}
    </>
  );
};

export default SubMenu;
