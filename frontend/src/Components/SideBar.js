import React, { useContext, useState } from "react";
import Logo from "../styles/assets/img/Panini_logo.png";
import { SidebarData } from "./SidebarData";
import { Link } from "react-router-dom";
import SubMenu from "./SubMenu";
import { useSelector } from "react-redux";
import Logout from "../Admin/Logout";
import { Outlet } from "react-router-dom";

const SideBar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const adminData = useSelector((state) => state.adminReducer);
  return (
    <div>
      <>
        <div
          className={
            sidebar === false ? "sidebar" : " sidebar active-dashboard"
          }
        >
          <div className="logo_content">
            <div className="sidebar__logo">
              <img src={Logo} alt="Logo Panini" />
            </div>
            <i
              onClick={showSidebar}
              className="sidebar__icon menu"
              id="btn"
            ></i>
          </div>
          <ul className="nav_list">
            <li className="search-list">
              <i className="sidebar__icon search"></i>
              <input type="text" placeholder="Rechercher..." />
              <p className="tooltip">Rechercher</p>
            </li>
            {SidebarData.map((item, index) => {
              if (item.subNav) {
                return (
                  <li key={index}>
                    <Link to={item.path || "#"}>
                      <i className={item.class}></i>
                      <p className="links_name">{item.title}</p>
                    </Link>
                    <SubMenu item={item} index={index} />
                  </li>
                );
              } else {
                return (
                  <li key={index}>
                    <Link to={item.path}>
                      <i className={item.class}></i>
                      <span className="links_name">{item.title}</span>
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
          <div className="content">
            <div className="user">
              <div className="user_details">
                <img src={adminData.picture} alt="admin profil" />
                <div className="name_job">
                  <div className="name">
                    {adminData.name} {adminData.lastname}
                  </div>
                  <div className="job">Administrateur</div>
                </div>
              </div>
              <Logout />
            </div>
          </div>
        </div>
        <Outlet />
      </>
    </div>
  );
};

export default SideBar;
