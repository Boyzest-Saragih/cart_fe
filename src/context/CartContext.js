import React, { createContext, useContext } from "react";
import useCartApi from "../hooks/useCartApi";


const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const cartApi = useCartApi();

  return (
    <CartContext.Provider value={cartApi}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
