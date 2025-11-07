import { Alert, Snackbar, type AlertColor } from "@mui/material";
import { createContext, useContext, useState, type ReactNode } from "react";

interface SnackbarContextType {
    showSnackbar: (message: string, severity: AlertColor) => void;
}
const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);
export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};
interface SnackbarProviderProps {
    children: ReactNode;
}
export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<AlertColor>('success');
    const showSnackbar = (msg: string, sev: AlertColor) => {
        setMessage(msg);
        setSeverity(sev);
        setOpen(true);
    };
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return (<SnackbarContext.Provider value={
        { showSnackbar }
    }> {children}
        <Snackbar open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={
                {
                    vertical: 'top',
                    horizontal: 'center'
                }
            }>
            <Alert onClose={handleClose}
                severity={severity}
                sx={
                    {
                        width: '100%',
                        mt: "6vh"
                    }
                }> {message} </Alert>
        </Snackbar>
    </SnackbarContext.Provider>);
};