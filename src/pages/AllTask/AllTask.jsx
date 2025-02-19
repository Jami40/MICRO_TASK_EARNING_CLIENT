import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaSearch, FaFilter, FaClock, FaDollarSign, FaUserClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AllTask = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        // Fetch tasks from your backend
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            // Replace with your actual API endpoint
            const response = await fetch('your-api-endpoint/tasks');
            const data = await response.json();
            setTasks(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setLoading(false);
        }
    };

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' ? true : task.category === filter;
        return matchesSearch && matchesFilter;
    });

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

            {/* Search and Filter Section */}
            <div className="container mx-auto px-4 -mt-8 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-xl p-6 mb-8"
                >
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Input */}
                        <div className="flex-1 relative">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                className="input input-bordered w-full pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Filter Dropdown */}
                        <select 
                            className="select select-bordered w-full md:w-48"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all">All Categories</option>
                            <option value="data-entry">Data Entry</option>
                            <option value="content">Content Writing</option>
                            <option value="survey">Surveys</option>
                            <option value="testing">Testing</option>
                        </select>
                    </div>
                </motion.div>

                {/* Tasks Grid */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="loading loading-spinner loading-lg text-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTasks.map((task, index) => (
                            <motion.div
                                key={task.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold">{task.title}</h3>
                                        <span className={`badge ${task.difficulty === 'easy' ? 'badge-success' : 
                                            task.difficulty === 'medium' ? 'badge-warning' : 'badge-error'}`}>
                                            {task.difficulty}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-4">{task.description}</p>
                                    
                                    <div className="flex flex-wrap gap-4 mb-6">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <FaClock />
                                            <span>{task.estimatedTime} mins</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <FaDollarSign />
                                            <span>{task.reward} coins</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <FaUserClock />
                                            <span>{task.deadline}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button 
                                            className="btn btn-primary flex-1"
                                            onClick={() => {/* Handle task acceptance */}}
                                        >
                                            Accept Task
                                        </button>
                                        <button 
                                            className="btn btn-outline"
                                            onClick={() => {/* Handle view details */}}
                                        >
                                            Details
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && filteredTasks.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <FaFilter className="text-4xl text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
                        <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default AllTask;