import React from 'react';
import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaLaptop, FaHome, FaClock } from 'react-icons/fa';
import './Extra1.css';

const Extra1 = () => {
    const features = [
        {
            icon: <FaMoneyBillWave className="text-3xl text-primary" />,
            title: "Earn Extra Cash",
            description: "Complete simple tasks and get paid instantly"
        },
        {
            icon: <FaLaptop className="text-3xl text-primary" />,
            title: "Work Online",
            description: "All you need is a computer or smartphone"
        },
        {
            icon: <FaHome className="text-3xl text-primary" />,
            title: "Work from Home",
            description: "No commute, work from your comfort zone"
        },
        {
            icon: <FaClock className="text-3xl text-primary" />,
            title: "Flexible Hours",
            description: "Choose your own schedule, work anytime"
        }
    ];

    return (
        <div className='min-h-screen relative bg-gradient-to-b from-base-200 to-base-100'>
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-primary/5"
                        style={{
                            width: Math.random() * 100 + 50,
                            height: Math.random() * 100 + 50,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, Math.random() * 100 - 50],
                            opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            yoyo: true,
                        }}
                    />
                ))}
            </div>

            <div className='container mx-auto px-4 relative'>
                {/* Hero Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className='py-20 text-center max-w-4xl mx-auto'
                >
                    <motion.h2 
                        className='text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Turn Your Spare Time Into Extra Income
                    </motion.h2>
                    
                    <motion.p 
                        className='text-xl font-medium text-gray-600 mb-12'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Join thousands of people earning money by completing simple online tasks. 
                        Work whenever and wherever you want!
                    </motion.p>

                    {/* CTA Buttons */}
                    {/* <motion.div 
                        className='flex gap-4 justify-center mb-16'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <button className='btn btn-primary btn-lg hover:scale-105 transition-transform duration-300'>
                            Start Earning Now
                        </button>
                        <button className='btn btn-outline btn-lg hover:scale-105 transition-transform duration-300'>
                            Learn More
                        </button>
                    </motion.div> */}

                    {/* Features Grid */}
                    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                                className='bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2'
                            >
                                <div className='bg-base-200/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                                    {feature.icon}
                                </div>
                                <h3 className='text-xl font-bold mb-2'>{feature.title}</h3>
                                <p className='text-gray-600'>{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Decorative bottom wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
                    <path 
                        fill="currentColor" 
                        fillOpacity="0.1" 
                        d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    />
                </svg>
            </div>
        </div>
    );
};

export default Extra1;