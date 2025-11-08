import { Button, DialogContent, TextField } from "@mui/material";
import { useGroupEditData } from "../../context/admin/GroupEditContext";
import type { EmptyProps } from "../../utils/Models";
import { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";
import { useMenuAdminData } from "../../context/admin/MenuAdminContext";
import { useSnackbar } from "../../context/SnackbarContext";
import ConfirmationDialogForItems from "../reusable/ConfirmationDialogForItems";
import { ArrowBackIos } from "@mui/icons-material";

interface DialogTextProps {
    text: string
}

const DialogText: React.FC<DialogTextProps> = ({ text }) => {
    return (
        <DialogContent dividers>
            <div className="py-4 text-lg text-gray-700"> {text} </div>
        </DialogContent>)
}

function SetTimeRangeCompoenent() {
    const { availableFrom, setAvailableFrom, availableTo, setAvailableTo } = useGroupEditData();

    const handleChange = (field: 'from' | 'to', value: string) => {
        if (field === "from")
            setAvailableFrom(value);
        else
            setAvailableTo(value);
    };

    return (<div className="item-row flex md:grid md:grid-cols-12 md:gap-4 items-start md:items-center py-4 border-b border-gray-100 last:border-b-0 p-3">
        <TextField id={`from`}
            label="Available From"
            type="time"
            value={availableFrom}
            onChange={
                (e) => handleChange('from', e.target.value)
            }
            InputLabelProps={
                { shrink: true }
            }
            fullWidth
            size="small"
            variant="outlined" />

        <TextField id={`to`}
            label="Available To"
            type="time"
            value={availableTo}
            onChange={
                (e) => handleChange('to', e.target.value)
            }
            InputLabelProps={
                { shrink: true }
            }
            fullWidth
            size="small"
            variant="outlined" />
    </div>);
}


const MenuToolBar: React.FC<EmptyProps> = () => {
    const {
        selectedFoodItems,
        showMenubar,
        setShowMenubar,
        showTimeRageDialog,
        setShowTimeRageDialog,
        showAllAvailableDialog,
        setShowAllAvailableDialog,
        showAllNotAvailableDialog,
        setShowAllNotAvailableDialog,
        showDeleteAllDialog,
        setShowDeleteAllDialog,
        availableFrom,
        availableTo,
        handleAllClose
    } = useGroupEditData();
    const [slideOut, setSlideOut] = useState<boolean>(false);
    const { foodItemsMap } = useData();
    const { updateFoodItems, deleteFoodItem } = useMenuAdminData();
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        if (showMenubar) {
            setSlideOut(false);
        }
    }, [showMenubar]);

    const baseButtonClass = "w-full py-3 px-4 font-semibold rounded-lg text-sm transition duration-200 transform hover:scale-[1.02] shadow-md mb-3";

    const handleConfirmSetTimeRange = async () => {
        console.log("Action: Setting Time Range...");
        const foodItemIdsArray = Array.from(selectedFoodItems);
        const updatePromises = foodItemIdsArray.map(async (id: string) => {
            const item = foodItemsMap.get(id);
            if (!item) {
                console.warn(`FoodItem with ID "${id}" not found in map. Skipping update.`);
                return Promise.resolve(null);
            }
            if (item.availableFrom === availableFrom && item.availableTo === availableTo) {
                return Promise.resolve(null)
            }
            item.availableFrom = availableFrom;
            item.availableTo = availableTo;
            try {
                const result = await updateFoodItems(item);
                return result;
            } catch (error) {
                console.error(`Error updating item ${id}:`, error);
                showSnackbar(`Failed to update ${item.name
                    }.`, 'error');
                return Promise.resolve(null);
            }
        });
        try {
            await Promise.all(updatePromises);
            showSnackbar("Successfully set timing for all selected items.", 'success');
        } catch (error) {
            showSnackbar("An unexpected error occurred during updates.", 'error');
        } finally {
            handleAllClose();
        }
    };

    const handleConfirmAllAvailable = async () => {
        console.log("Action: Marking All Not Available...");
        const foodItemIdsArray = Array.from(selectedFoodItems);
        const updatePromises = foodItemIdsArray.map(async (id: string) => {
            const item = foodItemsMap.get(id);
            if (!item) {
                console.warn(`FoodItem with ID "${id}" not found in map. Skipping update.`);
                return Promise.resolve(null);
            }
            if (item.available === true) {
                return Promise.resolve(null)
            }
            item.available = true;
            try {
                const result = await updateFoodItems(item);
                return result;
            } catch (error) {
                console.error(`Error updating item ${id}:`, error);
                showSnackbar(`Failed to update ${item.name
                    }.`, 'error');
                return Promise.resolve(null);
            }
        });
        try {
            await Promise.all(updatePromises);
            showSnackbar("Successfully made all selected item available.", 'success');
        } catch (error) {
            showSnackbar("An unexpected error occurred during updates.", 'error');
        } finally {
            handleAllClose();
        }
    };

    const handleConfirmAllNotAvailable = async () => {
        console.log("Action: Marking All Not Available...");
        const foodItemIdsArray = Array.from(selectedFoodItems);
        const updatePromises = foodItemIdsArray.map(async (id: string) => {
            const item = foodItemsMap.get(id);
            if (!item) {
                console.warn(`FoodItem with ID "${id}" not found in map. Skipping update.`);
                return Promise.resolve(null);
            }
            if (item.available === false) {
                return Promise.resolve(null)
            }
            item.available = false;
            try {
                const result = await updateFoodItems(item);
                return result;
            } catch (error) {
                console.error(`Error updating item ${id}:`, error);
                showSnackbar(`Failed to update ${item.name
                    }.`, 'error');
                return Promise.resolve(null);
            }
        }
        )

        try {
            await Promise.all(updatePromises);
            showSnackbar("Successfully made all selected item unavailable.", 'success');
        } catch (error) {
            showSnackbar("An unexpected error occurred during updates.", 'error');
        } finally {
            handleAllClose();
        }
    };

    const handleConfirmDeleteAll = async () => {
        console.log("Action: Deleting All Selected Items...");
        const foodItemIdsArray = Array.from(selectedFoodItems);
        const updatePromises = foodItemIdsArray.map(async (id: string) => {
            const item = foodItemsMap.get(id);
            if (!item) {
                console.warn(`FoodItem with ID "${id}" not found in map. Skipping update.`);
                return Promise.resolve(null);
            }
            try {
                const result = await deleteFoodItem(id);
                return result;
            } catch (error) {
                console.error(`Error updating item ${id}:`, error);
                showSnackbar(`Failed to update ${item.name
                    }.`, 'error');
                return Promise.resolve(null);
            }
        });
        try {
            await Promise.all(updatePromises);
            showSnackbar("Successfully deleted all selected items from menu", 'success');
        } catch (error) {
            showSnackbar("An unexpected error occurred during updates.", 'error');
        } finally {
            handleAllClose();
        }
    };

    const handleCloseClick = () => {
        setSlideOut(true);
        setTimeout(() => {
            setShowMenubar(!showMenubar)
        }, 500);
    };

    return (
        <div className={
            `${slideOut
                ? 'hide-left'
                : 'show-left'
            } w-64 bg-white p-6 shadow-2xl rounded-xl show`
        }>
            <Button className="absolute top-0 left-[93%]"
                onClick={handleCloseClick}
                color="inherit"
                sx={
                    {
                        minWidth: 0,
                        fontSize: "18px"
                    }
                }>
                <ArrowBackIos fontSize="inherit" />
            </Button>

            <div className="">
                <button onClick={
                    () => {
                        setShowTimeRageDialog(true)
                    }
                }
                    className={
                        `${baseButtonClass} text-gray-900`
                    }>
                    Set Time range
                </button>
                <button onClick={
                    () => {
                        setShowAllAvailableDialog(true)
                    }
                }
                    className={
                        `${baseButtonClass} text-gray-900`
                    }>
                    Make All Available
                </button>
                <button onClick={
                    () => {
                        setShowAllNotAvailableDialog(true)
                    }
                }
                    className={
                        `${baseButtonClass} text-gray-900`
                    }>
                    All Not Available
                </button>
                <button onClick={
                    () => {
                        setShowDeleteAllDialog(true)
                    }
                }
                    className={
                        `${baseButtonClass} text-gray-900`
                    }>
                    Delete All
                </button>
            </div>

            <p className="mt-6 text-xs text-gray-500 text-center">
                These actions will apply to the currently selected IDs.
            </p>

            <ConfirmationDialogForItems open={showTimeRageDialog}
                headerText='Set Time Range For Items'
                onClose={
                    () => {
                        setShowTimeRageDialog(false)
                    }
                }
                onConfirm={handleConfirmSetTimeRange}
                confirmButtonText={"Set Time"}
                confirmButtonColor="#000000"
                childrenComponent={<SetTimeRangeCompoenent />} 
            />

            <ConfirmationDialogForItems open={showAllAvailableDialog}
                headerText='Available All Items'
                onClose={
                    () => {
                        setShowAllAvailableDialog(false)
                    }
                }
                onConfirm={handleConfirmAllAvailable}
                confirmButtonText={"Make All Available"}
                confirmButtonColor="#000000"
                childrenComponent={<DialogText text={"Are you sure to make all the items **Available** to the Menu."} />}
            />
            <ConfirmationDialogForItems open={showAllNotAvailableDialog}
                headerText='Disable All Items'
                onClose={
                    () => {
                        setShowAllNotAvailableDialog(false)
                    }
                }
                onConfirm={handleConfirmAllNotAvailable}
                confirmButtonText={"Disable All"}
                confirmButtonColor="#000000"
                childrenComponent={<DialogText text={"Are you sure to **Disable** all the items from the Menu."} />}
            />
             <ConfirmationDialogForItems open={showDeleteAllDialog}
                headerText='Delete All Items'
                onClose={
                    () => {
                        setShowDeleteAllDialog(false)
                    }
                }
                onConfirm={handleConfirmDeleteAll}
                confirmButtonText={"Delete All"}
                confirmButtonColor="#000000"
                childrenComponent={<DialogText text={"Are you sure to **Delete** all the items from the Menu."} />}
            />
        </div>
    );
}

export default MenuToolBar;
