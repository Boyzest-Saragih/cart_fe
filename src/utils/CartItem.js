import React from "react";
import { GrSubtractCircle, GrAddCircle } from "react-icons/gr";

const CartItem = ({ item, onIncrement, onDecrement }) => {
  return (
    <div className="flex gap-4 items-start">
      <input type="checkbox" value={1} className="mt-14"></input>
      <div className="flex items-center h-36 w-full">
        <img
          className="w-[100px] h-[100px] rounded-2xl mr-4 object-cover"
          src={item.image}
          alt="product"
        />
        <div className="flex-1">
          <div className="flex justify-between mb-2">
            <h4 className="text-lg font-medium">{item.product_name}</h4>
            <p className="font-semibold">Rp {item.price}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-sm text-gray-600">{item.category_name}</p>
            <p className="text-sm text-gray-600">
              {item.discount === null ? "" : "% " + item.discount}
            </p>
          </div>
          <div className="flex justify-between text-sm">
            <p>Note: {item.note}</p>
            <div className="flex gap-4 border p-1 rounded-xl">
              <button
                onClick={() => {
                  onDecrement(item);
                }}
              >
                <GrSubtractCircle size={20} />
              </button>
              <h2 className="">{item.quantity}</h2>
              <button onClick={() => onIncrement(item)}>
                <GrAddCircle size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
