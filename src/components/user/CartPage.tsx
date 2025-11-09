import { useNavigate } from "react-router-dom";
import { useAdminData } from "../../context/admin/AdminContext";
import { useData } from "../../context/DataContext";
import { useCart } from "../../context/user/CartContext";
import { useOrder } from "../../context/user/OrderContext";
import type { EmptyProps } from "../../utils/Models";
import { useEffect } from "react";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { DEFAULT_FOOD_ITEM_IMG, DELIVERY_CHARGE, PLATFORM_FEE } from "../../utils/Constants";
import { ArrowForward } from "@mui/icons-material";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos"

const CartPage: React.FC<EmptyProps> = ({ }) => {
    const { isAdmin } = useAdminData();
    const {
        cartFoodItems,
        addItemToCart,
        removeItemFromCart,
        subTotal,
        showCartPage
    } = useCart();
    const { foodItemsMap } = useData()
    const { orderType } = useOrder();
    let navigate = useNavigate();

    useEffect(() => {
        if (isAdmin || (!showCartPage)) {
            navigate('/');
        }
    }, [showCartPage])

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            minHeight: 'calc(100vh - 60px)',
            bgcolor: 'rgb(245, 245, 245)',
            py: 4,
            pb: 5,
            boxSizing: "border-box"
        }}
            className="animate-dialog-in">
            <Paper elevation={3}
                sx={{
                    width: {
                        xs: '95%',
                        sm: '80%',
                        md: '500px'
                    },
                    maxWidth: '500px',
                    borderRadius: '16px',
                    p: 1,
                    paddingY: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.05)',
                }} className="relative">
                <div onClick={() => { navigate("/") }} className="absolute cursor-pointer px-2"> <ArrowBackIos onClick={() => { navigate("/") }} /> </div>
                <Typography variant="h5" component="h1" align="center" fontWeight="bold" sx={{ mb: 2 }} >
                    Review Your Order
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: '40vh', overflowY: 'auto', pr: 1, '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-track': { background: '#f1f1f1', borderRadius: '10px' }, '&::-webkit-scrollbar-thumb': { background: '#888', borderRadius: '10px' }, '&::-webkit-scrollbar-thumb:hover': { background: '#555' }, }} >
                    {cartFoodItems.size === 0
                        ? (<Typography variant="body1" align="center" color="text.secondary"> Your cart is empty. </Typography>)
                        : (Array.from(cartFoodItems.entries()).map(([itemId, currentCartQuantity]) => {
                            const itemDetail = foodItemsMap.get(itemId);
                            const isMinQuantity = currentCartQuantity === 0;
                            const isMaxQuantity = currentCartQuantity === 5;
                            if (!itemDetail) return;
                            return (
                                <Paper key={itemId} elevation={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1, borderRadius: '12px', bgcolor: 'background.paper', boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.03)', }} >
                                    <div className="flex items-center">

                                        <div className="w-[60px] h-[60px] rounded-[8px] border-1 border-gray-200"> {itemDetail.imgUrl ?
                                            <img src={itemDetail?.imgUrl} className="w-full h-full object-cover rounded-[8px]" onError={(e) => { if (e.currentTarget.src !== DEFAULT_FOOD_ITEM_IMG) { e.currentTarget.src = DEFAULT_FOOD_ITEM_IMG; } }} /> :
                                            <img src={DEFAULT_FOOD_ITEM_IMG} alt="default" />}
                                        </div>
                                        <div className="flex flex-col items-start justify-center">
                                            <p className="ml-2"> {itemDetail.name}
                                            </p>
                                            <p className="ml-2 text-sm font-semibold"> ₹{itemDetail.price}/Item
                                            </p>

                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: "15px" }}> ₹{(itemDetail.price * currentCartQuantity).toFixed(0)}
                                        </Typography>
                                        <div className="flex items-center border-1 border-gray-300 overflow-hidden">
                                            <div onClick={() => { removeItemFromCart(itemDetail.id) }} className={`font-light transition duration-150 px-1.5 py-0.2 ${isMinQuantity ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400'}`} >
                                                -
                                            </div>
                                            <span className="flex items-center justify-center text-[12px] font-bold text-gray-900 bg-white px-1.5 py-0.2">
                                                {currentCartQuantity == 0 ? "-" : currentCartQuantity}
                                            </span>
                                            <div onClick={() => { if (!isMaxQuantity) addItemToCart(itemDetail.id) }} className={`font-light transition duration-150 px-1.5 py-0.2 ${isMaxQuantity ? 'bg-red-50 text-red-400 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700'}`} >
                                                +
                                            </div>
                                        </div>
                                    </div>
                                </Paper>)
                        }))}
                </Box>
                <Divider sx={{ my: 2 }} />
                <div className="absolute bottom-0 left-0 right-0 p-3 rounded-2xl bg-white flex flex-col gap-1.5">
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" color="text.secondary"> Subtotal
                        </Typography>
                        <Typography variant="h6" fontWeight="medium"> ₹{subTotal}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body1" color="text.secondary"> Delivery Charge
                        </Typography>
                        <Typography variant="body1" fontWeight="medium"> ₹{DELIVERY_CHARGE.toFixed(0)}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body1" color="text.secondary"> Platform Fee
                        </Typography>
                        <Typography variant="body1" fontWeight="medium"> ₹{PLATFORM_FEE.toFixed(0)}
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" fontWeight="bold"> Grand
                            Total
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" color="primary"> ₹{(subTotal + DELIVERY_CHARGE + PLATFORM_FEE).toFixed(0)}
                        </Typography>
                    </Box>
                    <Button variant="contained" color="success" fullWidth size="large" endIcon={<ArrowForward />} onClick={() => { }} disabled={cartFoodItems.size === 0} sx={{ mt: 3, py: 1.5, borderRadius: '12px', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0px 8px 15px rgba(255, 87, 34, 0.3)', }} >
                        {orderType === "DINING" && "Place Table Order"}
                        {orderType === "ONLINE_ORDER" && "Proceed to Payment"}
                        {orderType === "TAKE_AWAY" && "Confirm Pickup"}
                    </Button>
                </div>
            </Paper>
        </Box >

    )
}

export default CartPage;