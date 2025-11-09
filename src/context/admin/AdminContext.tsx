import { createContext, useContext, useState, type ReactNode } from "react";
import { OperationStatus, type LoginFormData, type OperationResult } from "../../utils/Models";
import { useNavigate } from "react-router-dom";

interface AdminContextType {
    isAdmin: boolean,
    showAdminLoginPage: boolean, 
    setShowAdminLoginPage: (val : boolean) => void;
    handleAdminLogin: (formData : LoginFormData) => Promise < OperationResult >;
    handleAdminLogOut: () => OperationResult;
    currentTab:string;
    setCurrentTab:(val:string)=>void;
    onNewCategoryAddition:()=>void;
}
const AdminContext = createContext < AdminContextType | undefined > (undefined);

export const useAdminData = () => {
    const context = useContext(AdminContext);
    if (! context) {
        throw new Error('useAdmin must be used within a AdminProvider');
    }
    return context;
};

interface AdminProviderProps {
    children: ReactNode;
}

const delay = (ms : number) => new Promise(resolve => setTimeout(resolve, ms));
export const AdminProvider: React.FC < AdminProviderProps > = ({children}) => {
    const [isAdmin, setIsAdmin] = useState < boolean > (false);
    const [showAdminLoginPage, setShowAdminLoginPage] = useState < boolean > (false);
    const [currentTab,setCurrentTab] = useState<string>("");
    const navigate = useNavigate();

    const handleAdminLogin = async (formData : LoginFormData): Promise < OperationResult > => {
        await delay(2000);
        if (formData.userId === 'admin' && formData.password === '1234') {
            setIsAdmin(true)
            setShowAdminLoginPage(false);
            navigate("/");
            return {status: OperationStatus.SUCCESS, message: 'Login Successful! Redirecting...'};
        } else {
            return {status: OperationStatus.FAILURE, message: 'Login Failed: Invalid credentials.'};
        }
    }

    const handleAdminLogOut = () : OperationResult => {
        try {
            setIsAdmin(false);
            navigate("/");
            return {status: OperationStatus.SUCCESS, message: 'Admin Logout Successful!'};
        } catch (e) {
            return {status: OperationStatus.FAILURE, message: 'Facing some error while logout!'};
        }
    }

    const onNewCategoryAddition = () => {
        setCurrentTab("ADD_NEW_CATEGORY")
    };

    const contextValue: AdminContextType = {
        isAdmin,
        showAdminLoginPage,
        setShowAdminLoginPage,
        handleAdminLogin,
        handleAdminLogOut,
        currentTab,
        setCurrentTab,
        onNewCategoryAddition
    };
    return (<AdminContext.Provider value={contextValue}> {children} </AdminContext.Provider>);
};
