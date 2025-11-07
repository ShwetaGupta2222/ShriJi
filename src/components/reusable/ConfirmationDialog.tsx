import { useState } from "react";
import type { FoodItem } from "../../utils/Models";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

interface DialogProps {
    open: boolean;
    foodItem?: FoodItem;
    onClose: () => void;
    onConfirm: (item?: FoodItem) => Promise<void>;
    text: string;
    type: string;
}
const ConfirmationDialog: React.FC<DialogProps> = ({
    open,
    foodItem,
    onClose,
    onConfirm,
    text,
    type
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleConfirm = async () => {
        setIsLoading(true);
        await onConfirm(foodItem);
        setIsLoading(false);
    };
    const handleClose = async () => {
        setIsLoading(false);
        onClose();
    };
    return (
        <Dialog open={open}
            onClose={()=>{}}
            maxWidth="sm"
            fullWidth
            slotProps={
                {
                    backdrop: {
                        className: 'backdrop-blur-sm bg-black/10 animate-dialog-in'
                    }
                }}
        >
            <DialogTitle className="flex justify-between items-center pr-4"> <span className="text-xl font-bold text-gray-800">  Confirm {type}
            </span> <IconButton onClick={handleClose} size="small" className="text-gray-500 hover:text-gray-800"> <Close /> </IconButton> </DialogTitle> <DialogContent dividers>
                <div className="py-4 text-lg text-gray-700"> {text}
                    <p className="mt-2 text-sm text-gray-500"> This
                        action
                        is
                        permanent
                        and
                        cannot
                        be
                        undone.
                    </p>
                </div>
            </DialogContent>
            <DialogActions className={`p-4 flex ${isLoading ? "justify-center" : "juatify-end"} gap-3`}>
                <Button onClick={handleClose} variant="contained" className="bg-gray-200 hover:bg-gray-300 text-gray-700 shadow-none hover:shadow-md" sx={{ color: 'inherit', backgroundColor: 'inherit' }} > Cancel
                </Button>
                <Button onClick={handleConfirm} variant="contained" color="info" className="shadow-md hover:shadow-lg" sx={{ color: 'white', }} disabled={isLoading} > {isLoading ? <CircularProgress size={25} sx={{ marginX: 2 }} /> : type}
                </Button>
            </DialogActions>
        </Dialog >
    )
}

export default ConfirmationDialog;