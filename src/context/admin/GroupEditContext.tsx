import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

interface GroupEditContextType {
    selectedFoodItems: Set < string >;
    showCheckbox: boolean;
    setShowCheckbox: (val : boolean) => void;
    showMenubar: boolean;
    setShowMenubar: (val : boolean) => void;
    reorderEnable: boolean;
    setReorderEnable: (val : boolean) => void;
    selectFoodItem: (id : string) => void;
    unselectFoodItem: (id : string) => void;
    isIdSelected: (id : string) => boolean;
    showTimeRageDialog: boolean;
    setShowTimeRageDialog: (val : boolean) => void;
    availableFrom: string;
    setAvailableFrom: (val : string) => void;
    availableTo: string;
    setAvailableTo: (val : string) => void;
    showAllAvailableDialog: boolean;
    setShowAllAvailableDialog: (val : boolean) => void;
    showAllNotAvailableDialog: boolean;
    setShowAllNotAvailableDialog: (val : boolean) => void;
    showDeleteAllDialog: boolean;
    setShowDeleteAllDialog: (val : boolean) => void;
    noItemsSelected: () => boolean;
    handleAllClose: () => void;
}
const GroupEditContext = createContext < GroupEditContextType | undefined > (undefined);
export const useGroupEditData = () => {
    const context = useContext(GroupEditContext);
    if (! context) {
        throw new Error('useGroupEdit must be used within a GroupEditProvider');
    }
    return context;
};
interface GroupEditProviderProps {
    children: ReactNode;
}
export const GroupEditProvider: React.FC < GroupEditProviderProps > = ({children}) => {
    const [selectedFoodItems, setSelectedFoodItems] = useState < Set < string >> (new Set([]))
    const [showCheckbox, setShowCheckbox] = useState < boolean > (false)
    const [showMenubar, setShowMenubar] = useState < boolean > (false)
    const [showTimeRageDialog, setShowTimeRageDialog] = useState < boolean > (false)
    const [showAllAvailableDialog, setShowAllAvailableDialog] = useState < boolean > (false)
    const [showAllNotAvailableDialog, setShowAllNotAvailableDialog] = useState < boolean > (false)
    const [showDeleteAllDialog, setShowDeleteAllDialog] = useState < boolean > (false)
    const [availableFrom, setAvailableFrom] = useState < string > ("00:00")
    const [availableTo, setAvailableTo] = useState < string > ("23:59")
    const [reorderEnable,setReorderEnable] = useState<boolean>(false);

    useEffect(() => {
        const newSet = new Set < string > ();
        setSelectedFoodItems(newSet);
    }, [showCheckbox])

    useEffect(() => {
        console.log(selectedFoodItems)
    }, [selectedFoodItems])

    const selectFoodItem = (id : string) => {
        const newSet = new Set(selectedFoodItems);
        if (! newSet.has(id)) {
            newSet.add(id);
            setSelectedFoodItems(newSet);
        };
    }
    const unselectFoodItem = (id : string) => {
        const newSet = new Set(selectedFoodItems);
        const wasDeleted = newSet.delete(id);
        if (wasDeleted) {
            setSelectedFoodItems(newSet);
        }
    }
    const noItemsSelected = useCallback(() => {
        return selectedFoodItems.size === 0
    }, [selectedFoodItems]);

    const isIdSelected = useCallback((id : string) => {
        return selectedFoodItems.has(id);
    }, [selectedFoodItems]);
    
    const handleAllClose = () => {
        setShowCheckbox(false);
        setShowMenubar(false);
        setAvailableFrom("00:00");
        setAvailableTo("23:59");
        setSelectedFoodItems(new Set());
        setShowAllAvailableDialog(false);
        setShowAllNotAvailableDialog(false);
        setShowDeleteAllDialog(false);
        setShowTimeRageDialog(false);
    }
    const contextValue: GroupEditContextType = {
        showCheckbox,
        setShowCheckbox,
        selectFoodItem,
        unselectFoodItem,
        isIdSelected,
        selectedFoodItems,
        showMenubar,
        setShowMenubar,
        reorderEnable,
        setReorderEnable,
        showTimeRageDialog,
        setShowTimeRageDialog,
        availableFrom,
        setAvailableFrom,
        availableTo,
        setAvailableTo,
        showAllAvailableDialog,
        setShowAllAvailableDialog,
        showAllNotAvailableDialog,
        setShowAllNotAvailableDialog,
        showDeleteAllDialog,
        setShowDeleteAllDialog,
        noItemsSelected,
        handleAllClose
    };
    return (<GroupEditContext.Provider value={contextValue}> {children} </GroupEditContext.Provider>);
}