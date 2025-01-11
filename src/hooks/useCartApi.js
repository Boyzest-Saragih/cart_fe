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
  
    if (newQuantity < 1) {
      const confirmDelete = window.confirm(
        "Jumlah product akan menjadi 0. Apakah Anda ingin menghapus produk ini dari cart?"
      );
  
      if (confirmDelete) {
        await deleteCartItem(item.id);
        return;
      } else {
        setData((prevData) => {
          const updatedItems = prevData.result.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem, quantity: 1 } : cartItem
          );
          return { ...prevData, result: updatedItems };
        });
  
        try {
          await Apifetch("PUT", `/cart/quantity/${item.id}`, { quantity: 1 });
        } catch (error) {
          console.log("Error updating quantity:", error);
        }
        return;
      }
    }
  
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
  
  const deleteCartItem = async (itemId) => {
    try {
      await Apifetch("DELETE", `/cart/item/${itemId}`);
      setData((prevData) => {
        const updatedItems = prevData.result.filter((item) => item.id !== itemId);
        return { ...prevData, result: updatedItems };
      });
    } catch (error) {
      console.log("Error deleting item:", error);
    }
  };
  
  const deleteStoreItems = async (storeName) => {
    try {
      await Apifetch("DELETE", `/cart/store/${storeName}`);
      setData((prevData) => {
        const updatedItems = prevData.result.filter((item) => item.store_name !== storeName);
        return { ...prevData, result: updatedItems };
      });
      getCartItem();
    } catch (error) {
      console.log("Error deleting store items:", error);
    }
  };
  
  

  return {
    data,
    isLoading,
    getCartItem,
    updateCartItem,
    updateIsChecked,
    deleteCartItem,
    deleteStoreItems,
  };
};

export default useCartApi;
