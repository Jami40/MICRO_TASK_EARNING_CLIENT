import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/task');
                // Filter tasks where required_worker > 0
                const availableTasks = response.data.filter(task => task.required_workers > 0);
                setTasks(availableTasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const handleViewDetails = (taskId) => {
        console.log('View details for task:', taskId);
        navigate(`/dashboard/task-details/${taskId}`);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Available Tasks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map((task) => (
                    <div key={task._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold mb-2">{task.task_title}</h3>
                        <div className="space-y-2">
                            <p><span className="font-medium">Buyer:</span> {task.user_name}</p>
                            <p><span className="font-medium">Completion Date:</span> {new Date(task.completion_date).toLocaleDateString()}</p>
                            <p><span className="font-medium">Payment:</span> ${task.payable_amount}</p>
                            <p><span className="font-medium">Workers Needed:</span> {task.required_workers}</p>
                        </div>
                        <button
                            onClick={() => handleViewDetails(task._id)}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;