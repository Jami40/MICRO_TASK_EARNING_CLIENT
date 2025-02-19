import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaClock, FaDollarSign, FaUserClock, FaSortAmountDown, FaSortAmountUp, FaInfoCircle, FaTimes, FaUsers, FaClipboardList, FaCalendarAlt, FaUser, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AllTask = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('none');
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch('https://micro-task-earning-server.vercel.app/task');
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const data = await response.json();
            setTasks(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setLoading(false);
        }
    };

    const sortTasks = (order) => {
        setSortOrder(order);
        const sortedTasks = [...tasks].sort((a, b) => {
            const priceA = a?.payable_amount || 0;
            const priceB = b?.payable_amount || 0;
            return order === 'asc' ? priceA - priceB : priceB - priceA;
        });
        setTasks(sortedTasks);
    };

    const openTaskDetails = (task) => {
        setSelectedTask(task);
    };

    const closeTaskDetails = () => {
        setSelectedTask(null);
    };

    // Task Details Modal Component
    const TaskDetailsModal = ({ task, onClose }) => {
        return (
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
                    >
                        {/* Modal Header with Image */}
                        <div className="relative h-64">
                            <img 
                                src={task?.task_image_url || 'https://placehold.co/600x400'} 
                                alt={task?.task_title}
                                className="w-full h-full object-cover"
                            />
                            <button 
                                onClick={onClose}
                                className="absolute top-4 right-4 btn btn-circle btn-sm bg-white/80 hover:bg-white"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="text-2xl font-bold">{task?.task_title}</h2>
                                <span className="badge badge-primary">
                                    {task?.required_workers} workers needed
                                </span>
                            </div>

                            {/* Task Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <FaUser className="text-primary text-xl" />
                                        <div>
                                            <p className="text-sm text-gray-600">Posted by</p>
                                            <p className="font-medium">{task?.user_name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <FaEnvelope className="text-primary text-xl" />
                                        <div>
                                            <p className="text-sm text-gray-600">Contact</p>
                                            <p className="font-medium">{task?.user_email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <FaDollarSign className="text-primary text-xl" />
                                        <div>
                                            <p className="text-sm text-gray-600">Payment</p>
                                            <p className="font-medium">{task?.payable_amount} coins</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <FaCalendarAlt className="text-primary text-xl" />
                                        <div>
                                            <p className="text-sm text-gray-600">Due Date</p>
                                            <p className="font-medium">{task?.completion_date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <FaUsers className="text-primary text-xl" />
                                        <div>
                                            <p className="text-sm text-gray-600">Required Workers</p>
                                            <p className="font-medium">{task?.required_workers}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Task Details and Submission Info */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                        <FaClipboardList className="text-primary" />
                                        Task Details
                                    </h3>
                                    <p className="text-gray-600 whitespace-pre-wrap">
                                        {task?.task_detail}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                        <FaInfoCircle className="text-primary" />
                                        Submission Information
                                    </h3>
                                    <p className="text-gray-600 whitespace-pre-wrap">
                                        {task?.submission_info}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 flex gap-4">
                                <button className="btn btn-primary flex-1">
                                    Apply for Task
                                </button>
                                <button 
                                    onClick={onClose}
                                    className="btn btn-outline"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 pb-20">
            {/* Back to Home Button */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed top-4 left-4 z-50"
            >
                <Link 
                    to="/" 
                    className="btn btn-ghost gap-2 hover:bg-base-200/50 backdrop-blur-sm"
                >
                    <FaArrowLeft />
                    <span>Back to Home</span>
                </Link>
            </motion.div>

            {/* Header Section */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-primary text-white py-16 px-4"
            >
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4">Available Tasks</h1>
                    <p className="text-lg opacity-90">Find and complete tasks to earn rewards</p>
                </div>
            </motion.div>

            {/* Sort Buttons */}
            <div className="w-11/12 mx-auto px-4 py-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-end gap-4 mb-6"
                >
                    <button 
                        onClick={() => sortTasks('asc')}
                        className={`btn btn-outline gap-2 ${sortOrder === 'asc' ? 'btn-primary' : ''}`}
                    >
                        <FaSortAmountUp />
                        Price Low to High
                    </button>
                    <button 
                        onClick={() => sortTasks('desc')}
                        className={`btn btn-outline gap-2 ${sortOrder === 'desc' ? 'btn-primary' : ''}`}
                    >
                        <FaSortAmountDown />
                        Price High to Low
                    </button>
                </motion.div>

                {/* Tasks Grid */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="loading loading-spinner loading-lg text-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tasks?.map((task, index) => (
                            <motion.div
                                key={task?._id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="relative overflow-hidden rounded-t-xl">
                                    {/* Task Image */}
                                    <img 
                                        src={task?.task_image_url|| 'https://placehold.co/600x400'} 
                                        alt={task?.task_title}
                                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    
                                    {/* Overlay on Hover */}
                                    <motion.div 
                                        className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                    >
                                        <button 
                                            className="btn btn-primary btn-lg gap-2"
                                            onClick={() => openTaskDetails(task)}
                                        >
                                            <FaInfoCircle />
                                            View Details
                                        </button>
                                    </motion.div>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold">{task?.task_title}</h3>
                                        <span className="badge badge-primary">
                                            {task?.required_workers} workers needed
                                        </span>
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <FaClock />
                                            <span>Due: {task?.completion_date}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <FaDollarSign />
                                            <span>{task?.payable_amount || 0} coins</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <FaUserClock />
                                            <span>Posted by: {task?.user_name}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
                {selectedTask && (
                    <TaskDetailsModal 
                        task={selectedTask} 
                        onClose={closeTaskDetails}
                    />
                )}
                
            </div>
        </div>
    );
};

export default AllTask;
