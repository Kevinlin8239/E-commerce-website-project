import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext();

export const StateContext = ({ children }) => {
  // add data for the state
  const [qty, setQty] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // increase product quantity
  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  // decrease product quantity
  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };
  // add product to cart
  const onAdd = (product, quantity) => {
    // total price
    setTotalPrice((prevTotal) => prevTotal + product.Price * quantity);
    // increase total quantity
    setTotalQuantities((prevTotal) => prevTotal + quantity);
    // check wether the product is inside the cart
    const exist = cartItems.find((item) => item.Slug === product.Slug);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.Slug === product.Slug
            ? { ...exist, quantity: exist.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
  };

  //  remove item from cart
  const onRemove = (product) => {
    // total price
    setTotalPrice((prevTotal) => prevTotal - product.Price);

    // decrease total quantity
    setTotalQuantities((prevTotal) => prevTotal - 1);
    // check if the item is inside the cart
    const exist = cartItems.find((item) => item.Slug === product.Slug);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.Slug !== product.Slug));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.Slug === product.Slug
            ? { ...exist, quantity: exist.quantity - 1 }
            : item
        )
      );
    }
  };
  return (
    <ShopContext.Provider
      value={{
        qty,
        increaseQty,
        decreaseQty,
        showCart,
        setShowCart,
        cartItems,
        onAdd,
        onRemove,
        totalQuantities,
        totalPrice,
        setQty,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useStateContext = () => useContext(ShopContext);
