import CategorySelector from "../CategorySelector";
import FoodItemGrid from "../FoodItemGrid";
import ActionButtons from "./ActionButtons";

function UserMenu() {
    return (<div className="bg-[#ececec]">
        <CategorySelector/>
        <FoodItemGrid/>
        <ActionButtons/>
    </div>);
}
export default UserMenu;