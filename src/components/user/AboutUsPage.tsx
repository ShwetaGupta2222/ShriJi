import React from 'react';
import { Card, CardContent, Typography, Avatar } from '@mui/material';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import PersonIcon from '@mui/icons-material/Person';

const AboutUsPage: React.FC = () => {
    const shopPhotoSrc = "/shriji-cafe-shop.jpg";
    const ownerPhotoSrc = "/shriji-cafe-owner.jpg";
    const ownerName = "Ms. Anaya Sharma";
    return (<div className="min-h-screen bg-[#ecebeb] flex flex-col items-center pb-8">
        <div className="w-full max-w-md px-4 mt-6 space-y-6">
            <Typography variant="h5" component="h1" className="pl-2 font-bold text-gray-800 text-3xl">
                About Us
            </Typography>
            <Card className="rounded-xl shadow-md p-4">
                <CardContent className="flex flex-col space-y-4 p-0">
                    <div className="flex items-center text-shrijiGreen mb-2">
                        <LocalCafeIcon className="mr-2" />
                        <Typography variant="body1" className="font-semibold text-lg text-gray-800">
                            Our Story: Where Every Sip Sparkles
                        </Typography>
                    </div>
                    <Typography variant="body1" className="text-gray-700 leading-relaxed">
                        The ShriJi Cafe began with a simple dream: to create a cozy haven where every visitor could find a moment of peace and joy. Born from a passion for exceptional coffee and delightful treats, our cafe blends traditional warmth with a modern touch. We believe in crafting not just beverages and food, but memorable experiences – one sip, one bite, one smile at a time.
                    </Typography>
                    <Typography variant="body1" className="text-gray-700 leading-relaxed">
                        From meticulously sourced beans for our rich espressos to the freshest ingredients in our desserts, quality is at the heart of everything we do. Step into ShriJi Cafe, and let us transport you to a world where comfort meets culinary excellence.
                    </Typography>
                    <div className="mt-4">
                        <img src={shopPhotoSrc}
                            alt="The ShriJi Cafe Interior"
                            className="w-full h-auto rounded-lg object-cover"
                            style={
                                { maxHeight: '250px' }
                            } />
                        <Typography variant="caption" className="text-gray-500 mt-2 block text-center">
                            Our cozy space, designed for your perfect escape.
                        </Typography>
                    </div>
                </CardContent>
            </Card>
            <Card className="rounded-xl shadow-md p-4">
                <CardContent className="flex flex-col items-center text-center space-y-4 p-0">
                    <div className="flex items-center justify-center w-full text-shrijiGreen mb-2">
                        <PersonIcon className="mr-2" />
                        <Typography variant="h6" className="font-semibold text-lg text-gray-800">
                            Meet Our Founder
                        </Typography>
                    </div>
                    <Avatar alt={ownerName}
                        src={ownerPhotoSrc}
                        sx={
                            {
                                width: 120,
                                height: 120
                            }
                        }
                        className="shadow-md" />
                    <Typography variant="h5" className="font-bold text-gray-800"> {ownerName} </Typography>
                    <Typography variant="subtitle1" className="text-shrijiGreen font-medium">
                        Visionary & Coffee Enthusiast
                    </Typography>
                    <Typography variant="body1" className="text-gray-700 leading-relaxed max-w-sm"> {ownerName}'s journey began with a deep love for the art of coffee making and a desire to share that passion with the world. With years of experience and an unwavering commitment to quality, {ownerName}
                        meticulously crafted The ShriJi Cafe to be a place where every detail contributes to a delightful experience. It's her personal touch and dedication that infuse every corner of our cafe with warmth and hospitality.
                    </Typography>
                </CardContent>
            </Card>
            <Card className="rounded-xl shadow-md p-4 text-center">
                <CardContent className="p-0">
                    <Typography variant="h6" className="font-semibold text-shrijiGreen mb-2">
                        Experience the ShriJi Difference!
                    </Typography>
                    <Typography variant="body1" className="text-gray-700 leading-relaxed">
                        We invite you to visit us and become a part of The ShriJi Cafe family. Discover your new favorite spot, where great taste meets great company.
                    </Typography>
                </CardContent>
            </Card>
        </div>
    </div>);
};
export default AboutUsPage;