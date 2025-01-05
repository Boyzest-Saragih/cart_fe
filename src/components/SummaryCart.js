import React, { useEffect, useState } from "react";
import useCartApi from "../hooks/useCartApi";

const SummaryCart = () => {
  const { data, isLoading, getCartItem } = useCartApi();
  const [quantity, setQuantity] = useState(0);
  const [priceTotal, setPriceTotal] = useState(0);

  useEffect(() => {
    getCartItem();
  }, []);

  useEffect(() => {
    if (data && data.result) {
      let totalQuantity = 0;
      let totalPrice = 0;
      data.result.forEach((item) => {
        if (item.is_checked) {
          totalQuantity += item.quantity;
          let price = parseFloat(item.price);
          totalPrice += price;
        }
      });
      setPriceTotal(totalPrice);
      setQuantity(totalQuantity);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No data</div>;
  }
  console.log(data);
  return (
    <div className="card bg-base-100 w-96 h-56 mt-24 p-4 shadow-xl ml-24 rounded-2xl">
      <div className="card-body flex flex-col justify-between h-full">
        <div>
          <h2 className="card-title font-bold text-2xl">Ringkasan Belanja</h2>
          <div className="flex justify-between mt-4">
            <p>Total</p>
            <p>Rp {priceTotal}</p>
          </div>
        </div>
        <button className="btn bg-green-600 p-1 rounded-xl mb-0 text-xl text-white">
          {`beli (${quantity})`}
        </button>
      </div>
    </div>
  );
};

export default SummaryCart;
