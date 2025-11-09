import type { CategoryOption, FoodItem, FoodTag, SliderDetails } from "../utils/Models";
// import foodItemsData from "../data/foodItem1.json"
// import categoriesData from "../data/category.json"
// import tagsData from "../data/tags.json"
// import sliderDetailsData from "../data/sliderImages.json"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// export const initialFoodItems: FoodItem[] = foodItemsData?.data;
// export const initialCategories: CategoryOption[] = categoriesData?.data;
// export const initialTags: FoodTag[] = tagsData?.data;
// export const initialSliderDetails: SliderDetails[] = sliderDetailsData?.data;

export const initialFoodItems: FoodItem[] = [];
export const initialCategories: CategoryOption[] = [];
export const initialTags: FoodTag[] = [];
export const initialSliderDetails: SliderDetails[] = [];

interface DataContextType {
    foodItems: FoodItem[];
    setFoodItems: (list: FoodItem[]) => void;
    allFoodItems: FoodItem[];
    setAllFoodItems: (list: FoodItem[]) => void;
    categories: CategoryOption[];
    setCategories: (list: CategoryOption[]) => void;
    tags: FoodTag[];
    setTags: (list: FoodTag[]) => void;
    sliderDetails: SliderDetails[];
    setSliderDetails: (list: SliderDetails[]) => void;
    foodItemsMap: Map<string,FoodItem>;
    setFoodItemsMap: (map: Map<string, FoodItem>) => void;
    overallNoData:()=>boolean;
}
export const DataContext = createContext<DataContextType | undefined>(undefined);
interface DataProviderProps {
    children: ReactNode;
}
export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [allFoodItems, setAllFoodItems] = useState<FoodItem[]>(initialFoodItems);
    const [tags, setTags] = useState<FoodTag[]>(initialTags);
    const [sliderDetails, setSliderDetails] = useState<SliderDetails[]>(initialSliderDetails);
    const [foodItemsMap, setFoodItemsMap] = useState<Map<string, FoodItem>>(new Map());
    const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
    // const [rawCategories, setRawCategories] = useState<CategoryOption[]>(initialCategories);
    const [categories, setCategories] = useState<CategoryOption[]>(initialCategories?.sort((a, b) => {
        const posA = a.position ?? Number.MAX_SAFE_INTEGER;
        const posB = b.position ?? Number.MAX_SAFE_INTEGER;
        return posA - posB;
    }));


    useEffect(() => {
        const newMap = new Map<string,
            FoodItem>();
        allFoodItems.forEach(item => {
            newMap.set(item.id, item);
        });
        setFoodItemsMap(newMap);
    }, [allFoodItems]);

    const overallNoData = () => {
        return allFoodItems.length===0;
    }

    // const noDataForCategory = () => {
    //     return foodItems.length === 0;
    // }

    const contextValue: DataContextType = {
        foodItems,
        setFoodItems,
        allFoodItems,
        setAllFoodItems,
        categories,
        setCategories,
        tags,
        setTags,
        sliderDetails,
        setSliderDetails,
        foodItemsMap,
        setFoodItemsMap,
        overallNoData
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