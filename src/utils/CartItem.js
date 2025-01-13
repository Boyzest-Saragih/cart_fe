import React,{useState, useEffect} from "react";
import { GrSubtractCircle, GrAddCircle } from "react-icons/gr";

const CartItem = ({ item, onIncrement, onDecrement, isCheck }) => {
  const [priceAfterDisc, setPriceAfterDisc] = useState(item.price);
  
  useEffect(() => {
    if (item.discount !== 0.00) {
      const priceAfterDisc = item.price - (item.price * item.discount) / 100;
      setPriceAfterDisc(priceAfterDisc.toFixed());
    }
  })

  if (!item || !item.id) {
    console.error("Invalid item in CartItem", item);
  }

  const handleCheck = (e) => {
    const isChecked = e.target.checked ? 1 : 0;
    console.log(e.target.checked);
    isCheck(item, isChecked);
  };
  return (
    <div className="flex gap-4 items-start">
      <input
        type="checkbox"
        checked={item.is_checked === 1}
        onChange={(e) => handleCheck(e)}
        className="mt-14"
      />

      <div className="flex items-center h-36 w-full">
        <img
          className="w-[100px] h-[100px] rounded-2xl mr-4 object-cover"
          src={item.image}
          alt="product"
        />
        <div className="flex-1">
          <div className="flex justify-between mb-2">
            <h4 className="text-lg font-medium">{item.product_name}</h4>
            <div className="">
              {item.discount === null || item.discount === 0.00 || item.discount === 0 ? (
                <p className="font-semibold">Rp {item.price.toLocaleString()}</p>
              ) : (
                <>
                  <p className="font-semibold">Rp {parseInt(priceAfterDisc).toLocaleString()}</p>
                  <p className="text-sm pl-2 text-gray-400 line-through italic">Rp {item.price.toLocaleString()}</p>
                </>
              )}
            </div>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-sm text-gray-600">{item.category_name}</p>
            <p className="text-sm text-gray-600">
              {item.discount === null ? "" :+ item.discount * 100 + "%"}
            </p>
          </div>
          <div className="flex justify-between text-sm">
            <p className="font-sans text-gray-500 text-[12px]">{item.description}</p>
            <div className="flex gap-4 border p-1 rounded-xl items-center">
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