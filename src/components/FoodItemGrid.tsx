import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Typography } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import type { EmptyProps, FoodItem } from '../utils/Models';
import { useData } from '../context/DataContext';
import { useAdminData } from '../context/admin/AdminContext';
import { useSingleEditData } from '../context/admin/SingleEditContext';
import { useFoodGridData } from '../context/FoodGridContext';
import { useGroupEditData } from '../context/admin/GroupEditContext';
import { useCart } from '../context/user/CartContext';
import { checkAvailability, formatTime12Hour, getFoodTagByName } from '../utils/Functions';
import { DEFAULT_FOOD_ITEM_IMG } from '../utils/Constants';
import DisableBox from './DisableBox';
import { DeleteOutlineOutlined, EditOutlined } from '@mui/icons-material';
import { GenericSortableList } from './DragUsage/SortableList';

interface FoodItemCardProps {
    item: FoodItem;
}

export const FoodItemCard: React.FC<FoodItemCardProps> = ({ item }) => {
    const { tags } = useData();
    const { onShowDetailClicked } = useFoodGridData()
    const tagDetails = item.tag ? getFoodTagByName(item.tag, tags) : null

    const formattedAvailableFrom = formatTime12Hour(item.availableFrom);
    const formattedAvailableTo = formatTime12Hour(item.availableTo);
    const is24HourAvailable = item.availableFrom === "00:00" && item.availableTo === "23:59";
    const displayAvailabilityTime = is24HourAvailable ? "24/7" : `${formattedAvailableFrom} - ${formattedAvailableTo}`;
    const availabilityByTime = checkAvailability(item.availableFrom, item.availableTo);

    const { isAdmin } = useAdminData();
    const { onEditClicked, onDeleteClicked, onDisableClicked } = useSingleEditData();
    const { showCheckbox, selectFoodItem, unselectFoodItem, isIdSelected } = useGroupEditData();
    const isSelected = isIdSelected(item.id);
    const handleToggle = () => { if (isSelected) unselectFoodItem(item.id); else selectFoodItem(item.id); };

    const [isLiked, setIsLiked] = useState<boolean>(false);
    const { addItemToCart, removeItemFromCart, cartQuantityOfItem } = useCart();
    const currentCartQuantity = cartQuantityOfItem(item.id)
    const isMinQuantity = currentCartQuantity === 0;
    const isMaxQuantity = currentCartQuantity === 5;

    return (
        <div className={`relative rounded-lg bg-white overflow-hidden transition duration-300 ease-in-out`}>
            <div className="relative h-[9.5rem] md:h-[12.25rem] w-full overflow-hidden">
                {item.imgUrl
                    ? <img onClick={() => { onShowDetailClicked(item) }}
                        src={item?.imgUrl}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            if (e.currentTarget.src !== DEFAULT_FOOD_ITEM_IMG) {
                                e.currentTarget.src = DEFAULT_FOOD_ITEM_IMG;
                            }
                        }
                        } />
                    : <img onClick={() => { onShowDetailClicked(item) }}
                        src={DEFAULT_FOOD_ITEM_IMG}
                        alt="default" />}

                {tagDetails &&
                    <Box sx={{ backgroundColor: tagDetails.bgColor ? tagDetails.bgColor : "#000000" }}
                        className={`absolute text-white font-semibold top-2 left-2 p-1 px-2.5 ${tagDetails.bgColor ? `bg-[${tagDetails.bgColor}]` : "bg-black"} rounded-sm shadow-md cursor-pointer md:text-sm text-[11px]`}>
                        <div>{tagDetails?.name.toUpperCase()}</div>
                    </Box>}
            </div>

            <div className="px-2 pt-2 md:pt-3 border-1 border-gray-100 min-h-[90px] md:min-h-[130px] flex flex-col justify-between">
                <div onClick={() => { onShowDetailClicked(item) }}>
                    <h3 className="text-[13px] md:text-[16px] md:text-[1.1rem] font-semibold text-gray-700 leading-snug">
                        {item.name}
                    </h3>
                    <p className="text-gray-500 text-[8px] md:text-xs overflow-hidden leading-normal"
                        style={
                            {
                                display: '-webkit-box',
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }
                        }>
                        {item.description}
                    </p>

                    {item.available && <p className="text-gray-500 text-[10px] md:text-xs overflow-hidden leading-normal">
                        <AccessTimeIcon fontSize='inherit' /> &nbsp; {displayAvailabilityTime}
                    </p>}
                </div>

                <div className="flex justify-between items-center py-2">
                    <span className="text-[13px] md:text-xl font-extrabold text-gray-500">
                        ₹{item.price}
                    </span>


                    {!item.available && <DisableBox onDialogBoxClick={() => { onShowDetailClicked(item) }} msg={"OUt of Stock"} />}
                    {!availabilityByTime && item.available && <DisableBox onDialogBoxClick={() => onShowDetailClicked(item)} msg={<>Available between <br />{displayAvailabilityTime}</>} />}

                    {!isAdmin && item.available && <div className="flex items-center justify-end w-full">
                        <div className="flex items-center border-1 border-gray-300 overflow-hidden">
                            <div onClick={() => { removeItemFromCart(item.id) }}
                                className={`font-light transition duration-150 px-1.5 py-0.2 
                                    ${isMinQuantity
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400'
                                    }`}>
                                -
                            </div>
                            <span className="flex items-center justify-center text-[12px] font-bold text-gray-900 bg-white px-1.5 py-0.2">
                                {currentCartQuantity == 0 ? "-" : currentCartQuantity}
                            </span>

                            <div onClick={() => { if (!isMaxQuantity) addItemToCart(item.id) }}
                                className={`font-light transition duration-150 px-1.5 py-0.2 
                                    ${isMaxQuantity
                                        ? 'bg-red-50 text-red-400 cursor-not-allowed'
                                        : 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700'
                                    }`}>
                                +
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>

            {/* checkbox */}
            <div className="absolute top-2 z-4 bg-white right-2 p-1 rounded-full shadow-md cursor-pointer">
                {isAdmin
                    ? (item.available
                        ? <VisibilityIcon onClick={() => { onDisableClicked(item) }} sx={{ fontSize: 20 }} />
                        : <VisibilityOffIcon onClick={() => { onDisableClicked(item) }} sx={{ fontSize: 20 }} />)
                    : (isLiked
                        ? <FavoriteIcon onClick={() => { setIsLiked(!isLiked) }} sx={{ color: '#E91E63', fontSize: 20 }} />
                        : <FavoriteBorderIcon onClick={() => { setIsLiked(!isLiked) }} sx={{ color: '#E91E63', fontSize: 20 }} />
                    )}
            </div>

            {isAdmin && <div className='absolute flex bottom-3 right-2 gap-2 z-5'>
                <div className="top-2 h-[25px] w-[25px] bg-[#3182d1] right-2 p-1 rounded-full shadow-md cursor-pointer flex items-center justify-center">
                    <EditOutlined onClick={() => { onEditClicked(item) }} sx={{ objectFit: "contain", color: '#ffffff', fontSize: 16 }} />
                </div>
                <div className="top-2 h-[25px] w-[25px] bg-[#de3a35] right-2 p-1 rounded-full shadow-md cursor-pointer flex items-center justify-center">
                    <DeleteOutlineOutlined onClick={() => { onDeleteClicked(item) }} sx={{ objectFit: "contain", color: '#ffffff', fontSize: 16 }} />
                </div>
            </div>}

            {isAdmin && showCheckbox &&
                <Box onClick={handleToggle} className="absolute inset-0 w-full h-full flex items-center justify-center bg-white/50">
                    <div onClick={handleToggle} className='h-fit w-fit absolute z-6 p-2 left-0 top-0'>
                        <input type="checkbox"
                            checked={isSelected}
                            onChange={handleToggle}
                            className={`h-5 w-5 form-checkbox rounded focus:ring-teal-500`} />
                    </div>
                </Box>
            }


        </div>
    );
};

const FoodItemGrid: React.FC<EmptyProps> = ({ }) => {
    const { allFoodItems, foodItems, setFoodItems, overallNoData } = useData();
    const { activeCategory } = useFoodGridData();
    const { reorderEnable } = useGroupEditData();

    useEffect(() => {
        const newArray: FoodItem[] = [];
        allFoodItems.forEach(item => {
            if (item.category === activeCategory) {
                newArray.push(item);
            }
        });
        setFoodItems(newArray);
        console.log(activeCategory, newArray, allFoodItems)
    }, [activeCategory, allFoodItems]);

    const foodItemsData: FoodItem[] = foodItems.sort((a, b) => {
        if (a.available !== b.available) {
            if (a.available && !b.available)
                return -1;

            if (!a.available && b.available)
                return 1;

        }
        const posA = a.position ?? Number.MAX_SAFE_INTEGER;
        const posB = b.position ?? Number.MAX_SAFE_INTEGER;
        return posA - posB;
    });

    const noData: boolean = overallNoData()
    return (
        <div className="p-8 min-h-screen bg-[#ececec]">
            {!noData && foodItems.length === 0 &&
                <div className='w-full  h-full flex items-center justify-center animate-dialog-in'>
                    <Typography variant="body1" align="center" color="text.secondary"> No Item for this category. </Typography>
                </div>
            }
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
                {reorderEnable
                    ? <GenericSortableList items={foodItems} setItems={setFoodItems} Comp={FoodItemCard} listTitle="" />
                    : (
                        foodItemsData.map(item =>
                            <FoodItemCard
                                key={item.id}
                                item={item}
                            />
                        )
                    )
                }
            </div>
        </div>
    );
};
export default FoodItemGrid;