import { useState } from "react";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogTitle,
    IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface DialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    headerText: string;
    confirmButtonText: string;
    confirmButtonColor: string;
    childrenComponent?: React.ReactNode;
}
const ConfirmationDialogForItems: React.FC<DialogProps> = ({
    open,
    onClose,
    onConfirm,
    headerText,
    confirmButtonText,
    confirmButtonColor,
    childrenComponent
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleConfirm = async () => {
        setIsLoading(true);
        await onConfirm();
        setIsLoading(false);
    };
    const handleClose = async () => {
        setIsLoading(false);
        onClose();
    };
    return (<Dialog open={open}
        onClose={()=>{}}
        maxWidth="sm"
        fullWidth
        slotProps={
            {
                backdrop: {
                    className: 'backdrop-blur-sm bg-black/10 animate-dialog-in'
                }
            }}>
        <DialogTitle className="flex justify-between items-center pr-4 animate-dialog-in">
            <span className="text-[16px] font-bold text-gray-800">
                {headerText}
            </span>
            <IconButton onClick={handleClose} size="small" className="text-gray-500 hover:text-gray-800">
                <CloseIcon />
            </IconButton>
        </DialogTitle> {childrenComponent}
        <DialogActions className={`p-4 flex ${isLoading ? "justify-center" : "juatify-end"} gap-3`}>
            <Button onClick={handleClose} variant="contained" className="bg-gray-200 hover:bg-gray-300 text-gray-700 shadow-none hover:shadow-md" sx={{ color: 'inherit', backgroundColor: 'inherit' }} >
                Cancel
            </Button>
            <Button onClick={handleConfirm} variant="contained" className="shadow-md hover:shadow-lg" sx={{ backgroundColor: confirmButtonColor, color: 'white', }} disabled={isLoading} >
                {isLoading ? <CircularProgress size={25} sx={{ marginX: 2 }} /> : confirmButtonText}
            </Button>
        </DialogActions>
    </Dialog >
    )
}

export default ConfirmationDialogForItems;