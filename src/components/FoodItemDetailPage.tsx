import { useNavigate, useParams } from "react-router-dom";
import { useFoodGridData } from "../context/FoodGridContext";
import type { EmptyProps } from "../utils/Models";
import { useAdminData } from "../context/admin/AdminContext";
import { useState } from "react";
import { useCart } from "../context/user/CartContext";
import { useData } from "../context/DataContext";
import { checkAvailability, formatTime12Hour, getFoodTagByName, nextAvailabilityDay } from "../utils/Functions";
import { DEFAULT_FOOD_ITEM_IMG } from "../utils/Constants";
import DisableBox from "./DisableBox";
import { Box, Button } from "@mui/material";
import { AccessTime, ArrowBackIos, ArrowForward, Favorite, FavoriteBorder, HourglassEmpty } from "@mui/icons-material";

const FoodItemDetailPage: React.FC<EmptyProps> = () => {
    const { currentItem } = useFoodGridData();
    if (!currentItem) return <></>;
    const { itemName } = useParams();
    const { isAdmin } = useAdminData();
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const { showItemDetailPage, setShowItemDetailPage, onShowDetailClicked } = useFoodGridData();
    const { addItemToCart, removeItemFromCart, cartQuantityOfItem, setShowCartPage } = useCart();
    const currentCartQuantity = cartQuantityOfItem(currentItem.id)
    const isMinQuantity = currentCartQuantity === 0;
    const isMaxQuantity = currentCartQuantity === 5;
    const { tags } = useData();
    const tagDetails = currentItem.tag ? getFoodTagByName(currentItem.tag, tags) : null
    const formattedAvailableFrom = formatTime12Hour(currentItem.availableFrom);
    const formattedAvailableTo = formatTime12Hour(currentItem.availableTo);
    const is24HourAvailable = currentItem.availableFrom === "00:00" && currentItem.availableTo === "23:59";
    const displayAvailabilityTime = is24HourAvailable ? "24/7" : `${formattedAvailableFrom} - ${formattedAvailableTo}`;
    const availabilityByTime = checkAvailability(currentItem.availableFrom, currentItem.availableTo);
    var nextAvailabilityText = "";
    if (!availabilityByTime) nextAvailabilityText = nextAvailabilityDay(currentItem.availableFrom, currentItem.availableTo)
    const navigate = useNavigate();

    console.log(currentItem)
    console.log(itemName)
    console.log(currentItem.imgUrl)
    console.log(showItemDetailPage)
    console.log(availabilityByTime)

    const handleClick = () => {
        if (currentCartQuantity === 0) {
            addItemToCart(currentItem.id);
        } else {
            setShowItemDetailPage(false);
            setShowCartPage(true);
            navigate("/cart");
        }
    }

    return (<div className="fixed top-0 z-8 w-[100vw] h-[100vh] box-border bg-black/10 backdrop-blur-sm overflow-hidden"
        onClick={() => { setShowItemDetailPage(false) }}>
        <div className="w-full h-full flex items-center justify-center z-8">
            <div className="w-[80vw] h-[70vh] bg-white rounded-2xl animate-dialog-in p-2"
                onClick={(e) => e.stopPropagation()}>
                <div className="relative h-[45%] md:h-[40%] w-full overflow-hidden">
                    <div className="absolute top-2 z-5 bg-white right-2 p-1 rounded-full shadow-md cursor-pointer"> {
                        isLiked
                            ? <Favorite onClick={
                                () => {
                                    setIsLiked(!isLiked)
                                }
                            }
                                sx={
                                    {
                                        color: '#E91E63',
                                        fontSize: 25
                                    }
                                } />
                            : <FavoriteBorder onClick={
                                () => {
                                    setIsLiked(!isLiked)
                                }
                            }
                                sx={
                                    {
                                        color: '#E91E63',
                                        fontSize: 25
                                    }
                                } />
                    } </div>
                    <div className="w-full h-full"> 
                        {currentItem.imgUrl
                            ? <img onClick={() => {onShowDetailClicked(currentItem)}}
                                src={currentItem.imgUrl }
                                className="w-full h-full object-cover rounded-t-2xl"
                                onError={
                                    (e) => {
                                        if (e.currentTarget.src !== DEFAULT_FOOD_ITEM_IMG) {
                                            e.currentTarget.src = DEFAULT_FOOD_ITEM_IMG;
                                        }
                                    }
                                } />
                            : <img onClick={() => {onShowDetailClicked(currentItem)}}
                                src={DEFAULT_FOOD_ITEM_IMG}
                                alt="default" />
                        }
                        {!currentItem.available && <DisableBox onDialogBoxClick={() => { }}
                                msg={
                                    <div
                                        className="text-red-500 text-[20px] bg-amber-50 border-1 p-2">
                                            Item Unavailable
                                    </div>
                                } />
                        }
                    </div>
                </div>
                <div className="px-2 pt-2 md:pt-3 border-b border-gray-100 min-h-[90px] md:min-h-[130px] flex flex-col justify-between gap-1.5">
                    <div onClick={
                        () => {
                            onShowDetailClicked(currentItem)
                        }
                    }
                        className="flex flex-col gap-2">
                        <h3 className="text-[18px] md:text-[16px] md:text-[1.1rem] font-semibold text-gray-700 leading-snug"> {
                            currentItem.name
                        } </h3>
                        <p className="text-gray-500 text-[13px] md:text-xs overflow-hidden"> {
                            currentItem.description
                        } </p>
                        {
                            currentItem.available
                                ? (
                                    availabilityByTime
                                        ? <p className="text-gray-500 text-[13px] md:text-xs overflow-hidden">
                                            <AccessTime fontSize='inherit' />
                                            &nbsp; {displayAvailabilityTime} </p>
                                        : <p className="text-red-600 text-[13px] md:text-xs overflow-hidden leading-normal">
                                            <AccessTime fontSize='inherit' />
                                            Next Availability:{nextAvailabilityText}
                                            at {formattedAvailableFrom} </p>
                                )
                                : <p className="text-red-600 text-[13px] md:text-xs overflow-hidden leading-normal">
                                    <HourglassEmpty fontSize='inherit' />Oops! Out of stock
                                </p>
                        } </div>
                    <div className="flex justify-between items-center py-3">
                        <span className="text-[17px] md:text-xl font-extrabold text-gray-500">
                            ₹{
                                currentItem.price
                            } </span>
                        {
                            currentItem.available && availabilityByTime && <div className="flex items-center justify-end w-full">
                                <div className="flex items-center border-2 border-gray-200 overflow-hidden rounded-sm">
                                    <div onClick={
                                        () => {
                                            if (!isAdmin)
                                                removeItemFromCart(currentItem.id)

                                        }
                                    }
                                        className={
                                            `font-light transition duration-150 px-3 py-0.5 text-[20px] ${isMinQuantity || isAdmin
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400'
                                            }`
                                        }>
                                        -
                                    </div>
                                    <span className="flex items-center justify-center text-[20px] font-bold text-gray-900 bg-white px-3 py-0.5"> {
                                        currentCartQuantity == 0
                                            ? "-"
                                            : currentCartQuantity
                                    } </span>
                                    <div onClick={
                                        () => {
                                            if (!(isMaxQuantity || isAdmin))
                                                addItemToCart(currentItem.id)

                                        }
                                    }
                                        className={
                                            `font-light transition duration-150 px-3 py-0.5 text-[20px] ${isMaxQuantity || isAdmin
                                                ? 'bg-red-50 text-red-400 cursor-not-allowed'
                                                : 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700'
                                            }`
                                        }>
                                        +
                                    </div>
                                </div>
                            </div>
                        } </div>
                    <Button variant="contained" size="large"
                        endIcon={<ArrowForward />}
                        onClick={handleClick}
                        sx={
                            {
                                mt: 1,
                                py: 1.5,
                                borderRadius: '12px',
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                                boxShadow: '0px 8px 15px rgba(255, 87, 34, 0.3)',
                                width: "100%",
                                backgroundColor: currentCartQuantity == 0
                                    ? "#000000"
                                    : "#fe6611"
                            }
                        }
                        disabled={
                            !(currentItem.available && availabilityByTime) || isAdmin
                        }> {
                            currentCartQuantity === 0
                                ? "Add to Cart"
                                : "Go to cart"
                        } </Button>
                </div>
                {/* tag */}
                {tagDetails &&
                    <Box sx={{ backgroundColor: tagDetails.bgColor ? tagDetails.bgColor : "#000000" }} className={`absolute text-white font-semibold top-2 left-2 p-1 px-2.5 ${tagDetails.bgColor ? `bg-[${tagDetails.bgColor}]` : "bg-black"} rounded-sm shadow-md cursor-pointer md:text-sm text-[11px]`}>
                        <div>{tagDetails?.name.toUpperCase()}</div>
                    </Box>}
            </div>
        </div>
        <div className="absolute top-[10vh] z-9 left-[5vw] text-white text-[25px] flex justify-center items-center" onClick={() => { setShowItemDetailPage(false) }} >
            <ArrowBackIos sx={{ fontSize: "25px" }} />
        </div>
    </div >
    );
};
export default FoodItemDetailPage;