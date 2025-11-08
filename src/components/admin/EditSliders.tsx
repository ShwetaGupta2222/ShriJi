
import { type EmptyProps, type SliderDetails } from "../../utils/Models";
import { useData } from "../../context/DataContext";
import { GenericSortableList } from "../DragUsage/SortableList";

interface SliderCardProps {
    item: SliderDetails;
};

const SliderCard: React.FC<SliderCardProps> = ({ item }) => {
    return (
        <div className="p-4 bg-purple-50 rounded-lg">
            <img
                src={item.iconUrl}
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

export const EditSliders: React.FC<EmptyProps> = ({ }) => {
    const { sliderDetails, setSliderDetails } = useData();

    return (
        <div>
            {/* <div className={
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
            </div> */}
            <div className="bg-black p-10 flex flex-col md:flex-row gap-8">
                <GenericSortableList items={sliderDetails} setItems={setSliderDetails} Comp={SliderCard} listTitle="" />
            </div>
        </div>
    );
};  