import React, { useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { useNavigate } from 'react-router-dom';
import { useAdminData } from '../../context/admin/AdminContext';

const ContactUsPage: React.FC = () => {
    const phoneNumber = "+91 73807 47118";
    const instagramHandle = "@TheShriJiCafeOfficial";
    const instagramUrl = "https://lnkd.in/gwJVwaWf";
    const cafeAddress = "ShriJi Cafe, Near Khoyamandi, Tarnanganj Kalpi 285204 , District Jalaun";

    const navigate = useNavigate();
    const {isAdmin} = useAdminData();
    useEffect(()=>{
       if(isAdmin){
        navigate("/");
       }
    },[])

    return (<div className="min-h-screen bg-[#ecebeb] flex flex-col items-center pb-8 animate-dialog-in">
        <div className="w-full max-w-md px-4 mt-6 space-y-6">
            <Typography variant="h5" component="h1" className="pl-2 font-bold text-gray-800 text-3xl">
                Connect with Us
            </Typography>
            <Card className="rounded-xl shadow-md p-4">
                <CardContent className="flex flex-col space-y-4 p-0">
                    <div className="flex items-center text-shrijiGreen">
                        <HandshakeIcon className="mr-2" />
                        <Typography variant="h6" className="font-semibold text-lg text-gray-800">
                            Sip Settle, and Sparkle with ShriJi!
                        </Typography>
                    </div>
                    <div className="border-t border-gray-200 pt-4 mt-4">
                        <div className="flex items-center text-shrijiGreen mb-2">
                            <PhoneIcon className="mr-2" />
                            <Typography variant="subtitle1" className="font-semibold text-gray-800">
                                For Delicious Food & Quick Orders
                            </Typography>
                        </div>
                        <div className="flex items-center mb-2">
                            <WhatsAppIcon className="mr-1 text-green-500" />
                            <Typography variant="body1" className="text-gray-700">Call/WhatsApp Us:</Typography>
                        </div>
                        <a href={
                            `tel:${phoneNumber}`
                        }
                            className="no-underline">
                            <Typography variant="h5" className="font-bold text-shrijiGreen text-4xl leading-tight"> {phoneNumber} </Typography>
                        </a>
                        <Typography variant="body2" className="text-gray-600 mt-2">
                            Ready for a moment of bliss? Call us now to place delivery or takeaway order! Whether it's our 'Best Seller' Hazelnut Latte or a slice of heavenly cake, a quick call is all it takes to order your favorite delicious food.
                        </Typography>
                    </div>
                </CardContent>
            </Card>
            <Card className="rounded-xl shadow-md p-4">
                <CardContent className="flex flex-col space-y-4 p-0">
                    <div className="flex items-center text-shrijiGreen">
                        <InstagramIcon className="mr-2" />
                        <Typography variant="h6" className="font-semibold text-lg text-gray-800">
                            Follow Our Journey
                        </Typography>
                    </div>
                    <Typography variant="body2" className="text-gray-600">
                        Don't miss out on the sparkle! Follow us on Instagram for daily specials, new menu launches, and a peek behind the scenes. See the sparkle and join ShriJi family online! Tag us in your posts to be featured.
                    </Typography>
                    <div className="flex items-center">
                        <InstagramIcon className="mr-2 text-pink-600" />
                        <a href={instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="no-underline">
                            <Typography variant="body1" className="font-medium text-blue-600 hover:underline"> {instagramHandle} </Typography>
                        </a>
                    </div>
                </CardContent>
            </Card>
            <Card className="rounded-xl shadow-md p-4">
                <CardContent className="flex flex-col space-y-4 p-0">
                    <div className="flex items-center text-shrijiGreen">
                        <LocationOnIcon className="mr-2" />
                        <Typography variant="h6" className="font-semibold text-lg text-gray-800">
                            Find Our Cafe
                        </Typography>
                    </div>
                    <Typography variant="body1" className="text-gray-700"> {cafeAddress} </Typography>
                    <a href="https://lnkd.in/gFf5M85G" target="_blank" rel="noopener noreferrer">
                        <p className="mt-2">View on Map</p>
                    </a>
                </CardContent>
            </Card>
        </div>
    </div>);
};
export default ContactUsPage;