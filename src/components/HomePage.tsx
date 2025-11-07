import { useAdminData } from "../context/admin/AdminContext";
import AdminHomePage from "./admin/AdminHomaPage";
import UserHomePage from "./user/UserHomePage";

function HomePage() {
    const { isAdmin } = useAdminData()
    return (<> 
    {isAdmin
            ? <AdminHomePage />
            : <UserHomePage />
    }</>);
}
export default HomePage;