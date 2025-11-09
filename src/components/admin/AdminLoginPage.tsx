import { Box, Button, CircularProgress, Dialog, IconButton, InputAdornment, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"
import { OperationStatus, type EmptyProps, type LoginFormData, type LoginFormErrors } from "../../utils/Models";
import { useAdminData } from "../../context/admin/AdminContext";
import { useSnackbar } from "../../context/SnackbarContext";
import { useCallback, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const AdminLoginPage: React.FC<EmptyProps> = ({ }) => {
    const { showAdminLoginPage, setShowAdminLoginPage, handleAdminLogin } = useAdminData()
    const { showSnackbar } = useSnackbar()
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<LoginFormErrors>({});

    const handleClickShowPassword = () => {
        setShowPassword(prev => !prev);
    };
    
    const [formData, setFormData] = useState<LoginFormData>({ userId: '', password: '' });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (name && validationErrors[name as keyof LoginFormErrors]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const validateCategoryForm = useCallback((data: LoginFormData): LoginFormErrors => {
        const errors: LoginFormErrors = {};
        if (!data.userId.trim()) {
            errors.userId = "UserId is required.";
        }
        if (!data.password.trim()) {
            errors.password = "Password is required.";
        }
        return errors;
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errors = validateCategoryForm(formData);
        setValidationErrors(errors);
        if (Object.keys(errors).length > 0) {
            console.error("Validation Failed. Check fields.");
            return;
        }
        setIsLoading(true);
        try {
            const result = await handleAdminLogin(formData);
            if (result.status === OperationStatus.SUCCESS) {
                showSnackbar(result.message, 'success')
            } else {
                showSnackbar(result.message, 'warning')
            }
        } catch (error) {
            console.error("Critical API Error:", error);
            showSnackbar("CRITICAL ERROR: Could not connect to service.", 'warning');
        }
        setIsLoading(false)
    };
    const onClose = () => {
        setShowAdminLoginPage(false)
    }
    return (
        <Dialog
            open={showAdminLoginPage}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            slotProps={{
                backdrop: {
                    className: 'backdrop-blur-sm bg-black/10'
                }
            }}
        >
            <div onClick={onClose} className='h-full w-full flex justify-end pt-4 pr-4'>
                <CloseIcon />
            </div>
            <Box className="w-full max-w-sm md:max-w-full p-6 bg-white rounded-lg shadow-xl animate-dialog-in" component="form" onSubmit={handleSubmit} >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    <em> Admin login </em>
                </h2>
                <div className="flex flex-col gap-4">
                    <TextField label="User ID or Email" name="userId" type="text" variant="outlined" fullWidth required value={formData.userId} onChange={handleChange} disabled={isLoading} error={!!validationErrors.userId} helperText={validationErrors.userId} />
                    <TextField label="Password" name="password" type={showPassword ? 'text' : 'password'} variant="outlined" fullWidth required value={formData.password}
                        onChange={handleChange} disabled={isLoading} error={!!validationErrors.password} helperText={validationErrors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {/* Icon switches based on the state */}
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={isLoading}
                        sx={{ paddingY: 1.5, marginTop: 1,backgroundColor:"#000000" }}
                    >
                        {isLoading ? <CircularProgress size={30} /> : 'Log In'}
                    </Button>
                </div>
            </Box>
        </Dialog >
    );
};