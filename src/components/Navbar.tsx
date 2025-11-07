import {
    Box,
    Button,
    Divider,
    IconButton,
    Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
// import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminData } from "../context/admin/AdminContext";
import { useSnackbar } from "../context/SnackbarContext";
import { OperationStatus } from "../utils/Models";

interface NavbarProps {
    isOpen: boolean;
    onClose?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isOpen, onClose }) => {
    const [slideOut, setSlideOut] = useState<boolean>(false)
    const { isAdmin, setShowAdminLoginPage, handleAdminLogOut } = useAdminData()
    const { showSnackbar } = useSnackbar();
    const navigate = useNavigate();
    useEffect(() => {
        if (isOpen) {
            setSlideOut(false);
        }
    }, [isOpen]);
    if (isOpen === false && !slideOut) {
        return null;
    }
    const drawerClasses = ` fixed top-0 right-0 z-50 h-full shadow-2xl ${slideOut
            ? 'hide-right'
            : 'show-right'
        } w-3/4 sm:w-2/3 md:w-1/3 lg:w-1/4 `;

    const handleHomeClick = () => {
        navigate("/");
        handleCloseClick()
    }

    const handleAdminLogin = () => {
        setShowAdminLoginPage(true);
        handleCloseClick()
    }

    const handleContactUsClick = () => {
        navigate("/contact-us");
        handleCloseClick()
    }

    const handleAboutUsClick = () => {
        navigate("/about-us");
        handleCloseClick()
    }

    const handleCloseClick = () => {
        if (onClose != undefined) {
            setSlideOut(true);
            setTimeout(() => {
                onClose();
            }, 500);
        }
    }

    const onAdminLogOutClick = () => {
        const result = handleAdminLogOut();
        if (result.status = OperationStatus.SUCCESS) {
            showSnackbar(result.message, 'success');
        } else {
            showSnackbar(result.message, 'warning');
        } handleCloseClick();
    }

    return (<div className="fixed left-0 w-[100vw] h-[100vh]"> {
        isOpen && (<div className="fixed inset-0 z-40 bg-opacity-40 transition-opacity duration-300"
            onClick={handleCloseClick} />)
    }
        <Box className={drawerClasses}
            sx={
                { backgroundColor: 'white' }
            }>
            <div className="flex justify-between items-center p-4 border-b">
                <Typography variant="h6" className="font-bold text-black"></Typography>
                <IconButton onClick={handleCloseClick}
                    size="medium">
                    <CloseIcon />
                </IconButton>
            </div>
            {
                isAdmin
                    ? <nav className="flex flex-col p-4 space-y-2">
                        <div className="p-2 rounded transition duration-150"
                            onClick={handleAdminLogin}>
                            <p className="text-gray-600 hover:bg-gray-100">
                                <EditIcon fontSize="inherit" />&nbsp;About
                            </p>
                        </div>
                        <Divider />
                        <div className="p-2 rounded transition duration-150"
                            onClick={handleAdminLogin}>
                            <p className="text-gray-600 hover:bg-gray-100">
                                <EditIcon fontSize="inherit" />&nbsp;Contact
                            </p>
                        </div>
                        <Divider />
                        <Button type="submit"
                            onClick={onAdminLogOutClick}
                            variant="contained"
                            color="error"
                            fullWidth
                            sx={
                                {
                                    paddingY: 1.5,
                                    marginTop: 3
                                }
                            }>
                            Logout
                        </Button>
                    </nav>
                    : <nav className="flex flex-col p-4 space-y-2">
                        <div className="p-2 rounded transition duration-150"
                            onClick={handleHomeClick}>
                            <p className="font-medium text-gray-600 hover:bg-gray-100">Home Page</p>
                        </div>
                        <Divider />
                        <div className="p-2 rounded transition duration-150"
                            onClick={handleAboutUsClick}>
                            <p className="font-medium text-gray-600 hover:bg-gray-100">About Us</p>
                        </div>
                        <Divider />
                        <div className="p-2 rounded transition duration-150"
                            onClick={handleContactUsClick}>
                            <p className="font-medium text-gray-600 hover:bg-gray-100">Contact Us</p>
                        </div>
                        <Divider />
                        <div className="p-2 rounded transition duration-150"
                            onClick={handleAdminLogin}>
                            <p className="font-medium text-gray-600 hover:bg-gray-100">Admin Login</p>
                        </div>
                    </nav>
            }
            <div className="absolute bottom-0 w-full flex justify-center items-end opacity-30 z-[-1]">
                <img className="w-full object-contain"
                    src={""}
                    alt="" />
            </div>
        </Box>
    </div>);
};
export default Navbar;