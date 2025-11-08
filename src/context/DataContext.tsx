import type { CategoryOption, FoodItem, FoodTag, SliderDetails } from "../utils/Models";
import foodItemsData from "../data/foodItem.json"
import categoriesData from "../data/category.json"
import tagsData from "../data/tags.json"
import sliderDetailsData from "../data/sliderImages.json"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const initialFoodItems: FoodItem[] = foodItemsData?.data;
export const initialCategories: CategoryOption[] = categoriesData?.data;
export const initialTags: FoodTag[] = tagsData?.data;
export const initialSliderDetails: SliderDetails[] = sliderDetailsData?.data;

interface DataContextType {
    foodItems: FoodItem[];
    setFoodItems: (list: FoodItem[]) => void;
    categories: CategoryOption[];
    setCategories: (list: CategoryOption[]) => void;
    tags: FoodTag[];
    setTags: (list: FoodTag[]) => void;
    sliderDetails: SliderDetails[];
    setSliderDetails: (list: SliderDetails[]) => void;
    foodItemsMap: Map<string,
        FoodItem>;
    setFoodItemsMap: (map: Map<string, FoodItem>) => void;
}
export const DataContext = createContext<DataContextType | undefined>(undefined);
interface DataProviderProps {
    children: ReactNode;
}
export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [foodItems, setFoodItems] = useState<FoodItem[]>(initialFoodItems);
    const [tags, setTags] = useState<FoodTag[]>(initialTags);
    const [sliderDetails, setSliderDetails] = useState<SliderDetails[]>(initialSliderDetails);
    const [foodItemsMap, setFoodItemsMap] = useState<Map<string, FoodItem>>(new Map());

    // const [rawCategories, setRawCategories] = useState<CategoryOption[]>(initialCategories);
    const [categories, setCategories] = useState<CategoryOption[]>(initialCategories?.sort((a, b) => {
        const posA = a.position ?? Number.MAX_SAFE_INTEGER;
        const posB = b.position ?? Number.MAX_SAFE_INTEGER;
        return posA - posB;
    }));


    useEffect(() => {
        const newMap = new Map<string,
            FoodItem>();
        foodItems.forEach(item => {
            newMap.set(item.id, item);
        });
        setFoodItemsMap(newMap);
        console.log(foodItems)
    }, [foodItems]);

    const contextValue: DataContextType = {
        foodItems,
        setFoodItems,
        categories,
        setCategories,
        tags,
        setTags,
        sliderDetails,
        setSliderDetails,
        foodItemsMap,
        setFoodItemsMap
    };
    return (<DataContext.Provider value={contextValue}> {children} </DataContext.Provider>);
};
export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useDataData must be used within a DataProvider');
    }
    return context;
};