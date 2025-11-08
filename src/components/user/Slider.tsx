import { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";
import type { SliderDetails } from "../../utils/Models";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Slider() {
    const { sliderDetails } = useData();
    const imagesDetails: SliderDetails[] = sliderDetails.sort((a, b) => {
        const posA = a.position ?? Number.MAX_SAFE_INTEGER;
        const posB = b.position ?? Number.MAX_SAFE_INTEGER;
        return posA - posB;
    });
    const imagesNumbers = imagesDetails.length;
    const [imageIndex, setImageIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    console.log(sliderDetails)

    useEffect(() => {
        console.log(imageIndex)
        const intervalId = setInterval(() => {
            setIsFading(true);
            const timeoutId = setTimeout(() => {
                setImageIndex(prevIndex => (prevIndex + 1) % imagesNumbers);
                setIsFading(false);
            }, 300);
            return () => clearTimeout(timeoutId);
        }, 2500);
        return () => {
            clearInterval(intervalId);
        };
    }, [imageIndex])

    const onLeftArrowClick = () => {
        setImageIndex(prevIndex => (prevIndex - 1 + imagesNumbers) % imagesNumbers);
    };

    const onRightArrowClick = () => {
        setImageIndex(prevIndex => (prevIndex + 1) % imagesNumbers);
    };

    return (<div className="w-full bg-[#ececec]">   
        <div className='relative shadow-2xl'>
            <div className="flex slideX overflow-hidden">
                <div key={imageIndex}
                    className="flex-shrink-0 w-[100vw] h-[200px] md:h-[300px] overflow-hidden shadow-xl">
                    <img 
                        src={imagesDetails[imageIndex].iconUrl}
                        alt={imagesDetails[imageIndex].iconUrl}
                        className={
                            `w-full h-full object-cover absolute transition-opacity duration-200 ease-in-out ${isFading
                                ? 'opacity-0'
                                : 'opacity-100'
                            }`
                        } />
                </div>
            </div>
            <div className='absolute left-0 top-0 w-[15vw] h-full flex justify-center items-center'
                onClick={onLeftArrowClick}>
                <ArrowBackIosIcon sx={
                    {
                        '&:hover': {
                            boxShadow: 3,
                            backgroundColor: 'primary.main',
                            fontSize: "30px"
                        }
                    }
                }
                    className='text-white' />
            </div>
            <div className='absolute right-0 top-0 w-[15vw] h-full flex justify-center items-center'
                onClick={onRightArrowClick}>
                <ArrowForwardIosIcon sx={
                    {
                        '&:hover': {
                            boxShadow: 3,
                            backgroundColor: 'primary.main',
                            fontSize: "30px"
                        }
                    }
                }
                    className='text-white' />
            </div>
            <div className="absolute z-5 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse"> {
                imagesDetails.map((url,index) => (
                    <div key={url.id}
                    className={
                        `w-2 h-2 md:w-3 md:h-3 ${imageIndex == index
                            ? "bg-white"
                            : "bg-[#bbbbbb]"
                        } rounded-full`
                    }
                    aria-current="true"
                    aria-label="Slide 1"
                    data-carousel-slide-to="0"></div>))
            } </div>
        </div>
    </div>);
}
export default Slider;