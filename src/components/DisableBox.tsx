import { Box, Typography } from '@mui/material';

interface DisableBox {
    msg: React.ReactNode;
    onDialogBoxClick: () => void;
}

const DisableBox: React.FC<DisableBox> = ({ msg, onDialogBoxClick }) => {
    return (<Box onClick={onDialogBoxClick}
        className="absolute inset-0 w-full h-full flex items-center justify-center z-4 bg-black/30">
        <Typography className={`text-white font-bold uppercase`}
            sx={
                {
                    textAlign: "center",
                    fontSize: "12px"
                }
            }> {msg} </Typography>
    </Box>);
}

export default DisableBox;