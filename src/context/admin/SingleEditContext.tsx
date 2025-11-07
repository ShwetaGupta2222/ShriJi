import { createContext, useContext, useState, type ReactNode } from "react";
import type { CategoryOption, FoodItem, FoodTag, SliderDetails } from "../../utils/Models";
import { useData } from "../DataContext";
import { useNavigate } from "react-router-dom";
import { useFoodGridData } from "../FoodGridContext";

interface SingleEditContextType {
    isEditClicked: boolean;
    setIsEditClicked: (val: boolean) => void;
    isDeleteClicked: boolean;
    setIsDeleteClicked: (val: boolean) => void;
    isDisableClicked: boolean;
    setIsDisableClicked: (val: boolean) => void;
    onEditClicked: (item: FoodItem) => void;
    onDeleteClicked: (item: FoodItem) => void;
    onDisableClicked: (item: FoodItem) => void;
}

export const SingleEditContext = createContext<SingleEditContextType | undefined>(undefined);

interface SingleEditProviderProps {
    children: ReactNode;
}

export const SingleEditProvider: React.FC<SingleEditProviderProps> = ({ children }) => {
    const { setCurrentItem } = useFoodGridData();
    const [isEditClicked, setIsEditClicked] = useState<boolean>(false);
    const [isDeleteClicked, setIsDeleteClicked] = useState<boolean>(false);
    const [isDisableClicked, setIsDisableClicked] = useState<boolean>(false);

    const onEditClicked = (item: FoodItem) => {
        setIsEditClicked(true);
        setCurrentItem(item);
    }

    const onDeleteClicked = (item: FoodItem) => {
        setIsDeleteClicked(true);
        setCurrentItem(item);
    }

    const onDisableClicked = (item: FoodItem) => {
        setIsDisableClicked(true)
        setCurrentItem(item);
    }

    const contextValue: SingleEditContextType = {
        isEditClicked,
        setIsEditClicked,
        isDeleteClicked,
        setIsDeleteClicked,
        isDisableClicked,
        setIsDisableClicked,
        onEditClicked,
        onDeleteClicked,
        onDisableClicked
    };

    return (<SingleEditContext.Provider value={contextValue}> {children} </SingleEditContext.Provider>);
};


export const useSingleEditData = () => {
    const context = useContext(SingleEditContext);
    if (context === undefined) {
        throw new Error('useSingleEditData must be used within a SingleEditProvider');
    }
    return context;
};