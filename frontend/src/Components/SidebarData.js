/** @format */

import React from "react";

export const SidebarData = [
  {
    title: "Accueil",
    path: "/admin/summary",
    class: "sidebar__icon home",
  },

  {
    title: "Categories",
    path: "#",
    class: "sidebar__icon categories",

    subNav: [
      {
        title: "Ajouter catégorie",
        path: "/admin/add-category",
        class: "sublist",
      },
      {
        title: "Toutes les catégories",
        path: "/admin/categories",
        class: "sublist",
      },
    ],
  },
  {
    title: "Produits",
    path: "#",
    class: "sidebar__icon products",

    subNav: [
      {
        title: "Ajouter un produit",
        path: "/admin/add-product",
        class: "sublist",
      },
      {
        title: "Tous les produits",
        path: "/admin/products",
        class: "sublist",
      },
    ],
  },
  {
    title: "Commandes",
    path: "/admin/orders",
    class: "sidebar__icon dash__orders",
  },
  {
    title: "Paramètres",
    path: "/admin/settings/:id",
    class: "sidebar__icon settings",
  },
];
