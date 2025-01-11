import { useEffect, useState } from "react";
import EachUtils from "../utils/EachUtils";
import CartStore from "../utils/CartStore";
import { useCartContext } from "../context/CartContext";

const Cart = () => {
  const { data, isLoading, getCartItem, updateCartItem, updateIsChecked, deleteCartItem, deleteStoreItems } =
    useCartContext();

  const [selectAll, setSelectAll] = useState(false); 
  const [selectStore, setSelectStore] = useState({});

  useEffect(() => {
    if (data?.result) {
      const allChecked = data.result.every((item) => item.is_checked === 1);
      setSelectAll(allChecked);
    }
  }, [data]);

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

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    data.result.forEach((item) => {
      updateIsChecked(item, newSelectAll ? 1 : 0);
    });
  };

  const handleStoreSelect = (storeName) => {
    const newSelectStore = { ...selectStore };
    newSelectStore[storeName] = !newSelectStore[storeName];
    setSelectStore(newSelectStore);

    const storeItems = groupedItemsStore[storeName];
    storeItems.forEach((item) => {
      updateIsChecked(item, newSelectStore[storeName] ? 1 : 0);
    });
  };

  const handleDeleteItem = (itemId) => {
    deleteCartItem(itemId);
  };

  const handleDeleteStore = (storeName) => {
    deleteStoreItems(storeName);
  };

  
  return (
    <div className="p-4">
      <div className="flex gap-4 mb-8">
        <input
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
        />
        <p>Pilih Semua</p>
      </div>
      
      <EachUtils
        of={Object.keys(groupedItemsStore)}
        render={(storeName, index) => {
          const storeItems = groupedItemsStore[storeName];
          const isStoreChecked = storeItems.every((item) => item.is_checked === 1);

          return (
            <div key={index}>
              <CartStore
                storeName={storeName}
                items={storeItems}
                onIncrement={(item) => updateCartItem(item, "increment")}
                onDecrement={(item) => updateCartItem(item, "decrement")}
                isCheck={(item, isChecked) => updateIsChecked(item, isChecked)}
                handleStoreSelect={() => handleStoreSelect(storeName)}
                isStoreChecked={isStoreChecked}
                onDeleteItem={handleDeleteItem}
                onDeleteStore={handleDeleteStore}
              />
            </div>
          );
        }}
      />
    </div>
  );
};

export default Cart;
