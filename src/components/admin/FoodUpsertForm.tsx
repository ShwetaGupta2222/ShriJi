import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { useSingleEditData } from "../../context/admin/SingleEditContext";
import { useData } from "../../context/DataContext";
import { useFoodGridData } from "../../context/FoodGridContext";
import type { CategoryOption, FoodFormErrors, FoodItem, FoodTag } from "../../utils/Models";
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, type SelectChangeEvent } from "@mui/material";
import { Close, PhotoCamera } from "@mui/icons-material";
import { capitalizeFirstLetter } from "../../utils/Functions";

const NEW_CATEGORY_OPTION = "--- Add New Category ---";
const EMPTY_FOOD_ITEM: FoodItem = {
    id: '',
    category: '',
    name: '',
    description: '',
    price: 0,
    tag: '',
    imgUrl: '',
    available: true,
    availableFrom: "00:00",
    availableTo: "23:59",
    position:0,
};

interface FoodFormProps {
    submitButtonText: string;
    onFormSubmit: (data: FoodItem) => void;
    onNewCategoryRequest: () => void;
    formHeaderText?: string;
    isAddingItem?: boolean;
}

const FoodUpsertForm: React.FC<FoodFormProps> = ({
    submitButtonText,
    onFormSubmit,
    onNewCategoryRequest,
    formHeaderText,
    isAddingItem
}) => {
    const { currentItem }= useFoodGridData();
    const { isEditClicked, setIsEditClicked } = useSingleEditData();
    const { categories, tags } = useData()
    const categoryOptions: CategoryOption[] = categories?.sort((a, b) => {
        const posA = a.position ?? Number.MAX_SAFE_INTEGER;
        const posB = b.position ?? Number.MAX_SAFE_INTEGER;
        return posA - posB;
    });

    const foodTags: FoodTag[] = tags;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<FoodItem>(currentItem ?? EMPTY_FOOD_ITEM);
    const [validationErrors, setValidationErrors] = useState<FoodFormErrors>({});
    const [slideOut, setSlideOut] = useState<boolean>(false);

    useEffect(() => {
        if (isAddingItem) {
            setFormData(EMPTY_FOOD_ITEM)
        } else
            setFormData(currentItem ?? EMPTY_FOOD_ITEM);

    }, [currentItem]);

    useEffect(() => {
        if (isEditClicked) {
            setSlideOut(false);
        }
    }, [isEditClicked]);

    console.log(formData);
    
    if (!isAddingItem && isEditClicked === false && !slideOut) {
        return null;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string> | SelectChangeEvent<string[]>) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        if (name && validationErrors[name as keyof FoodFormErrors]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        const selectedValue = event.target.value;
        if (selectedValue === NEW_CATEGORY_OPTION) {
            onNewCategoryRequest();
            return;
        }
        handleChange(event as SelectChangeEvent<string>);
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files
            ? e.target.files[0]
            : null;
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setFormData(prev => ({
                ...prev,
                imgUrl: objectUrl
            }));
            if (validationErrors.imgUrl) {
                setValidationErrors(prev => ({
                    ...prev,
                    imgUrl: undefined
                }));
            }
        }
    };

    const validateForm = useCallback((data: FoodItem): FoodFormErrors => {
        const errors: FoodFormErrors = {};
        if (!data.category || data.category === undefined) {
            errors.category = "Category must be selected.";
        }
        if (!data.name.trim()) {
            errors.name = "Food Name is required.";
        }
        if (data.price <= 0) {
            errors.price = "Price must be a valid number.";
        }
        if (data.position != undefined && Number(data.position) < 0) {
            errors.position = "Position must be a non-negative number.";
        }
        return errors;
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setValidationErrors(errors);
        if (Object.keys(errors).length > 0) {
            console.error("Validation Failed. Check fields.");
            return;
        }
        setIsLoading(true);
        await onFormSubmit(formData);
        setIsLoading(false);
        setFormData(EMPTY_FOOD_ITEM);
        handleCloseClick();
    };

    const handleCloseClick = () => {
        if (isEditClicked != false) {
            setSlideOut(true);
            setTimeout(() => {
                setIsEditClicked(false)
            }, 500);
        }
    };

    return (
    <div className={
        `top-[60px] bg-opacity-0 bg-[#ececec] w-[100vw] z-6 overflow-hidden ${isAddingItem
            ? "h-[85vh] "
            :`fixed h-[98vh] md:top-[0px] ${slideOut
                ? 'hide-left'
                : 'show-left'
            }`
        }`
    }>
        <div className={`relative h-full flex md:items-center justify-center ${!slideOut?"bg-black/30":""}`}>
            <Box className="mx-auto w-full md:pt-16 p-8 bg-white rounded-b-xl shadow-2xl md:w-2/3 lg:w-1/2" component="form"
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
                    <div className="flex items-center gap-2 p-3 border rounded-lg"> {
                        formData.imgUrl && <img className="rounded-sm top-0 left-0 h-full w-[60px] object-contain"
                            src={
                                formData.imgUrl
                            }
                            alt=".." />} 
                        <input accept="image/*"
                            style={
                                { display: 'none' }
                            }
                            id="upload-button-all"
                            type="file"
                            name="imageFile"
                            onChange={handleImageChange}
                            disabled={isLoading} />
                        <label htmlFor="upload-button-all">
                            <Button variant="outlined" component="span"
                                color={
                                    formData.imgUrl
                                        ? "success"
                                        : "primary"
                                }
                                startIcon={<PhotoCamera />}> {
                                    formData.imgUrl
                                        ? isAddingItem
                                            ? "Selected Image"
                                            : "Current Image"
                                        : isAddingItem
                                            ? "Choose Food Image"
                                            : "Change Food Image"
                                } </Button>
                        </label>
                        {
                            validationErrors.imgUrl && <p className="text-red-500 text-xs mt-1"> {
                                validationErrors.imgUrl
                            }</p>
                        } </div>
                    <FormControl fullWidth variant="outlined" required
                        error={
                            !!validationErrors.category
                        }>
                        <InputLabel id="category-label">Food Category</InputLabel>
                        <Select labelId="category-label"
                            value={
                                formData.category ?? ''
                            }
                            name="category"
                            label="Food Category"
                            onChange={handleCategoryChange}
                            disabled={isLoading}>
                            <MenuItem value="">
                                <em style={
                                    { color: '#aaa' }
                                }>Please select...</em>
                            </MenuItem>
                            {
                                categoryOptions.map((category) => (
                                <MenuItem key={
                                    category.id
                                }
                                    value={
                                        category.name
                                    }
                                    style={
                                        { fontWeight: 'normal' }
                                    }> {
                                        capitalizeFirstLetter(category.name)
                                    } 
                                </MenuItem>))
                            }
                            <MenuItem key={NEW_CATEGORY_OPTION}
                                value={NEW_CATEGORY_OPTION}
                                style={
                                    { fontWeight: 'bold' }
                                }> {NEW_CATEGORY_OPTION} </MenuItem>
                        </Select>
                        {
                            validationErrors.category && <p className="text-sm text-red-500 mt-1"> {
                                validationErrors.category
                            }</p>
                        } </FormControl>
                    <TextField label="Food Name" name="name" type="text" variant="outlined" fullWidth required
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
                    <TextField label="Food Description" name="description" variant="outlined" fullWidth multiline
                        rows={3}
                        value={
                            formData.description
                        }
                        onChange={handleChange}
                        disabled={isLoading}
                        error={
                            !!validationErrors.description
                        }
                        helperText={
                            validationErrors.description
                        } />
                    <TextField label="Price (in ₹)" name="price" type="number" variant="outlined" fullWidth required
                        value={
                            formData.price
                        }
                        onChange={handleChange}
                        disabled={isLoading}
                        inputProps={
                            { step: "0.01" }
                        }
                        error={
                            !!validationErrors.price
                        }
                        helperText={
                            validationErrors.price
                        } />
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="tag-label">Tags (Bestseller, Trending, etc.)</InputLabel>
                        <Select labelId="tag-label"
                            value={
                                formData.tag ?? ''
                            }
                            name="tag"
                            label="Tag (Bestseller, Trending, etc.)"
                            onChange={handleChange}
                            disabled={isLoading}>
                            <MenuItem value="">
                                <em style={
                                    { color: '#aaa' }
                                }>Please select...</em>
                            </MenuItem>
                            {
                                foodTags.map((tag) => (<MenuItem key={
                                    tag.name
                                }
                                    value={
                                        tag.name
                                    }
                                    style={
                                        { fontWeight: 'normal' }
                                    }> {
                                        capitalizeFirstLetter(tag.name)
                                    } </MenuItem>))
                            } </Select>
                    </FormControl>
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
export default FoodUpsertForm;