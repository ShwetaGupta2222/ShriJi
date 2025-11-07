import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import type { CategoryFormErrors, CategoryOption } from "../../utils/Models";
import { Box, Button, CircularProgress, TextField, type SelectChangeEvent } from "@mui/material";
import { Close, PhotoCamera } from "@mui/icons-material";

const EMPTY_CATEGORY_ITEM: CategoryOption = {
    id: '',
    name: ''
};
interface CategoryFormProps {
    submitButtonText: string;
    initialData?: CategoryOption;
    onFormSubmit: (data: CategoryOption) => void;
    formHeaderText?: string;
    isVisible?: boolean;
    isAddingItem?: boolean;
    onClose?: () => void;
}

const CategoryUpsertForm: React.FC<CategoryFormProps> = ({
    submitButtonText,
    initialData,
    onFormSubmit,
    formHeaderText,
    isVisible,
    isAddingItem,
    onClose
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<CategoryOption>(initialData ?? EMPTY_CATEGORY_ITEM);
    const [validationErrors, setValidationErrors] = useState<CategoryFormErrors>({});
    const [slideOut, setSlideOut] = useState<boolean>(false);

    useEffect(() => {
        setFormData(initialData ?? EMPTY_CATEGORY_ITEM);
    }, [initialData]);

    useEffect(() => {
        if (isVisible) {
            setSlideOut(false);
        }
    }, [isVisible]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string> | SelectChangeEvent<string[]>) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        if (name && validationErrors[name as keyof CategoryFormErrors]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files
            ? e.target.files[0]
            : null;
        if (file) {
            const objectUrl = URL.createObjectURL(file); 
            setFormData(prev => ({
                ...prev,
                logoUrl: objectUrl
            }));
            if (validationErrors.logoUrl) {
                setValidationErrors(prev => ({
                    ...prev,
                    logoUrl: undefined
                }));
            }
        }
    };

    const validateCategoryForm = useCallback((data: CategoryOption): CategoryFormErrors => {
        const errors: CategoryFormErrors = {};
        if (!data.name.trim()) {
            errors.name = "Category Name is required.";
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
        await onFormSubmit(formData);
        setIsLoading(false);
        setFormData(EMPTY_CATEGORY_ITEM);
        handleCloseClick();
    };

    const handleCloseClick = () => {
        if (onClose != undefined) {
            setSlideOut(true);
            setTimeout(() => {
                onClose();
            }, 500);
        }
    };

    return (
    <div className={
        `top-[60px] bg-opacity-0 bg-[#ececec] w-[100vw] overflow-hidden ${isAddingItem
            ? "md:h-[70vh] md:mb-[15vh] mb-[50vh]"
            : "fixed h-[98vh] md:top-[0px]"
        } ${isAddingItem
            ? ""
            : `${slideOut
                ? 'hide-left'
                : 'show-left'
            }`
        }`
    }>
        <div className='relative h-full flex md:items-center justify-center'>
            <Box className="mx-auto w-full md:pt-16 p-8 bg-white rounded-xl not-[]:md:rounded-b-xl shadow-2xl md:w-2/3 lg:w-1/2" component="form"
                onSubmit={handleSubmit}> {
                    !isAddingItem && <Button className="absolute top-[-2%] left-[95%]"
                        onClick={handleCloseClick}
                        color="error"
                        sx={
                            { minWidth: 0 }
                        }>
                        <Close />
                    </Button>
                }
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800"> {formHeaderText}</h2>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50"> 
                        {formData.logoUrl && 
                        <img className="rounded-sm top-0 left-0 h-full w-[60px] object-contain"
                            src={
                                formData.logoUrl
                            }
                            alt=".." />
                        }
                        <input accept="image/png"
                            style={
                                { display: 'none' }
                            }
                            id="upload-button-png"
                            type="file"
                            name="imageFilePng"
                            onChange={handleImageChange}
                            disabled={isLoading} />
                        <label htmlFor="upload-button-png">
                            <Button variant="outlined"
                                color={
                                    formData.logoUrl
                                        ? "success"
                                        : "secondary"
                                }
                                component="span"
                                disabled={isLoading}
                                startIcon={<PhotoCamera />}> {
                                    formData.logoUrl
                                        ? isAddingItem
                                            ? "Selected Image"
                                            : "Current Image"
                                        : isAddingItem
                                            ? "Choose Food Image"
                                            : "Change Food Image"
                                } </Button>
                        </label>
                        {
                            validationErrors.logoUrl && <p className="text-red-500 text-xs mt-1"> {
                                validationErrors.logoUrl
                            }</p>
                        } </div>
                    <TextField label="Category Name" name="name" type="text" variant="outlined" fullWidth required
                        value={
                            formData.name
                        }
                        onChange={handleChange}
                        disabled={isLoading}
                        error={
                            !!validationErrors.name
                        }
                        helperText={
                            validationErrors.name
                        } />
                    <TextField label="Position (0 or positive number)" name="position" type="number" variant="outlined" fullWidth required
                        value={
                            formData.position ?? 0
                        }
                        onChange={handleChange}
                        disabled={isLoading}
                        inputProps={
                            { min: "0" }
                        }
                        error={
                            !!validationErrors.position
                        }
                        helperText={
                            validationErrors.position
                        } />
                    <Button type="submit" variant="contained" color="primary" fullWidth
                        sx={
                            {
                                paddingY: 1.5,
                                marginTop: 2,
                                color: "white",
                                fontWeight: 800,
                                backgroundColor: submitButtonText?.includes('DELETE')
                                    ? '#FF2C2C'
                                    : '#2aa86a'
                            }
                        }
                        disabled={isLoading}> {
                            isLoading
                                ? <CircularProgress size={30} />
                                : submitButtonText
                        } </Button>
                </div>
            </Box>
        </div>
    </div>);
}
export default CategoryUpsertForm;