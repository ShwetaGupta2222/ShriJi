import { createContext, useContext, useState, type ReactNode } from "react";
import type { FoodItem} from "../utils/Models";
import { useData } from "./DataContext";

interface FoodGridContextType {
    activeCategory: string;
    setActiveCategory: (val: string) => void;
    showItemDetailPage: boolean;
    setShowItemDetailPage: (val: boolean) => void;
    currentItem?: FoodItem;
    setCurrentItem: (item?: FoodItem) => void;
    onShowDetailClicked: (item: FoodItem) => void;
}

export const FoodGridContext = createContext<FoodGridContextType | undefined>(undefined);

interface FoodGridProviderProps {
    children: ReactNode;
}

export const FoodGridProvider: React.FC<FoodGridProviderProps> = ({ children }) => {
    const [activeCategory, setActiveCategory] = useState<string>("");
    const { foodItems } = useData();
    const [currentItem, setCurrentItem] = useState<FoodItem | undefined>(foodItems[0]);
    const [showItemDetailPage, setShowItemDetailPage] = useState<boolean>(false);

    const onShowDetailClicked = (item: FoodItem) => {
        setShowItemDetailPage(true)
        setCurrentItem(item);
    }

    const contextValue: FoodGridContextType = {
        activeCategory,
        setActiveCategory,
        showItemDetailPage,
        setShowItemDetailPage,
        currentItem,
        setCurrentItem,
        onShowDetailClicked
};
return (<FoodGridContext.Provider value={contextValue}> {children} </FoodGridContext.Provider>);
    };


export const useFoodGridData = () => {
    const context = useContext(FoodGridContext);
    if (context === undefined) {
        throw new Error('useFoodGridData must be used within a FoodGridProvider');
    }
    return context;
};