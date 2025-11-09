import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Burger from "./Burger";
import { LOGO, REORDER_ICON } from "../utils/Constants";
import { useGroupEditData } from "../context/admin/GroupEditContext";
import { useAdminData } from "../context/admin/AdminContext";

function Header() {
    let navigate = useNavigate();
    const [showNavbar, setShowNavbar] = useState<boolean>(false)
    const { isAdmin } = useAdminData();
    const { reorderEnable, setReorderEnable ,setShowCheckbox } = useGroupEditData();

    const handleNavbarCloseClick = () => {
        setShowNavbar(false)
    }

    return (<div className="fixed top-0 z-10 h-[60px] w-[100vw] md:h-[90px] md:px-30 lg:px-40 flex justify-between bg-white items-center">
        <div className='flex px-2 h-full'>
            <div className="w-10 h-full" onClick={
                () => navigate("")
            }><img src={LOGO}
                className='h-full w-full object-contain' />
            </div>
            <div className='h-full w-full ml-2 flex flex-col justify-center items-start'>
                <p className='font-semibold text-[14px] md: text-[17px]'>Welcome to The

                    ShriJi Cafe</p>
                <p className='mt-0 text-[12px] md:text-[14px] '>Sip, Setter and Sparkle</p>
            </div>
        </div>
        <div className='relative z-8 flex items-center py-5 md:py-8 h-full gap-2'>
            {isAdmin && <div onClick={() => { setReorderEnable(!reorderEnable); setShowCheckbox(false) }} className={`h-8 w-8 md:h-10 md:w-10 ${reorderEnable ? "logo-beat" : ""}`}>
                <img className="w-full h-full object-cover" src={REORDER_ICON} />
            </div>}

            {showNavbar && <Navbar isOpen={showNavbar}
                onClose={handleNavbarCloseClick} />
            }
            <Burger onClick={
                () => setShowNavbar(!showNavbar)
            } />
        </div>
    </div>);
}
export default Header;
