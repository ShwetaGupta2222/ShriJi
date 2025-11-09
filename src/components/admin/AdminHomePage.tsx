import { useEffect, useState } from "react";
import { useMenuAdminData } from "../../context/admin/MenuAdminContext";
import { useSnackbar } from "../../context/SnackbarContext";
import { AdminRoles, OperationStatus, type CategoryOption, type FoodItem } from "../../utils/Models";
import CategoryUpsertForm from "./CategoryUpsertForm";
import EditMenu from "./EditMenu";
import FoodUpsertForm from "./FoodUpsertForm";
import { EditSliders } from "./EditSliders";
import { useAdminData } from "../../context/admin/AdminContext";
import { useGroupEditData } from "../../context/admin/GroupEditContext";


function AdminHomePage() {
    const { updateFoodItems, updateCategories } = useMenuAdminData();
    const { showSnackbar } = useSnackbar();
    const {currentTab,setCurrentTab} = useAdminData();
    const {setReorderEnable} = useGroupEditData();
    const roles = Object.entries(AdminRoles);
    useEffect(()=>{setCurrentTab(Object.keys(AdminRoles)[2])},[])

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
                        onClick={ () => { setCurrentTab(roleEnum[0]); setReorderEnable(false)}}>
                        <div
                            className={
                                `flex flex-col items-center flex-shrink-0 cursor-pointer group pl-2 md:pl-5 py-2 px-5 ${currentTab == roleEnum[0]
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
            (currentTab === "ADD_NEW_FOOD_ITEM") && <FoodUpsertForm submitButtonText={'ADD ITEM TO MENU'}
                formHeaderText={'Add New Menu Item'}
                onFormSubmit={onAddItemFormSubmit}
                isAddingItem={true} />
        }
        {
            (currentTab === "ADD_NEW_CATEGORY") && <CategoryUpsertForm submitButtonText={'ADD NEW CATEGORY'}
                formHeaderText={'Add Category To Menu'}
                onFormSubmit={onAddCategoryFormSubmit}
                isAddingItem={true}
                onClose={
                    () => { }
                } />
        }
        {
            (currentTab === "EDIT_FOOD_ITEM") && <EditMenu />
        } 
        {
            (currentTab === "EDIT_SLIDERS") && <EditSliders />
        } 
    </div>);
}
export default AdminHomePage;
