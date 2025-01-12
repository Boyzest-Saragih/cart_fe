import React, { useEffect, useMemo } from "react";
import { useCartContext } from "../../context/CartContext";
import CheckoutSection from "../../components/CheckoutSection";

const Order = () => {
  const { data, isLoading, getCartItem, updateNote } = useCartContext();

  useEffect(() => {
    getCartItem();
  }, []);

  const filteredItems = useMemo(() => {
    return data?.result?.filter((item) => item.is_checked === 1) || [];
  }, [data?.result]);

  const groupedItemsStore = useMemo(() => {
    return filteredItems.reduce((acc, item) => {
      if (!acc[item.name]) {
        acc[item.name] = [];
      }
      acc[item.name].push(item);
      return acc;
    }, {});
  }, [filteredItems]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || !data.result || data.result.length === 0) {
    return <div>No data</div>;
  }

  const handleNoteChange = (e, itemId) => {
    const updatedNote = e.target.value;
    updateNote(itemId, updatedNote);
  };
  

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 pl-20 pt-8">Checkout</h1>
      <div className="flex px-48">
        <div className="container mx-auto p-4">
          {Object.entries(groupedItemsStore).map(
            ([storeName, items], index) => (
              <div
                key={storeName}
                className="w-[800px] mb-6 border border-gray-300 rounded-lg p-4"
              >
                <h2 className="text-1xl font-semibold mb-1 text-gray-600">
                  PESANAN {index + 1}
                </h2>
                <h2 className="text-1xl font-semibold mb-4">{storeName}</h2>
                <ul>
                  {items.map((item) => (
                    <li key={item.id} className="mb-4">
                      <div>
                        <div className="flex justify-between">
                          <div className="flex gap-8">
                            <img
                              className="w-[100px] h-[100px] rounded-2xl mr-4 object-cover border-l-black"
                              src={item.image}
                              alt={item.product_name}
                            />
                            <div>
                              <p className="text-lg text-black font-semibold">
                                {item.product_name}
                              </p>
                              <form className="">
                                <input
                                  className=" border border-gray-200 rounded-lg p-2 w-96 mt-2"
                                  type="text"
                                  id="note"
                                  placeholder={item.note}
                                  value={item.note || ""}
                                  onChange={(e) => handleNoteChange(e, item.id)}
                                />
                              </form>
                            </div>
                          </div>
                          <div>
                            <p>
                              {item.quantity} x Rp {item.price.toLocaleString()}
                            </p>
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
