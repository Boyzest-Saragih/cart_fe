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
      await Apifetch("PUT", `/cart/quantity/${item.id}`, {
        quantity:
          action === "increment" ? item.quantity + 1 : item.quantity - 1,
      });
      await getCartItem();
    } catch (error) {
      console.log(error);
    }
  };

  const updateIsChecked = async (item, isCheck) => {
    try {
      await Apifetch("PUT", `/cart/checked/${item.id}`, {
        is_checked: isCheck,
      });
      await getCartItem();
    } catch (error) {
      console.log("Error updating is_checked:", error);
    }
  };
  

  return {
    data,
    isLoading,
    getCartItem,
    updateCartItem,
    updateIsChecked,
  };
};

export default useCartApi;
