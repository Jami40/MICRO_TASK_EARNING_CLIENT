import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaTasks, FaUserAlt, FaCoins } from 'react-icons/fa';
import { BsCalendarDate } from 'react-icons/bs';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const ManageTask = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/admin/tasks');
            setTasks(data);
        } catch (error) {
            toast.error('Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTask = async (taskId, title) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                html: `
                    <p>You are about to delete the task:</p>
                    <p class="text-lg font-bold text-red-600">${title}</p>
                    <p class="text-sm text-gray-500 mt-2">This action cannot be undone!</p>
                `,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete!',
                cancelButtonText: 'Cancel'
            });

            if (result.isConfirmed) {
                const loadingToast = toast.loading('Deleting task...');
                
                await axios.delete(`http://localhost:5000/admin/tasks/${taskId}`);
                
                toast.dismiss(loadingToast);
                toast.success('Task deleted successfully');
                
                // Update local state
                setTasks(tasks.filter(task => task._id !== taskId));
            }
        } catch (error) {
            toast.error('Failed to delete task');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <FaTasks className="text-primary" />
                        Manage Tasks
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* Table Head */}
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Buyer</th>
                                    <th>Deadline</th>
                                    <th>Payable-Amount</th>
                                    <th>Required-Worker</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>
                                {tasks.map((task) => (
                                    <tr key={task._id}>
                                        {/* Task Title & Description */}
                                        <td>
                                            <div>
                                                <div className="font-bold">{task.task_title}</div>
                                                <div className="text-sm text-gray-500 max-w-xs truncate">
                                                    {task.task_detail}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Category */}
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img 
                                                        src={task.task_image_url || '/default-task.png'} 
                                                        alt={task.task_title}
                                                        className="object-cover"
                                                        onError={(e) => {
                                                            e.target.src = '/default-task.png';
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </td>

                                        {/* Buyer Info */}
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <FaUserAlt className="text-gray-400" />
                                                <span>{task.user_email}</span>
                                            </div>
                                        </td>

                                        {/* Deadline */}
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <BsCalendarDate className="text-gray-400" />
                                                {task.completion_date}
                                            </div>
                                        </td>

                                        {/* Price */}
                                        <td>
                                            <div className="flex items-center gap-1">
                                                <FaCoins className="text-yellow-500" />
                                                {task.payable_amount}
                                            </div>
                                        </td>

                                        {/* Status */}
                                        <td>
                                            <div className="flex items-center gap-1">
                                                <FaCoins className="text-yellow-500" />
                                                {task.required_workers}
                                            </div>
                                        </td>

                                        {/* Actions */}
                                        <td>
                                            <button
                                                onClick={() => handleDeleteTask(task._id, task.title)}
                                                className="btn btn-error btn-sm"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {tasks.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No tasks found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageTask;