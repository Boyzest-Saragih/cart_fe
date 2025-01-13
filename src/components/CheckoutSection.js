import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";

const SummaryCart = () => {
  const { data, isLoading, getCartItem, deleteCartAfterCheckout } =
    useCartContext();
  const [quantity, setQuantity] = useState(0);
  const [priceTotal, setPriceTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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
          totalPrice += item.quantity * parseFloat(item.price);
        }
      });
      setPriceTotal(totalPrice);
      setQuantity(totalQuantity);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;

  const handlePayment = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    deleteCartAfterCheckout();
    navigate("/");
  };

  return (
    <div className="card bg-base-100 w-[900px] h-80 mt-24 p-8 shadow-xl ml-[30px] rounded-2xl">
      <div className="card-body flex flex-col justify-between h-full">
        <div>
          <h2 className="card-title font-bold text-2xl">Metode Pembayaran</h2>
          <div className="flex justify-between mt-4">
            <p>Total Harga</p>
            <p>Rp {priceTotal.toLocaleString()}</p>
          </div>
          <div className="flex justify-between mt-1">
            <p>Total Ongkos Kirim</p>
            <p>Rp {(priceTotal * 0.05).toLocaleString()}</p>
          </div>
          <div className="flex justify-between mt-1">
            <p>Biaya Lain-Lain</p>
            <p>Rp {(priceTotal * 0.02).toLocaleString()}</p>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <p>Total Tagihan</p>
          <p>
            Rp {(priceTotal + priceTotal * 0.05 + priceTotal * 0.02).toLocaleString()}
          </p>
        </div>
        <button
          className="btn bg-green-600 p-1 rounded-xl mb-0 text-xl text-white"
          onClick={handlePayment}
        >
          Bayar Sekarang
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <button
            onClick={closeModal}
            className="text-red-600 text-2xl absolute mb-32 ml-72"
          >
            X
          </button>
          <div className="bg-white p-4 rounded-lg w-72">
            <p className="text-xl h-8 text-center text-green-600">
              Pembayaran Berhasil!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryCart;
