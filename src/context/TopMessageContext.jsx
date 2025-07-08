import { createContext, useContext, useState } from "react";



const TopMessageContext = createContext();



const topMessageInitialData = {
    type: "",
    text: "",
    show: false,
};





function TopMessageProvider ({ children }) {

    const [ topMessageData, setTopMessageData ] = useState(topMessageInitialData);
    

    const showTopMessage = (text, type = "info", autoClose = true) => {
        if (!text) return;
        setTopMessageData({ text, type, show: true});

        if (autoClose) {
            setTimeout(() => {
                hideTopMessage();
            }, 3000);
            // setTimeout(() => {
            //     hideTopMessage(topMessageInitialData);
            // }, 5000);
        }
    };
    
    const hideTopMessage = () => {
        setTopMessageData(topMessageInitialData);
    };

    const topMessageHandler = {
        data: topMessageData,
        showTopMessage,
        hideTopMessage,
    };
    


    return (
        <TopMessageContext.Provider value={topMessageHandler}>
            {children}
        </TopMessageContext.Provider>
    );
};



function useTopMessage () {
    return useContext(TopMessageContext);
};



export { TopMessageProvider, useTopMessage };