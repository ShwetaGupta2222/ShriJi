
import { type EmptyProps, type SliderDetails, type SliderFormErrors } from "../../utils/Models";
import { useData } from "../../context/DataContext";
import { GenericSortableList } from "../DragUsage/SortableList";
import { Box, Button, CircularProgress, TextField, type SelectChangeEvent } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { useMenuAdminData } from "../../context/admin/MenuAdminContext";

interface SliderCardProps {
    item: SliderDetails;
};

const SliderCard: React.FC<SliderCardProps> = ({ item }) => {
    return (
        <div className="p-2 bg-purple-50 rounded-lg">
            <img
                src={item.imgUrl}
                alt="Slider Icon"
                className="w-full h-full object-contain mx-auto"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/40x40/5b21b6/ffffff?text=I";
                    target.onerror = null;
                }}
            />
            <p className="text-center mt-2 text-purple-800 font-medium">{item.name}</p>
        </div>
    );
};

const EMPTY_SLIDER_ITEM: SliderDetails = {
    id: '',
    name: '',
    imgUrl: '',
    position: 0
};

export const EditSliders: React.FC<EmptyProps> = ({ }) => {
    const { sliderDetails, setSliderDetails } = useData();
    const {updateSliderDetails} = useMenuAdminData();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<SliderDetails>(EMPTY_SLIDER_ITEM);
    const [validationErrors, setValidationErrors] = useState<SliderFormErrors>({});

    useEffect(() => { console.log(formData) }, [formData])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string> | SelectChangeEvent<string[]>) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        if (name && validationErrors[name as keyof SliderFormErrors]) {
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

    const validateCategoryForm = useCallback((data: SliderDetails): SliderFormErrors => {
        const errors: SliderFormErrors = {};
        if (data.name && !data?.name.trim()) {
            errors.name = "Slider Name is required.";
        }
        if (!data.imgUrl) {
            errors.imgUrl = "Image is required.";
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
        await updateSliderDetails(formData);
        setIsLoading(false);
        setFormData(EMPTY_SLIDER_ITEM);
    };

    return (
        <div className="w-full h-full">
            <div className="bg-black/50 w-full h-full p-10 flex flex-col md:flex-row gap-8">
                <Box className="md:pt-16 p-4 bg-white rounded-xl md:rounded-b-xl shadow-2xl w-full md:w-1/4" component="form"
                    onSubmit={handleSubmit}> {
                    }
                    <h3 className="text-xl font-bold mb-6 text-center text-gray-800">Add Slider</h3>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1 p-1 border rounded-lg bg-gray-50">
                            <input accept="image/*"
                                style={
                                    { display: 'none' }
                                }
                                id="upload-button-png"
                                type="file"
                                name="imageFilePng"
                                onChange={handleImageChange}
                                disabled={isLoading} />
                            <label htmlFor="upload-button-png">
                                {formData.imgUrl
                                ?<img src={formData.imgUrl}/>
                                :<Button variant="outlined"
                                    color={
                                        "secondary"
                                    }
                                    component="span"
                                    disabled={isLoading}
                                    startIcon={<PhotoCamera />}> {
                                        formData.imgUrl
                                            ? "Selected Image"
                                            : "Select New Slider Image"
                                    }
                                </Button>}

                            </label>
                            <br />
                        </div>
                        {
                            validationErrors.imgUrl && <p className="text-red-500 text-xs mb-2"> {validationErrors.imgUrl}</p>
                        }
                        <TextField label="Slider Name" name="name" type="text" variant="outlined" fullWidth required
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

                        <Button type="submit" variant="contained" color="primary" fullWidth
                            sx={
                                {
                                    paddingY: 1,
                                    marginTop: 1,
                                    color: "white",
                                    fontWeight: 400,
                                    backgroundColor: '#000000'
                                }
                            }
                            disabled={isLoading}> {
                                isLoading
                                    ? <CircularProgress size={30} />
                                    : `Add Image`
                            } </Button>
                    </div>
                </Box>
                <GenericSortableList items={sliderDetails} setItems={setSliderDetails} Comp={SliderCard} listTitle="" />
            </div>
        </div>
    );
};  