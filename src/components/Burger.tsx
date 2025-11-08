import React from 'react';
interface BurgerProps {
    onClick: () => void;
}
const Burger: React.FC<BurgerProps> = ({ onClick }) => {
    return (<div className='top-0 right-0 flex mr-4 h-full w-[25px] md:w-[40px] flex-col items-center justify-center gap-1'
        onClick={onClick}>
        <div className='w-full h-1/3 bg-black'></div>
        <div className='w-full h-1/3 bg-black'></div>
        <div className='w-full h-1/3 bg-black'></div>
    </div>);
}
export default Burger;