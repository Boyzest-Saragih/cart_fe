import { useState } from "react";
import Apifetch from "../utils/Apifetch";

const useCartApi = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCartItem = async () => {
    setIsLoading(true);
    try {
      const result = await Apifetch("GET", "/cart");
      setData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItem = async (item, action) => {
    try {
      const response = await Apifetch("PUT", `/cart/${item.id}`, {
        quantity:
          action === "increment" ? item.quantity + 1 : item.quantity - 1,
      });
    } catch (error) {
      console.log(error);
    }
    getCartItem();
  };

  return {
    data,
    isLoading,
    getCartItem,
    updateCartItem,
  };
};

export default useCartApi;
