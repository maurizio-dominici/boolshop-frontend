import { createContext, useContext, useState } from "react";



const CartPopupContext = createContext();



const cartPopupInitialData = {
    cart: [],
    show: false,
};





function CartPopupProvider ({ children }) {

    const [ cartPopupData, setCartPopupData ] = useState(cartPopupInitialData);
    

    const showCartPopup = (cart = []) => {
        setCartPopupData({ cart, show: true });

        // setTimeout(() => {
        //     hideCartPopup(cartPopupInitialData);
        // }, 5000);
    };
    
    const hideCartPopup = () => {
        setCartPopupData(cartPopupInitialData);
    };

    const cartPopupHandler = {
        data: cartPopupData,
        showCartPopup,
        hideCartPopup,
    };
    


    return (
        <CartPopupContext.Provider value={cartPopupHandler}>
            {children}
        </CartPopupContext.Provider>
    );
};



function useCartPopup () {
    return useContext(CartPopupContext);
};



export { CartPopupProvider, useCartPopup };