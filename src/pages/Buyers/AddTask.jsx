import React, { useContext, useState } from 'react';
import useUser from '../../hooks/useUser';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FaTasks, FaCoins, FaUsers, FaCalendarAlt } from 'react-icons/fa';
import { MdDescription, MdPhotoCamera } from 'react-icons/md';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';

const AddTask = ({userss}) => {
    const {user,findUser,setFindUser}=useContext(AuthContext)
    console.log(findUser)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
       user_name: user?.displayName || '',
        user_email: user?.email || ''
    });

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image);
        
        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_API_KEY}`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            setFormData(prev => ({...prev, task_image_url: data.data.url}));
            toast.success('Image uploaded successfully!');
        } catch (error) {
            console.error('Image upload failed:', error);
            toast.error('Failed to upload image. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const totalPayableAmount = formData.required_workers * formData.payable_amount;
        
        if (totalPayableAmount > findUser?.coins) {
            Swal.fire({
                title: 'Insufficient Coins!',
                text: 'You don\'t have enough coins to create this task. Would you like to purchase more?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, purchase coins!',
                cancelButtonText: 'No, cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/purchase-coin');
                }
            });
            return;
        }

        try {
           const taskData={
                ...formData,
               user_name: user?.displayName || '',
        user_email: user?.email || ''
           }
          const taskrespons= await axios.post('http://localhost:5000/task', taskData);

          if(taskrespons.data.insertedId){
            const updateCoins=findUser.coins-totalPayableAmount;
            await axios.patch(`http://localhost:5000/user/${findUser?.email}`,{
                coins:updateCoins
            })
            setFindUser({...findUser,coins:updateCoins})
            toast.success('Coins credited succesfully!');
        }


            // After successful API call:
            Swal.fire({
                title: 'Success!',
                text: 'Your task has been created successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/dashboard'); // or wherever you want to redirect
            });
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: 'Error!',
                text: 'Failed to create task. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-8">Add Micro Task for Earning</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text flex items-center gap-2">
                            <FaTasks /> Task Title
                        </span>
                    </label>
                    <input 
                        type="text" 
                        className="input input-bordered" 
                        placeholder="Enter task title"
                        onChange={(e) => setFormData({...formData, task_title: e.target.value})}
                        required
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text flex items-center gap-2">
                            <MdDescription /> Task Detail
                        </span>
                    </label>
                    <textarea 
                        className="textarea textarea-bordered h-24" 
                        placeholder="Detailed description of the task"
                        onChange={(e) => setFormData({...formData, task_detail: e.target.value})}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text flex items-center gap-2">
                                <FaUsers /> Required Workers
                            </span>
                        </label>
                        <input 
                            type="number" 
                            className="input input-bordered" 
                            onChange={(e) => setFormData({...formData, required_workers: parseInt(e.target.value)})}
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text flex items-center gap-2">
                                <FaCoins /> Payable Amount (per worker)
                            </span>
                        </label>
                        <input 
                            type="number" 
                            className="input input-bordered" 
                            onChange={(e) => setFormData({...formData, payable_amount: parseInt(e.target.value)})}
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text flex items-center gap-2">
                                <FaCalendarAlt /> Completion Date
                            </span>
                        </label>
                        <input 
                            type="date" 
                            className="input input-bordered" 
                            onChange={(e) => setFormData({...formData, completion_date: e.target.value})}
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text flex items-center gap-2">
                                <MdPhotoCamera /> Task Image
                            </span>
                        </label>
                        <input 
                            type="file" 
                            className="file-input file-input-bordered w-full" 
                            accept="image/*"
                            onChange={handleImageUpload}
                            required
                        />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Submission Information</span>
                    </label>
                    <textarea 
                        className="textarea textarea-bordered" 
                        placeholder="What to submit (e.g., screenshot, proof)"
                        onChange={(e) => setFormData({...formData, submission_info: e.target.value})}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-full">
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default AddTask;


