import React from 'react';
interface BurgerProps {
    onClick: () => void;
}
const Burger: React.FC<BurgerProps> = ({ onClick }) => {
    return (<div className='top-0 right-0 flex mx-4 py-5 h-full w-[25px] md:w-[40px] md:h-[70px] md:mt-[10px] flex-col items-center justify-center gap-1.5'
        onClick={onClick}>
        <div className='w-full h-1/3 bg-black'></div>
        <div className='w-full h-1/3 bg-black'></div>
        <div className='w-full h-1/3 bg-black'></div>
    </div>);
}
export default Burger;