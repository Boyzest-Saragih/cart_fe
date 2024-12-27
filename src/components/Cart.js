import { useEffect } from "react";
import EachUtils from "../utils/EachUtils";
import useCartApi from "../hooks/useCartApi";
import CartStore from "../utils/CartStore";


const Cart = () => {
  const {data, isLoading, getCartItem, updateCartItem} = useCartApi()

  useEffect(() => {
    getCartItem()
  },[]);

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


  return (
    <div className="p-4">
      <div className="flex gap-4 mb-8">
        <input type="checkbox"></input>
        <p>Pilih Semua</p>
      </div>
      <EachUtils
        of={Object.keys(groupedItemsStore)}
        render={(storeName, index) => {
          const storeItems = groupedItemsStore[storeName];
          return (
            <CartStore
              key={index}
              storeName={storeName}
              items={storeItems}
              onIncrement={(item)=>updateCartItem(item, "increment")}
              onDecrement={(item)=>updateCartItem(item, "decrement")}
            />
          );
        }}
      />
    </div>
  );
};

export default Cart;
