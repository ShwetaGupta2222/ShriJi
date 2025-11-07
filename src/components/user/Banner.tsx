interface BannerProps {
    bannerText: string
}
const customStyles = ` 
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap');
 @keyframes marquee {
     0% {
         transform: translateX(0%);
    }
     100% {
         transform: translateX(-50%);
    }
}
 .marquee-container {
     width: 200%;
     display: flex;
     animation: marquee 11s linear infinite;
}
 @keyframes shimmer {
     0% {
         background-position: -200% 0;
    }
     100% {
         background-position: 200% 0;
    }
}
 .shine-text {
     font-family: 'Inter', sans-serif;
     font-size: 0.8rem;
     font-weight: 900;
     text-transform: uppercase;
     letter-spacing: 0.1em;
    /* Aesthetic gradient for the shine effect (Soft White to Warm Amber) */
     background: linear-gradient( 90deg,  #f0f9ff 0%,  #fcd34d 25%,  #f0f9ff 50%,  #fcd34d 75%,  #f0f9ff 100% );
     background-size: 200% 100%;
     -webkit-background-clip: text;
    /* Clips the background to the text shape */
     background-clip: text;
     color: transparent;
     animation: shimmer 6s ease-in-out infinite;
}
 `;

const Banner: React.FC<BannerProps> = ({ bannerText }) => {
    return (<div className="min-h-fit flex items-center justify-center bg-gray-50">
        <style dangerouslySetInnerHTML={{ __html: customStyles }} />
        <div className="w-full max-w-6xl">
            <div className="bg-gradient-to-r from-[#000000] to-[#ffcded] shadow-2xl p-3 overflow-hidden border-1 border-white/80 transition-all duration-300 hover:shadow-purple-500/50">
                <div className="h-1 flex items-center relative">
                    <div className="marquee-container whitespace-nowrap">
                        <div className="w-1/2 flex justify-start items-center px-8">
                            <span className="shine-text"> {bannerText}
                                &nbsp;&nbsp;&nbsp;
                            </span>
                        </div>
                        <div className="w-1/2 flex justify-start items-center px-8">
                            <span className="shine-text"> {bannerText}
                                &nbsp;&nbsp;&nbsp;
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default Banner;