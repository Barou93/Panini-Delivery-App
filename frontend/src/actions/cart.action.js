/** @format */

import axios from "axios";
import Cookies from "js-cookie";

export const ADD_TO_CART = "ADD_TO_CART";
export const SET_CART = "SET_CART";

export const setCart = () => {
  return async (dispatch) => {
    try {
      //const cartId = Cookies.get("cart") || null;
      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}cartId/`,
        withCredentials: true,
      });
      if (response.status === 200) {
        // Mettre à jour la valeur du cookie "cart" avec l'ID du panier
        Cookies.set("cart", response.data);
        dispatch({ type: SET_CART, payload: response.data });
      } else {
        console.error(
          "Erreur lors de la récupération de l'ID du panier:",
          response.data
        );
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'ID du panier:", error);
    }
  };
};

// export const addToCart = (productId, quantity) => {
//   return async (dispatch, getState) => {
//     try {
//       const state = getState();
//       console.log(state);
//       const cartId = state.cart.cartId;
//       console.log(cartId);
//       //If cartId isn't exist create a new cart
//       if (!cartId) {
//         const response = await axios({
//           method: "post",
//           url: `${process.env.REACT_APP_API_URL}api/cart/`,
//           withCredentials: true,
//           data: { productId, quantity },
//         });
//         if (response.status === 201) {
//           const newCartId = response.data.cartId;
//           Cookies.set("cart", newCartId);
//           dispatch({ type: ADD_TO_CART, payload: response.data });
//         } else {
//           console.error("Erreur lors de l'ajout au panier:", response.data);
//         }
//       } else {
//         //If cartId is valid add new add item in the cart
//         const response = await axios({
//           method: "post",
//           url: `${process.env.REACT_APP_API_URL}api/cart/`,
//           withCredentials: true,
//           data: { cartId, productId, quantity },
//         });

//         if (response.status === 201) {
//           dispatch({ type: ADD_TO_CART, payload: response.data });
//         } else {
//           console.error("Erreur lors de l'ajout au panier:", response.data);
//         }
//       }
//     } catch (error) {
//       console.error("Erreur lors de l'ajout au panier:", error);
//     }
//   };
// };
export const addToCart = (productId, quantity) => {
  return async (dispatch) => {
    try {
      const cartId = Cookies.get("cart") || null;
      console.log("Cart ID:", cartId);

      if (!cartId) {
        const addToCartResponse = await axios.post(
          `${process.env.REACT_APP_API_URL}api/cart/`,
          { productId, quantity },
          { withCredentials: true }
        );
        if (addToCartResponse.status === 201) {
          // Si la réponse est 201 (Créé), vous avez maintenant l'identifiant du panier
          const newCartId = addToCartResponse.data.cartId;
          Cookies.set("cart", newCartId);
          dispatch({ type: ADD_TO_CART, payload: addToCartResponse.data });
        } else {
          console.error(
            "Erreur lors de l'ajout au panier:",
            addToCartResponse.data
          );
        }
      } else {
        const response = await axios({
          method: "post",
          url: `${process.env.REACT_APP_API_URL}api/cart/`,
          withCredentials: true,
          data: { cartId, productId, quantity },
        });

        if (response.status === 201) {
          dispatch({ type: ADD_TO_CART, payload: response.data });
        } else {
          console.error("Erreur lors de l'ajout au panier:", response.data);
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
    }
  };
};
