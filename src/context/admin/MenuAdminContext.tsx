import { createContext, useContext, useEffect, type ReactNode } from "react";
import { OperationStatus, type CategoryOption, type FoodItem, type FoodTag, type OperationResult, type SliderDetails } from "../../utils/Models";
import { generateUniqueId } from "../../utils/Functions";
import { useData } from "../DataContext";

interface MenuAdminContextType {
    updateFoodItems: (newItem: FoodItem) => Promise<OperationResult>;
    updateCategories: (newCategory: CategoryOption) => Promise<OperationResult>;
    updateTags: (newTag: FoodTag) => Promise<OperationResult>;
    updateSliderDetails: (newSliderDetail: SliderDetails) => Promise<OperationResult>;

    deleteFoodItem: (id: string) => Promise<OperationResult>;
    deleteCategory: (id: string) => Promise<OperationResult>;
    deleteTag: (id: string) => Promise<OperationResult>;
    deleteSliderDetail: (id: string) => Promise<OperationResult>;
}

export const MenuAdminContext = createContext<MenuAdminContextType | undefined>(undefined);

interface MenuAdminProviderProps {
    children: ReactNode;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const MenuAdminProvider: React.FC<MenuAdminProviderProps> = ({ children }) => {
    const { allFoodItems, setAllFoodItems, categories, setCategories, tags, setTags, sliderDetails, setSliderDetails, setFoodItemsMap } = useData();

    useEffect(() => {
        const newMap = new Map<string, FoodItem>();
        allFoodItems.forEach(item => {
            newMap.set(item.id, item);
        });
        setFoodItemsMap(newMap);
    }, [allFoodItems]);

    const updateItemsLogic = async <T extends { id: string }>(
        prevItems: T[],
        newItem: T,
        setter: React.Dispatch<React.SetStateAction<T[]>>,
        itemName: string
    ): Promise<OperationResult> => {
        await delay(2000);
        const newName = (newItem as any).name;
        const existingIdIndex = prevItems.findIndex(item => item.id === newItem.id);
        if (existingIdIndex !== -1 && newItem.id) {
            // CASE 1: UPDATE EXISTING ITEM (No duplicate name check needed here)
            setter(prev => prev.map((item, index) =>
                index === existingIdIndex ? { ...item, ...newItem } : item
            ));
            return { status: OperationStatus.SUCCESS, message: `${itemName} '${newName || newItem.id}' updated successfully.` };
        }

        if (newName) {
            const existingName = prevItems.find(item =>
                (item as any).name && (item as any).name.toLowerCase() === newName.toLowerCase()
            );
            if (existingName) {
                return { status: OperationStatus.FAILURE, message: `${itemName} with name '${newName}' already exists.` };
            }
        }

        const newId = generateUniqueId();
        const itemWithId: T = { ...newItem, id: newId } as T;

        setter(() => [...prevItems, itemWithId]);
        return { status: OperationStatus.SUCCESS, message: `New ${itemName} '${newName || newId}' added.`, newId: newId };
    };

    const deleteItemsLogic = async <T extends { id: string }>(
        itemId: string,
        setter: React.Dispatch<React.SetStateAction<T[]>>,
        itemName: string
    ): Promise<OperationResult> => {
        await delay(2000); 
        let deletedSuccessfully = false;

        setter(prevItems => {
            const initialLength = prevItems.length;
            const newItems = prevItems.filter(item => item.id !== itemId);

            if (newItems.length < initialLength) {
                deletedSuccessfully = true;
                return newItems;
            }
            return prevItems;
        });

        if (deletedSuccessfully) {
            return { status: OperationStatus.SUCCESS, message: `${itemName} with ID ${itemId} successfully deleted.` };
        } else {
            return { status: OperationStatus.FAILURE, message: `${itemName} with ID ${itemId} not found.` };
        }
    };

    const deleteFoodItem = async (id: string): Promise<OperationResult> => {
        console.log("deleting " + id)
        return await deleteItemsLogic(id, setAllFoodItems as React.Dispatch<React.SetStateAction<FoodItem[]>>, "Food Item");
    };

    const deleteCategory = async (id: string): Promise<OperationResult> => {
        return await deleteItemsLogic( id, setCategories as React.Dispatch<React.SetStateAction<CategoryOption[]>>, "Category");
    };

    const deleteTag = async (id: string): Promise<OperationResult> => {
        return await deleteItemsLogic( id, setTags as React.Dispatch<React.SetStateAction<FoodTag[]>>, "Food Tag");
    };

    const deleteSliderDetail = async (id: string): Promise<OperationResult> => {
        return await deleteItemsLogic( id, setSliderDetails as React.Dispatch<React.SetStateAction<SliderDetails[]>>, "Slider Detail");
    };

    const updateFoodItems = async (newItem: FoodItem): Promise<OperationResult> => {
        return await updateItemsLogic(allFoodItems, newItem, setAllFoodItems as React.Dispatch<React.SetStateAction<FoodItem[]>>, "Food Item");
    };

    const updateCategories = async (newCategory: CategoryOption): Promise<OperationResult> => {
        return await updateItemsLogic(categories, newCategory, setCategories as React.Dispatch<React.SetStateAction<CategoryOption[]>>, "Category")
    };
    const updateTags = async (newTag: FoodTag): Promise<OperationResult> => {
        return await updateItemsLogic(tags, newTag, setTags as React.Dispatch<React.SetStateAction<FoodTag[]>>, "Food Tag");
    };

    const updateSliderDetails = async (newSliderDetail: SliderDetails): Promise<OperationResult> => {
        return await updateItemsLogic(sliderDetails, newSliderDetail, setSliderDetails as React.Dispatch<React.SetStateAction<SliderDetails[]>>, "Slider Detail");
    };
    const contextValue: MenuAdminContextType = {
        updateFoodItems, updateCategories, updateTags, updateSliderDetails,
        deleteFoodItem, deleteCategory, deleteTag, deleteSliderDetail,
    };
    return (
        <MenuAdminContext.Provider value={contextValue}>
            {children}
        </MenuAdminContext.Provider>
    );
};
export const useMenuAdminData = () => {
    const context = useContext(MenuAdminContext);
    if (context === undefined) {
        throw new Error('useMenuData must be used within a MenuProvider');
    }
    return context;
};