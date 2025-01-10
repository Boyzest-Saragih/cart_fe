import React, { useEffect } from "react";
import { useCartContext } from "../../context/CartContext";
import CheckoutSection from "../../components/CheckoutSection";

const Order = () => {
  const { data, isLoading, getCartItem } = useCartContext();

  useEffect(() => {
    getCartItem();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  const groupedItemsStore = data.result.reduce((acc, item) => {
    if (!acc[item.name]) {
      acc[item.name] = [];
    }
    acc[item.name].push(item);
    return acc;
  }, {});

  console.log(data.result);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 pl-20 pt-8">Checkout</h1>
      <div className="flex px-48">
        <div className="container mx-auto p-4">
          {Object.entries(groupedItemsStore).map(
            ([storeName, items], index) => (
              <div
                key={storeName}
                className="mb-6 border border-gray-300 rounded-lg p-4"
              >
                <h2 className="text-1xl font-semibold mb-1 text-gray-600">
                  PESANAN {index + 1}
                </h2>
                <h2 className="text-1xl font-semibold mb-4">{storeName}</h2>
                <ul>
                  {items.map((item) => (
                    <li key={item.id} className="mb-4">
                      <div className="">
                        <div className="flex justify-between">
                          <div className="flex gap-8">
                            <img
                              className="w-[100px] h-[100px] rounded-2xl mr-4 object-cover border-l-black"
                              src={item.image}
                            />
                            <div className="">
                              <p className="text-lg text-black font-semibold">
                                {item.product_name}
                              </p>
                              <p className="text-gray-600">{item.note}</p>
                            </div>
                          </div>
                          <div>
                            <strong className="text-lg"></strong>{" "}
                            {item.quantity} x {item.price}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
        <CheckoutSection />
      </div>
    </>
  );
};

export default Order;
