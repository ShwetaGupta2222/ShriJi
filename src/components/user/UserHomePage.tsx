import { BANNER_TEXT } from "../../utils/Constants";
import Banner from "./Banner";
import OrderTypeSelection from "./OrderTypeSelection";
import Slider from "./Slider";
import UserMenu from "./UserMenu";

function UserHomePage() {
    return (<> 
                <Banner bannerText={BANNER_TEXT}/>
                <Slider/>
                <OrderTypeSelection/>
                <UserMenu/>
            </>);
}
export default UserHomePage;