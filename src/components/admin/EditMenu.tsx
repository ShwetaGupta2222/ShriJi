import { Typography } from "@mui/material";
import { useAdminData } from "../../context/admin/AdminContext";
import { useGroupEditData } from "../../context/admin/GroupEditContext";
import { useMenuAdminData } from "../../context/admin/MenuAdminContext";
import { useSingleEditData } from "../../context/admin/SingleEditContext";
import { useData } from "../../context/DataContext";
import { useFoodGridData } from "../../context/FoodGridContext";
import { useSnackbar } from "../../context/SnackbarContext";
import { OperationStatus, type EmptyProps, type FoodItem } from "../../utils/Models";
import CategorySelector from "../CategorySelector";
import FoodItemGrid from "../FoodItemGrid";
import ConfirmationDialog from "../reusable/ConfirmationDialog";
import FoodUpsertForm from "./FoodUpsertForm";
import MenuToolBar from "./MenuToolBar";

const EditMenu: React.FC<EmptyProps> = ({ }) => {
    const { showSnackbar } = useSnackbar();
    const { isAdmin } = useAdminData();
    const { currentItem } = useFoodGridData()

    const {
        showCheckbox,
        setShowCheckbox,
        showMenubar,
        setShowMenubar,
        noItemsSelected,
        setReorderEnable
    } = useGroupEditData();
    const { updateFoodItems, deleteFoodItem } = useMenuAdminData();
    const {
        isEditClicked,
        isDeleteClicked,
        setIsDeleteClicked,
        isDisableClicked,
        setIsDisableClicked
    } = useSingleEditData();
    const { overallNoData } = useData();

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


    const noData: boolean = overallNoData()
    return (<div className="min-w-[100vw] w-full">
        <CategorySelector />
        {noData &&
            <div className='w-full  h-20 md:h-40 flex items-center justify-center animate-dialog-in'>
                <Typography variant="body1" align="center" color="text.secondary"> No Food Items are added in the Menu. </Typography>
            </div>}
        <FoodItemGrid />
        {
            isAdmin && <div onClick={
                () => {
                    setShowCheckbox(!showCheckbox)
                    setReorderEnable(false)
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

        {
            isEditClicked && <FoodUpsertForm submitButtonText={'UPDATE ITEM TO MENU'}
                formHeaderText={'EDIT MENU ITEM'}
                onFormSubmit={onEditFoodItem}
            />
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


    </div>

    );
}

export default EditMenu;