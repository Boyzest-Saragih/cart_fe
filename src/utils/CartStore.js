import React, { useEffect } from "react";
import CartItem from "./CartItem";
import useCartApi from "../hooks/useCartApi";

const CartStore = ({ storeName, items, onIncrement, onDecrement, isCheck }) => {
  const { data, getCartItem } = useCartApi();

  useEffect(() => {
    if (!data) {
      getCartItem();
    }
  }, [data, getCartItem]);

  return (
    <>
      <div className="flex justify-center mb-6 p-4 border rounded-lg shadow-sm w-full">
        <div className="w-[700px] mb-4">
          <div className="flex gap-4 text-2xl font-semibold mb-4">
            <input type="checkbox" value={1}></input>
            <h1 className="">{storeName}</h1>
          </div>
          {items.map((item, idx) => (
            <CartItem
              key={idx}
              item={item}
              onDecrement={onDecrement}
              onIncrement={onIncrement}
              isCheck={isCheck}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CartStore;
