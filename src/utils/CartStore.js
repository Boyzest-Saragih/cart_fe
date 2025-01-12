import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { useCartContext } from "../context/CartContext";
import { FaTrashAlt } from "react-icons/fa";

const CartStore = ({
  storeName,
  items,
  onIncrement,
  onDecrement,
  isCheck,
  handleStoreSelect,
  isStoreChecked,
  onDeleteItem,
  onDeleteStore,
}) => {
  const { data, getCartItem } = useCartContext();

  useEffect(() => {
    if (!data) {
      getCartItem();
    }
  }, [data, getCartItem]);
  return (
    <>
      <div className="flex justify-center mb-6 p-4 border rounded-lg shadow-sm w-full">
        <div className="w-[800px] mb-4">
          <div className="flex items-center justify-between text-2xl font-semibold mb-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isStoreChecked}
                onChange={() => handleStoreSelect(storeName)}
              />
              <div className="flex items-center gap-1">
                <img
                  className="w-[35px] h-[35px] rounded-2xl"
                  src={items.map((item) => item.avatar)}
                />
                <h1>{storeName}</h1>
              </div>
            </div>
            <button
              onClick={() => onDeleteStore(storeName)}
              className="text-gray-500"
            >
              <FaTrashAlt size={18} />
            </button>
          </div>
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 mb-2">
              <div className="flex-grow">
                <CartItem
                  key={idx}
                  item={item}
                  onDecrement={onDecrement}
                  onIncrement={onIncrement}
                  isCheck={isCheck}
                />
              </div>
              <button
                onClick={() => onDeleteItem(item.id)}
                className="text-gray-500"
              >
                <FaTrashAlt size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CartStore;
