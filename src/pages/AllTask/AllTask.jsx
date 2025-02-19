import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaClock, FaDollarSign, FaUserClock, FaSortAmountDown, FaSortAmountUp, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AllTask = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('none');

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
            const priceA = a?.reward || 0;
            const priceB = b?.reward || 0;
            return order === 'asc' ? priceA - priceB : priceB - priceA;
        });
        setTasks(sortedTasks);
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
            <div className="container mx-auto px-4 py-6">
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
                                        alt={task?.
                                            task_title}
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
                                            onClick={() => {/* Handle view details */}}
                                        >
                                            <FaInfoCircle />
                                            View Details
                                        </button>
                                    </motion.div>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold">{task?.task_title}</h3>
                                        <span className={`badge ${
                                            task?.difficulty === 'easy' ? 'badge-success' : 
                                            task?.difficulty === 'medium' ? 'badge-warning' : 
                                            'badge-error'
                                        }`}>
                                            {task?.difficulty || 'N/A'}
                                        </span>
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <FaClock />
                                            <span>{task?.estimatedTime || 'N/A'} mins</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <FaDollarSign />
                                            <span>{task?.reward || 0} coins</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <FaUserClock />
                                            <span>{task?.deadline || 'No deadline'}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllTask;
//     }, []);

//     const fetchTasks = async () => {
//         try {
//             const response = await fetch('https://micro-task-earning-server.vercel.app/task');
//             if (!response.ok) {
//                 throw new Error('Failed to fetch tasks');
//             }
//             const data = await response.json();
//             setTasks(data);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching tasks:', error);
//             setLoading(false);
//         }
//     };

//     const sortTasks = (order) => {
//         setSortOrder(order);
//         const sortedTasks = [...tasks].sort((a, b) => {
//             const priceA = a?.reward || 0;
//             const priceB = b?.reward || 0;
//             return order === 'asc' ? priceA - priceB : priceB - priceA;
//         });
//         setTasks(sortedTasks);
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 pb-20">
//             {/* Back to Home Button */}
//             <motion.div 
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="fixed top-4 left-4 z-50"
//             >
//                 <Link 
//                     to="/" 
//                     className="btn btn-ghost gap-2 hover:bg-base-200/50 backdrop-blur-sm"
//                 >
//                     <FaArrowLeft />
//                     <span>Back to Home</span>
//                 </Link>
//             </motion.div>

//             {/* Header Section */}
//             <motion.div 
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-primary text-white py-16 px-4"
//             >
//                 <div className="container mx-auto text-center">
//                     <h1 className="text-4xl font-bold mb-4">Available Tasks</h1>
//                     <p className="text-lg opacity-90">Find and complete tasks to earn rewards</p>
//                 </div>
//             </motion.div>

//             {/* Sort Buttons */}
//             <div className="container mx-auto px-4 py-6">
//                 <motion.div 
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="flex justify-end gap-4 mb-6"
//                 >
//                     <button 
//                         onClick={() => sortTasks('asc')}
//                         className={`btn btn-outline gap-2 ${sortOrder === 'asc' ? 'btn-primary' : ''}`}
//                     >
//                         <FaSortAmountUp />
//                         Price Low to High
//                     </button>
//                     <button 
//                         onClick={() => sortTasks('desc')}
//                         className={`btn btn-outline gap-2 ${sortOrder === 'desc' ? 'btn-primary' : ''}`}
//                     >
//                         <FaSortAmountDown />
//                         Price High to Low
//                     </button>
//                 </motion.div>

//                 {/* Tasks Grid */}
//                 {loading ? (
//                     <div className="text-center py-20">
//                         <div className="loading loading-spinner loading-lg text-primary"></div>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {tasks?.map((task, index) => (
//                             <motion.div
//                                 key={task?._id || index}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: index * 0.1 }}
//                                 className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
//                             >
//                                 <div className="relative overflow-hidden rounded-t-xl">
//                                     {/* Task Image */}
//                                     <img 
//                                         src={task?.task_image_url || 'https://placehold.co/600x400'} 
//                                         alt={task?.task_title}
//                                         className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
//                                     />
                                    
//                                     {/* Overlay on Hover */}
//                                     <motion.div 
//                                         className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                                         initial={{ opacity: 0 }}
//                                         whileHover={{ opacity: 1 }}
//                                     >
//                                         <button 
//                                             className="btn btn-primary btn-lg gap-2"
//                                             onClick={() => {/* Handle view details */}}
//                                         >
//                                             <FaInfoCircle />
//                                             View Details
//                                         </button>
//                                     </motion.div>
//                                 </div>

//                                 <div className="p-6">
//                                     <div className="flex justify-between items-start mb-4">
//                                         <h3 className="text-xl font-bold">{task?.task_title}</h3>
//                                         <span className={`badge ${
//                                             task?.difficulty === 'easy' ? 'badge-success' : 
//                                             task?.difficulty === 'medium' ? 'badge-warning' : 
//                                             'badge-error'
//                                         }`}>
//                                             {task?.difficulty || 'N/A'}
//                                         </span>
//                                     </div>
                                    
//                                     <div className="flex flex-wrap gap-4">
//                                         <div className="flex items-center gap-2 text-gray-600">
//                                             <FaClock />
//                                             <span>{task?.estimatedTime || 'N/A'} mins</span>
//                                         </div>
//                                         <div className="flex items-center gap-2 text-gray-600">
//                                             <FaDollarSign />
//                                             <span>{task?.reward || 0} coins</span>
//                                         </div>
//                                         <div className="flex items-center gap-2 text-gray-600">
//                                             <FaUserClock />
//                                             <span>{task?.deadline || 'No deadline'}</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AllTask;