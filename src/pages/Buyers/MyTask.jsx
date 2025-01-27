import React, { useState, useEffect, useContext } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';


const MyTask = () => {
    const [tasks, setTasks] = useState([]);
    const { user,findUser,setFindUser } = useContext(AuthContext);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch tasks
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/task/${findUser.email}`);
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                Swal.fire('Error', 'Failed to fetch tasks', 'error');
            }
        };
        
        if (findUser?.email) {
            fetchTasks();
        }
    }, [findUser]);

    // Handle update
    const handleDelete = async (taskId, refillAmount) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                const deletedtask=await axios.delete(`http://localhost:5000/task/${taskId}`);
                if(deletedtask.data.deletedCount){
                    const updateCoins=findUser.coins+refillAmount;
                    await axios.patch(`http://localhost:5000/user/${findUser?.email}`,{
                        coins:updateCoins
                    })
                    setFindUser({...findUser,coins:updateCoins})
                    toast.success('Coins credited succesfully!');
                }                
                // Update local state
                setTasks(tasks.filter(task => task._id !== taskId));
                
                Swal.fire('Deleted!', 'Task deleted successfully.', 'success');
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire('Error', 'Failed to delete task', 'error');
        }
    };

    // Handle update modal open
    const handleUpdateClick = (task) => {
        setSelectedTask(task);
        setIsUpdateModalOpen(true);
    };

    // Handle update submit
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        const form = e.target;
        const updatedData = {
            task_title: form.task_title.value,
            task_detail: form.task_detail.value,
            submission_info: form.submission_info.value
        };

        try {
            await axios.patch(`http://localhost:5000/task/${selectedTask._id}`, updatedData);

            // Update local state
            setTasks(tasks.map(task => 
                task._id === selectedTask._id 
                    ? {...task, ...updatedData} 
                    : task
            ));

            setIsUpdateModalOpen(false);
            Swal.fire('Updated!', 'Task updated successfully.', 'success');
        } catch (error) {
            console.error('Error:', error);
            Swal.fire('Error', 'Failed to update task', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full p-4">
            <h2 className="text-3xl font-bold text-center mb-8">My Tasks</h2>
            <div className="overflow-x-auto">
                <table className="table items-center w-full">
                    <thead>
                        <tr className="bg-base-200">
                            <th>Task Image</th>
                            <th>Task Title</th>
                            <th>Due Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task._id} className="hover">
                                <td>
                                    <div className="avatar">
                                        <div className="w-16 rounded">
                                            <img src={task.task_image_url} alt={task.task_title} />
                                        </div>
                                    </div>
                                </td>
                                <td>{task.task_title}</td>
                                <td>{new Date(task.completion_date).toLocaleDateString()}</td>
                                <td className="flex  gap-2">
                                <button
                                        onClick={() => handleUpdateClick(task)}
                                        className="btn btn-sm btn-info text-white"
                                        title="Edit Task"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(
                                            task._id,
                                            task.required_workers * task.payable_amount
                                        )}
                                        className="btn btn-sm btn-error"
                                        title="Delete Task"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {tasks.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500">No tasks found</p>
                </div>
            )}
             {isUpdateModalOpen && (
                <dialog id="update_modal" className="modal modal-bottom sm:modal-middle" open>
                    <div className="modal-box bg-white dark:bg-gray-800">
                        <h3 className="font-bold text-lg mb-4">Update Task</h3>
                        <form onSubmit={handleUpdateSubmit} className="space-y-4">
                            {/* Task Title */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Task Title</span>
                                </label>
                                <input 
                                    type="text" 
                                    name="task_title"
                                    defaultValue={selectedTask?.task_title}
                                    className="input input-bordered w-full focus:outline-none focus:border-blue-500" 
                                    required
                                />
                            </div>

                            {/* Task Detail */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Task Detail</span>
                                </label>
                                <textarea 
                                    name="task_detail"
                                    defaultValue={selectedTask?.task_detail}
                                    className="textarea textarea-bordered h-24 focus:outline-none focus:border-blue-500" 
                                    required
                                ></textarea>
                            </div>

                            {/* Submission Info */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Submission Info</span>
                                </label>
                                <textarea 
                                    name="submission_info"
                                    defaultValue={selectedTask?.submission_info}
                                    className="textarea textarea-bordered h-24 focus:outline-none focus:border-blue-500" 
                                    required
                                ></textarea>
                            </div>

                            {/* Modal Actions */}
                            <div className="modal-action">
                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="loading loading-spinner"></span>
                                    ) : (
                                        'Update Task'
                                    )}
                                </button>
                                <button 
                                    type="button"
                                    className="btn btn-ghost"
                                    onClick={() => setIsUpdateModalOpen(false)}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button 
                            onClick={() => setIsUpdateModalOpen(false)}
                            disabled={isLoading}
                        >
                            close
                        </button>
                    </form>
                </dialog>
            )}
        </div>
    );
};

export default MyTask;