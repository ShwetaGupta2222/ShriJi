// import { useState } from "react";
// import { OrderType, useOrder } from "../context/userContext/OrderContext";
// import { Button } from "@mui/material";
// import { ArrowForward } from "@mui/icons-material";
// import { getEnumKeyFromValue } from "../utils/modules";

import { Button } from "@mui/material";
import { useOrder } from "../../context/user/OrderContext";
import { OrderType } from "../../utils/Models";

interface OrderTypeSelectionProps { }
const OrderTypeSelection: React.FC<OrderTypeSelectionProps> = () => {
    const { orderType, setOrderType } = useOrder();
    return (<div className="w-full h-[20px] flex justify-center items-center">
        <div className="mx-4 my-8 w-full h-auto bg-[#358144] flex justify-between rounded-2xl z-3 transform translate-y-[-14%]"> {
            Object.entries(OrderType).map((val, index) => {
                const isSelected = orderType === val[0]
                return (<div key={index} className="text-white flex-1">
                    <Button variant="contained" color="info" fullWidth
                        endIcon={<></>}
                        onClick={() => { setOrderType(val[0] || "ONLINE_ORDER") }}
                        sx={
                            {
                                width: "100%",
                                height: "100%",
                                fontWeight: 'bold',
                                outline: "none",
                                fontSize: "11px",
                                paddingX: "5px",
                                paddingY: "8px",
                                transition: 'all 0.2s ease-in-out',
                                backgroundColor: isSelected
                                    ? " #eeeeee"
                                    : "#358144",
                                color: isSelected
                                    ? "#666666"
                                    : " #ffffff",
                                boxShadow: isSelected
                                    ? '0px 2px 5px rgba(0, 0, 0, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.8)'
                                    : '0px 8px 15px rgba(255, 87, 34, 0.4), inset 0 3px 5px rgba(255, 255, 255, 0.8), inset 0 -1px 2px rgba(0, 0, 0, 0.2)',
                                '&:hover': {
                                    outline: "none",
                                    backgroundColor: isSelected
                                        ? " #dddddd"
                                        : " #4caf50",
                                    boxShadow: isSelected
                                        ? '0px 4px 8px rgba(0, 0, 0, 0.15), inset 0 4px 8px rgba(255, 255, 255, 0.9)'
                                        : '0px 10px 20px rgba(255, 87, 34, 0.6), inset 0 5px 8px rgba(255, 255, 255, 1), inset 0 -2px 3px rgba(0, 0, 0, 0.3)',
                                    transform: 'translateY(-2px)'
                                }
                                ,
                                '&:focus'
                                    :
                                    { outline: "none", boxShadow: isSelected ? '0px 2px 5px rgba(0, 0, 0, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.8)' : '0px 8px 15px rgba(255, 87, 34, 0.4), inset 0 3px 5px rgba(255, 255, 255, 0.8), inset 0 -1px 2px rgba(0, 0, 0, 0.2)', }
                                ,
                                '&:active'
                                    :
                                    { outline: "none", boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.2), inset 0 1px 3px rgba(0, 0, 0, 0.4)', transform: 'translateY(0)', }
                            }}>
                        {val[1]}
                    </Button> </div>)
            })}
        </div>
    </div >
    );
};
export default OrderTypeSelection;