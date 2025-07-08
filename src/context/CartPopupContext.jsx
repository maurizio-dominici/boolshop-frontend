// import { createContext, useContext, useState } from "react";

// const CartPopupContext = createContext();

// const cartPopupInitialData = {
//     cart: [],
//     show: false,
// };

// function CartPopupProvider ({ children }) {

//     const [ cartPopupData, setCartPopupData ] = useState(cartPopupInitialData);

//     const showCartPopup = (cart = []) => {
//         setCartPopupData({ cart, show: true });

//         // setTimeout(() => {
//         //     hideCartPopup(cartPopupInitialData);
//         // }, 5000);
//     };

//     const hideCartPopup = () => {
//         setCartPopupData(cartPopupInitialData);
//     };

//     const cartPopupHandler = {
//         data: cartPopupData,
//         showCartPopup,
//         hideCartPopup,
//     };

//     return (
//         <CartPopupContext.Provider value={cartPopupHandler}>
//             {children}
//         </CartPopupContext.Provider>
//     );
// };

// function useCartPopup () {
//     return useContext(CartPopupContext);
// };

// export { CartPopupProvider, useCartPopup };

// TEST PER REATTIVITÁ DEL CART SENZA CHIUDERE E RIAPRIRE

import { createContext, useContext, useState } from "react";

const CartPopupContext = createContext();

const cartPopupInitialData = {
  cart: [],
  show: false,
};

function CartPopupProvider({ children }) {
  const [cartPopupData, setCartPopupData] = useState(cartPopupInitialData);

  const showCartPopup = (newCart = []) => {
    setCartPopupData({
      cart: newCart,
      show: true,
    });
  };

  const updateCartPopup = (newCart) => {
    console.debug("updateCartPopup", newCart);
    setCartPopupData((prev) => ({
      ...prev,
      cart: newCart,
    }));
  };

  const hideCartPopup = () => {
    setCartPopupData(cartPopupInitialData);
  };

  const cartPopupHandler = {
    data: cartPopupData,
    setCartPopupData,
    showCartPopup,
    updateCartPopup,
    hideCartPopup,
  };

  return (
    <CartPopupContext.Provider value={cartPopupHandler}>
      {children}
    </CartPopupContext.Provider>
  );
}

function useCartPopup() {
  return useContext(CartPopupContext);
}

export { CartPopupProvider, useCartPopup };
