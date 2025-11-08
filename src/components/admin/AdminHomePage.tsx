import { useState } from "react";
import { useMenuAdminData } from "../../context/admin/MenuAdminContext";
import { useSnackbar } from "../../context/SnackbarContext";
import { AdminRoles, OperationStatus, type CategoryOption, type FoodItem } from "../../utils/Models";
import CategoryUpsertForm from "./CategoryUpsertForm";
import EditMenu from "./EditMenu";
import FoodUpsertForm from "./FoodUpsertForm";
import { EditSliders } from "./EditSliders";


function AdminHomePage() {
    const { updateFoodItems, updateCategories } = useMenuAdminData();
    const { showSnackbar } = useSnackbar();
    const roles = Object.entries(AdminRoles);
    const [activeRole, setActiveRole] = useState(Object.keys(AdminRoles)[3]);
    const onNewCategoryAddition = () => {
        setActiveRole("ADD_NEW_CATEGORY")
    };
    const onAddItemFormSubmit = async (item: FoodItem) => {
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
    const onAddCategoryFormSubmit = async (category: CategoryOption) => {
        try {
            const result = await updateCategories(category);
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
    return (<div className="h-auto">
        <div className={`w-full md:w-fit h-fit mx-auto bg-white p-4 md:my-8 md:transform md:translate-y-4`}>
            <div className="flex overflow-x-scroll hide-x-scrollbar gap-4 lg:gap-8 "> {
                roles.map((roleEnum) => {
                    return (<div key={ roleEnum[0]} className='w-fit flex flex-col'
                        onClick={ () => { setActiveRole(roleEnum[0])}}>
                        <div
                            className={
                                `flex flex-col items-center flex-shrink-0 cursor-pointer group pl-2 md:pl-5 py-2 px-5 ${activeRole == roleEnum[0]
                                    ? "bg-[#2d2e2e] text-white"
                                    : "bg-[#eeeeee] text-black"
                                }`
                            }>
                            <div className="flex flex-col items-center">
                                <span className={`text-[11px] md:text-[15px] font-semibold whitespace-nowrap transition-colors`}> {
                                    roleEnum[1]
                                } </span>
                            </div>
                        </div>
                    </div>);
                })
            } </div>
        </div>
        {
            (activeRole === "ADD_NEW_FOOD_ITEM") && <FoodUpsertForm submitButtonText={'ADD ITEM TO MENU'}
                formHeaderText={'Add New Menu Item'}
                onFormSubmit={onAddItemFormSubmit}
                onNewCategoryRequest={onNewCategoryAddition}
                isAddingItem={true} />
        }
        {
            (activeRole === "ADD_NEW_CATEGORY") && <CategoryUpsertForm submitButtonText={'ADD NEW CATEGORY'}
                formHeaderText={'Add Category To Menu'}
                onFormSubmit={onAddCategoryFormSubmit}
                isAddingItem={true}
                onClose={
                    () => { }
                } />
        }
        {
            (activeRole === "EDIT_FOOD_ITEM") && <EditMenu onNewCategpryAddition={onNewCategoryAddition} />
        } 
        {
            (activeRole === "EDIT_SLIDERS") && <EditSliders />
        } 
    </div>);
}
export default AdminHomePage;
