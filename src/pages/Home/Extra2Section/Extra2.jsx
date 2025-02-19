import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaRocket, FaUserPlus, FaBook, FaTasks, FaMoneyBillWave } from 'react-icons/fa';

const Extra2 = () => {
    return (
        <div className='bg-base-200'>
            <div className='w-11/12 mx-auto py-20 px-4'>
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='text-center mb-16'
                >
                    <h2 className='text-4xl font-bold mb-4'>Start Earning Today</h2>
                    <div className='w-24 h-1 bg-primary mx-auto rounded-full mb-4'></div>
                    <p className='text-gray-600 max-w-2xl mx-auto'>Join our platform and start earning money by completing simple tasks. Follow these easy steps to begin your journey.</p>
                </motion.div>

                <div className='grid md:grid-cols-2 gap-8'>
                    {/* How It Works Section */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className='bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl rounded-2xl'
                    >
                        <div className='flex flex-col gap-6 p-8'>
                            <h2 className='text-3xl font-bold mb-6 flex items-center gap-3'>
                                <FaRocket className="text-4xl" />
                                How It Works
                            </h2>
                            
                            {[
                                { icon: <FaUserPlus />, text: "Take a few minutes to sign up. It's totally free!" },
                                { icon: <FaBook />, text: "Complete a quick set to learn how to do tasks" },
                                { icon: <FaTasks />, text: "Pick tasks on computer or mobile app" },
                                { icon: <FaCheckCircle />, text: "Carefully read and complete assignments" },
                                { icon: <FaMoneyBillWave />, text: "Withdraw money with Payoneer or Papara" }
                            ].map((item, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className='flex items-center gap-4 bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-all duration-300'
                                >
                                    <span className='text-xl'>{item.icon}</span>
                                    <h5 className='font-semibold'>{item.text}</h5>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Why Choose Us Section */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className='bg-gradient-to-br from-slate-600 to-slate-700 text-white shadow-xl rounded-2xl'
                    >
                        <div className='flex flex-col gap-6 p-8'>
                            <h2 className='text-3xl font-bold mb-6 flex items-center gap-3'>
                                <FaCheckCircle className="text-4xl" />
                                Why Choose Us
                            </h2>

                            {[
                                "Opportunity: Open to anyone, no special skills needed",
                                "Flexibility: Pick the tasks you like and monetize your free time",
                                "Motivation: Develop your skills and unlock new rewards",
                                "Support: Our team is here to guide you at every step",
                                "Easy Withdrawals: Get paid via Payoneer or Papara"
                            ].map((text, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className='flex items-center gap-4 bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-all duration-300'
                                >
                                    <FaCheckCircle className="text-xl text-green-400" />
                                    <h5 className='font-semibold'>{text}</h5>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Extra2;