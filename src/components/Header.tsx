import { useState } from "react";
import {useNavigate} from "react-router-dom";
import logo from "../assets/logo.png"
import Navbar from "./Navbar";
import Burger from "./Burger";

function Header() {
    let navigate = useNavigate();
    const [showNavbar, setShowNavbar] = useState < boolean > (false)
    const handleNavbarCloseClick = () => {
        setShowNavbar(false)
    }
    return (<div className="fixed top-0 z-10 h-[60px] w-[100vw] md:h-[90px] md:px-30 lg:px-40 flex justify-between bg-white">
        <div className='flex px-2'>
            <div onClick={
                () => navigate("")  
            }><img src={logo}
                    className='h-full w-full object-contain'/>
            </div>
            <div className='h-full w-full ml-2 flex flex-col justify-center items-start'>
                <p className='font-semibold text-[14px] md: text-[17px]'>Welcome to The
                        
                        ShriJi Cafe</p>
                <p className='mt-0 text-[12px] md:text-[14px] '>Sip, Setter and Sparkle</p>
            </div>
        </div>
        <div className='relative'> {
            showNavbar && <Navbar isOpen={showNavbar}
                onClose={handleNavbarCloseClick}/>
        }
            <Burger onClick={
                () => setShowNavbar(!showNavbar)
            }/>
        </div>
    </div>);
}
export default Header;
