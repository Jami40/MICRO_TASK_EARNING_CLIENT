import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Banner.css';

const Banner = () => {
    const bannerData = [
        {
            id: 1,
            image: "https://i.ibb.co.com/fz8fHgL1/kevin-bhagat-z-NRITe8-NPq-Y-unsplash.jpg", // Replace with high-quality image showing people working on tasks
            title: "Turn Your Time Into Money",
            description: "Complete simple micro-tasks and earn rewards instantly. Join thousands of users already making money from home!",
            buttonText: "Start Earning"
        },
        {
            id: 2,
            image: "https://i.ibb.co.com/DPdz8dyp/kelly-sikkema-LM17x-Cof-KA0-unsplash.jpg", // Replace with high-quality image showing diverse tasks
            title: "Simple Tasks, Real Rewards",
            description: "From surveys to data entry - choose from hundreds of easy tasks that match your skills and schedule.",
            buttonText: "View Tasks"
        },
        {
            id: 3,
            image: "https://i.ibb.co.com/wNgvhy31/headway-5-Qg-Iuu-Bx-Kw-M-unsplash.jpg", // Replace with high-quality image showing community/success
            title: "Join Our Growing Community",
            description: "Over 10,000+ users worldwide have earned rewards. Start your earning journey today!",
            buttonText: "Register Now"
        }
    ];

    return (
        <div className="relative mt-[72px] w-full h-[600px] ">
            <Carousel
                showArrows={true}
                showStatus={false}
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={5000}
                stopOnHover={true}
                swipeable={true}
                emulateTouch={true}
                className="h-full"
            >
                {bannerData.map((slide) => (
                    <div key={slide.id} className="relative h-[600px]">
                        <img 
                            src={slide.image} 
                            alt={slide.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                                <div className="max-w-xl text-left pl-16 text-white">
                                    <h1 className="text-5xl font-bold mb-4 animate-fadeIn">
                                        {slide.title}
                                    </h1>
                                    <p className="text-lg mb-8 animate-slideUp">
                                        {slide.description}
                                    </p>
                                    <button className="btn bg-teal-500 hover:bg-teal-600 text-white border-none rounded-lg px-8 py-3 text-lg font-semibold transition-all duration-300 animate-slideUp">
                                        {slide.buttonText}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;