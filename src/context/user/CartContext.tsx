import React, {
    createContext,
    useContext,
    useState,
    type ReactNode
} from 'react';
import { useData } from '../DataContext';

interface CartContextType {
    cartFoodItems: Map<string,
        number>,
    setCartFoodItems: (map: Map<string, number>) => void;
    addItemToCart: (id: string) => void;
    removeItemFromCart: (id: string) => void;
    showActionButtons: boolean;
    setShowActionButtons: (val: boolean) => void;
    showCartPage: boolean;
    setShowCartPage: (val: boolean) => void;
    cartQuantityOfItem: (id: string) => number;
    cartSlideOut: boolean;
    clearCart: () => void;
    subTotal: number,
    isCartEmpty: () => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined);
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCard must be used within a CardProvider');
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const { foodItemsMap } = useData();
    const [showActionButtons, setShowActionButtons] = useState<boolean>(false)
    const [cartFoodItems, setCartFoodItems] = useState<Map<string, number>>(new Map());
    const [cartSlideOut, setCartSlideOut] = useState<boolean>(false)
    const [showCartPage, setShowCartPage] = useState<boolean>(false)
    const [subTotal, setSubTotal] = useState<number>(0)

    const handleActionButton = (val: boolean) => {
        setCartSlideOut(val);
        setTimeout(() => {
            setShowActionButtons(val)
        }, 500);
    }

    const addItemToCart = (id: string) => {
        const item = foodItemsMap.get(id);
        if (!item)
            return;

        const newCart = new Map(cartFoodItems);
        const currentQuantity = newCart.get(id) || 0;
        newCart.set(id, currentQuantity + 1);
        setCartFoodItems(newCart);
        if (!cartSlideOut)
            handleActionButton(true);

        setSubTotal(subTotal + item?.price);
    };

    const removeItemFromCart = (id: string) => {
        const newCart = new Map(cartFoodItems);
        const currentQuantity = newCart.get(id);
        const item = foodItemsMap.get(id);
        if (currentQuantity && item) {
            const newQuantity = currentQuantity - 1;
            if (newQuantity < 0)
                return;

            if (newQuantity == 0) {
                newCart.delete(id);
            } else {
                newCart.set(id, newQuantity);
            }
            setSubTotal(subTotal - item?.price);
            setCartFoodItems(newCart);
            if (newCart.size == 0)
                handleActionButton(false)

        }
    };

    const clearCart = () => {
        setCartFoodItems(new Map());
        handleActionButton(false)
    }

    const cartQuantityOfItem = (id: string): number => {
        return cartFoodItems.get(id) || 0;
    }

    const isCartEmpty = () => {
        return cartFoodItems.size === 0;
    }

    const contextValue: CartContextType = {
        cartFoodItems,
        setCartFoodItems,
        addItemToCart,
        removeItemFromCart,
        showActionButtons,
        setShowActionButtons,
        showCartPage,
        setShowCartPage,
        cartQuantityOfItem,
        cartSlideOut,
        clearCart,
        subTotal,
        isCartEmpty
    };
    return (<CartContext.Provider value={contextValue}> {children} </CartContext.Provider>);
}