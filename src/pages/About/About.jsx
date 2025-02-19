import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaCheckCircle, FaGlobe, FaClock,FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const About = () => {
    const stats = [
        { icon: <FaUsers />, number: "50K+", label: "Active Users" },
        { icon: <FaCheckCircle />, number: "1M+", label: "Tasks Completed" },
        { icon: <FaGlobe />, number: "150+", label: "Countries" },
        { icon: <FaClock />, number: "24/7", label: "Support" }
    ];

    const features = [
        {
            title: "Our Mission",
            description: "To provide accessible online earning opportunities worldwide through our micro-task platform, enabling anyone with internet access to generate income flexibly.",
            image: "https://img.freepik.com/free-vector/business-team-putting-together-jigsaw-puzzle-isolated-flat-vector-illustration-cartoon-partners-working-connection-teamwork-partnership-cooperation-concept_74855-9814.jpg"
        },
        {
            title: "Our Vision",
            description: "To become the world's leading platform for digital task completion, creating economic opportunities and fostering a global community of skilled online workers.",
            image: "https://img.freepik.com/free-vector/business-team-discussing-ideas-startup_74855-4380.jpg"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
            {/* Hero Section */}
            <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.5 }}
                 className="absolute top-4 left-4 z-50"
             >
                 <Link 
                     to="/" 
                     className="btn btn-accient gap-2 hover:bg-base-200/50 backdrop-blur-sm"
                 >
                     <FaArrowLeft />
                     <span>Back to Home</span>
                 </Link>
             </motion.div>
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative h-[40vh] bg-primary overflow-hidden"
            >
                <div className="absolute inset-0 bg-black/50" />
                <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-center text-white"
                    >
                        <h1 className="text-5xl font-bold mb-4">About Us</h1>
                        <p className="text-xl max-w-2xl mx-auto">Empowering individuals worldwide to earn money through simple online tasks</p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Stats Section */}
            <div className="container mx-auto px-4 -mt-16 relative z-20">
                <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white rounded-xl shadow-xl p-6 text-center"
                        >
                            <span className="text-4xl text-primary mb-4 inline-block">{stat.icon}</span>
                            <h3 className="text-3xl font-bold mb-2">{stat.number}</h3>
                            <p className="text-gray-600">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 gap-12">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden"
                        >
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                src={feature.image}
                                alt={feature.title}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-8">
                                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Values Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mt-20 text-center"
                >
                    <h2 className="text-3xl font-bold mb-12">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Trust & Transparency",
                                description: "We believe in building trust through clear communication and honest practices."
                            },
                            {
                                title: "Quality & Excellence",
                                description: "We maintain high standards in our platform and service delivery."
                            },
                            {
                                title: "Global Community",
                                description: "We foster an inclusive environment for workers worldwide."
                            }
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white p-6 rounded-xl shadow-lg"
                            >
                                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mt-20"
                >
                    <h2 className="text-3xl font-bold mb-6">Ready to Start Earning?</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join our growing community of online workers and start earning money from the comfort of your home.
                    </p>
                    <Link to="/dashboard">
                    <button className="btn btn-primary btn-lg hover:scale-105 transition-transform duration-300">
                        Get Started Now
                    </button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default About;