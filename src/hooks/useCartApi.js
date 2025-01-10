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
    const newQuantity =
      action === "increment" ? item.quantity + 1 : item.quantity - 1;
  
    setData((prevData) => {
      const updatedItems = prevData.result.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
      );
      return { ...prevData, result: updatedItems };
    });
  
    try {
      await Apifetch("PUT", `/cart/quantity/${item.id}`, { quantity: newQuantity });
    } catch (error) {
      console.log("Error updating quantity:", error);
    }
  };
  

  const updateIsChecked = async (item, isCheck) => {
    setData((prevData) => {
      const updatedItems = prevData.result.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, is_checked: isCheck } : cartItem
      );
      return { ...prevData, result: updatedItems };
    });
  
    try {
      await Apifetch("PUT", `/cart/checked/${item.id}`, { is_checked: isCheck });
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
