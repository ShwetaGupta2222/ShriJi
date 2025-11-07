import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/user/CartContext";
import type { EmptyProps } from "../../utils/Models";
import ExitToApp from '@mui/icons-material/ExitToApp'

const ActionButtons: React.FC<EmptyProps> = ({ }) => {
    const { showActionButtons, cartSlideOut, clearCart, setShowCartPage } = useCart();
    let navigate = useNavigate();
    return (<div className={
        `fixed w-full bottom-0 py-2 pb-10 h-fit z-6 ${cartSlideOut
            ? "show-bottom"
            : "hide-bottom"
        } ${showActionButtons
            ? "visible"
            : "hidden"
        }`
    }>
        <div className="flex gap-1">
            <div className="flex-1 flex justify-center items-center p-4 font-semibold bg-black/50 text-white border-1 rounded-2xl"
                onClick={clearCart}> {
                    "Reset Cart".toUpperCase()
                }</div>
            <div className="flex-1 flex justify-center items-center p-4 font-semibold bg-[#fe6611] border-1 rounded-2xl text-white"
                onClick={
                    () => {
                        setShowCartPage(true);
                        navigate("/cart");
                    }
                }> {
                    "Go To Cart".toUpperCase()
                }
                &nbsp;
                <ExitToApp /></div>
        </div>
    </div>);
};
export default ActionButtons;