import React, {
    createContext,
    useContext,
    useState,
    type ReactNode
} from 'react';

interface OrderContextType {
    orderType: string;
    setOrderType: (val : string) => void;
}

const OrderContext = createContext < OrderContextType | undefined > (undefined);
export const useOrder = () => {
    const context = useContext(OrderContext);
    if (! context) {
        throw new Error('useOrder must be used within a OrderProvider');
    }
    return context;
};

interface OrderProviderProps {
    children: ReactNode;
}

export const OrderProvider: React.FC < OrderProviderProps > = ({children}) => {
    const [orderType, setOrderType] = useState < string > ("ONLINE_ORDER")

    const contextValue: OrderContextType = {
        orderType,
        setOrderType
    };
    return (<OrderContext.Provider value={contextValue}> {children} </OrderContext.Provider>);
};