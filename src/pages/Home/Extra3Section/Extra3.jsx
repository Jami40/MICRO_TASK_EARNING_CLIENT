import React from 'react';
import { motion } from 'framer-motion';
import { FaQuestionCircle, FaLightbulb } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Extra3 = () => {
    const faqData = [
        {
            question: "What are micro tasks and how do they work?",
            answer: "Micro tasks are small, quick online jobs that can be completed in minutes. These can include data entry, image tagging, surveys, or short transcriptions. You can pick tasks that match your skills and complete them at your own pace.",
            icon: "💼"
        },
        {
            question: "How much can I earn from micro tasks?",
            answer: "Earnings vary based on task complexity and your efficiency. Most tasks pay between $0.10 to $5. Dedicated workers typically earn $200-$500 monthly, working part-time. The more tasks you complete accurately, the more you can earn.",
            icon: "💰"
        },
        {
            question: "How do I get paid for completed tasks?",
            answer: "Payments are processed through secure payment methods like PayPal, bank transfer, or digital wallets. Once you reach the minimum payout threshold ($10), you can request a withdrawal. Payments are typically processed within 3-5 business days.",
            icon: "🏦"
        },
        {
            question: "What skills do I need for micro tasks?",
            answer: "Most micro tasks require basic computer skills and attention to detail. Some specialized tasks might need specific skills like data entry, translation, or content writing. We provide training resources to help you improve your task completion abilities.",
            icon: "🎯"
        },
        {
            question: "How is task quality maintained?",
            answer: "We use a rating system to track task completion quality. Higher ratings give you access to better-paying tasks. Random quality checks are performed, and consistent high-quality work is rewarded with bonuses and priority access to premium tasks.",
            icon: "⭐"
        },
        {
            question: "Can I work on tasks from anywhere?",
            answer: "Yes, you can work on tasks from anywhere with an internet connection. Our platform is accessible 24/7, allowing you to work according to your schedule. Some tasks might have country-specific requirements, which will be clearly indicated.",
            icon: "🌍"
        }
    ];

    return (
        <section className="py-20 bg-base-200">
            <div className="container mx-auto px-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <FaQuestionCircle className="text-4xl text-primary" />
                        <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
                    </div>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-4"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Find answers to common questions about our micro-task platform
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid gap-4">
                        {faqData.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="collapse collapse-plus bg-base-100 shadow-lg rounded-xl hover:shadow-xl transition-all duration-300"
                            >
                                <input type="radio" name="my-accordion-4" defaultChecked={index === 0} /> 
                                <div className="collapse-title text-xl font-medium p-6 flex items-center gap-3">
                                    <span className="text-2xl">{faq.icon}</span>
                                    {faq.question}
                                </div>
                                <motion.div 
                                    className="collapse-content p-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="flex gap-4 items-start">
                                        <div className="flex-shrink-0">
                                            <FaLightbulb className="text-primary text-xl mt-1" />
                                        </div>
                                        <p className="text-gray-600 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <Link to='/about'><button className="btn btn-primary btn-lg hover:scale-105 transition-transform duration-300">
                        Know More About Us
                    </button></Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Extra3;