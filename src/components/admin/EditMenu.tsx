import { useAdminData } from "../../context/admin/AdminContext";
import { useGroupEditData } from "../../context/admin/GroupEditContext";
import { useMenuAdminData } from "../../context/admin/MenuAdminContext";
import { useSingleEditData } from "../../context/admin/SingleEditContext";
import { useFoodGridData } from "../../context/FoodGridContext";
import { useSnackbar } from "../../context/SnackbarContext";
import { OperationStatus, type FoodItem } from "../../utils/Models";
import CategorySelector from "../CategorySelector";
import FoodItemGrid from "../FoodItemGrid";
import ConfirmationDialog from "../reusable/ConfirmationDialog";
import FoodUpsertForm from "./FoodUpsertForm";
import MenuToolBar from "./MenuToolBar";

interface EditMenuProps {
    onNewCategpryAddition: () => void;
}

const EditMenu: React.FC<EditMenuProps> = ({ onNewCategpryAddition }) => {
    const { showSnackbar } = useSnackbar();
    const { isAdmin } = useAdminData();
    const { currentItem } = useFoodGridData()
    const {
        showCheckbox,
        setShowCheckbox,
        showMenubar,
        setShowMenubar,
        noItemsSelected,
        unselectFoodItem
    } = useGroupEditData();
    const { updateFoodItems, deleteFoodItem } = useMenuAdminData();
    const {
        isEditClicked,
        setIsEditClicked,
        isDeleteClicked,
        setIsDeleteClicked,
        isDisableClicked,
        setIsDisableClicked
    } = useSingleEditData();

    const onEditFoodItem = async (item: FoodItem) => {
        try {
            const result = await updateFoodItems(item);
            if (result.status === OperationStatus.SUCCESS) {
                showSnackbar(result.message, 'success')
            } else {
                showSnackbar(result.message, 'warning')
            }
        } catch (error) {
            console.error("Critical API Error:", error);
            showSnackbar("CRITICAL ERROR: Could not connect to service.", 'warning');
        }
    }

    const onDeleteFoodItem = async (item?: FoodItem): Promise<void> => {
        if (!item) {
            return;
        }
        try {
            const result = await deleteFoodItem(item?.id);
            if (result.status === OperationStatus.SUCCESS) {
                showSnackbar(result.message, 'success')
            } else {
                showSnackbar(result.message, 'warning')
            }
        } catch (error) {
            console.error("Critical API Error:", error);
            showSnackbar("CRITICAL ERROR: Could not connect to service.", 'warning');
        }
        setIsDeleteClicked(false);
    }

    const handleDisableFoodItem = async (item?: FoodItem): Promise<void> => {
        if (!(item)) {
            return;
        }
        item.available = !item.available;
        try {
            const result = await updateFoodItems(item);
            if (result.status === OperationStatus.SUCCESS) {
                showSnackbar(result.message, 'success')
            } else {
                showSnackbar(result.message, 'warning')
            }
        } catch (error) {
            console.error("Critical API Error:", error);
            showSnackbar("CRITICAL ERROR: Could not connect to service.", 'warning');
        }
        setIsDisableClicked(false);
    }
    const handleMenuClick = (() => {
        setShowMenubar(!showMenubar);
    })

    return (<div className="min-w-[100vw] w-full">
        <CategorySelector isEditPage={true} />
        <FoodItemGrid /> 
        {
            isEditClicked && <FoodUpsertForm submitButtonText={'UPDATE ITEM TO MENU'}
                formHeaderText={'EDIT MENU ITEM'}
                onFormSubmit={onEditFoodItem}
                onNewCategoryRequest={onNewCategpryAddition} />
        }
        <ConfirmationDialog open={isDeleteClicked}
            foodItem={currentItem}
            onClose={
                () => {
                    setIsDeleteClicked(false)
                }
            }
            onConfirm={onDeleteFoodItem}
            type={"Delete"}
            text={
                `Are you sure you want to delete **${currentItem?.name
                }** from the Menu?`
            } />
        <ConfirmationDialog open={isDisableClicked}
            foodItem={currentItem}
            onClose={
                () => {
                    setIsDisableClicked(false)
                }
            }
            onConfirm={handleDisableFoodItem}
            type={
                currentItem?.available
                    ? "Disable"
                    : "Enable"
            }
            text={
                `Are you sure you want to ${currentItem?.available
                    ? "Disable"
                    : "Enable"
                } **${currentItem?.name
                }** from the Menu?`
            } />

        {
            isAdmin && <div onClick={
                () => {
                    setShowCheckbox(!showCheckbox)
                }
            }
                className='fixed bottom-[20vh] right-0 h-fit py-2 pl-4 pr-6 rounded-l-2xl w-fit flex items-center justify-center bg-black/80 text-white z-8'> {
                    !showCheckbox
                        ? "Select"
                        : "Back"
                }</div>
        }

        {
            isAdmin && showCheckbox && <div className='fixed bottom-[20vh] left-0 z-8'>
                {
                showMenubar && <MenuToolBar />
            }
                {
                    !noItemsSelected() && <div onClick={handleMenuClick}
                        className='h-fit py-2 pl-4 pr-6 rounded-r-2xl w-fit flex items-center justify-center bg-black/80 text-white'>Menu</div>
                } </div>
        }
        
         </div>
         
        );
}

export default EditMenu;