import { createContext, useContext, useState, type ReactNode } from "react";
import { OperationStatus, type LoginFormData, type OperationResult } from "../../utils/Models";

interface AdminContextType {
    isAdmin: boolean,
    showAdminLoginPage: boolean 
    setShowAdminLoginPage: (val : boolean) => void;
    handleAdminLogin: (formData : LoginFormData) => Promise < OperationResult >;
    handleAdminLogOut: () => OperationResult;
    items:any[];
    setItems:(val:any[])=>void;
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
    const [isAdmin, setIsAdmin] = useState < boolean > (true);
    const [showAdminLoginPage, setShowAdminLoginPage] = useState < boolean > (false);
     const [items,setItems] = useState<any[]>([]);
    const handleAdminLogin = async (formData : LoginFormData): Promise < OperationResult > => {
        await delay(2000);
        if (formData.userId === 'admin' && formData.password === '1234') {
            setIsAdmin(true)
            setShowAdminLoginPage(false);
            return {status: OperationStatus.SUCCESS, message: 'Login Successful! Redirecting...'};
        } else {
            return {status: OperationStatus.FAILURE, message: 'Login Failed: Invalid credentials.'};
        }
    }
    const handleAdminLogOut = () : OperationResult => {
        try {
            setIsAdmin(false);
            return {status: OperationStatus.SUCCESS, message: 'Admin Logout Successful!'};
        } catch (e) {
            return {status: OperationStatus.FAILURE, message: 'Facing some error while logout!'};
        }
    }
    const contextValue: AdminContextType = {
        isAdmin,
        showAdminLoginPage,
        setShowAdminLoginPage,
        handleAdminLogin,
        handleAdminLogOut,
        items,
        setItems
    };
    return (<AdminContext.Provider value={contextValue}> {children} </AdminContext.Provider>);
};
