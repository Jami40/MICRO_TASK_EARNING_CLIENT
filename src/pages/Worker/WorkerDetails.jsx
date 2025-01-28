import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaCalendarAlt, FaMoneyBillWave, FaUsers } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { AuthContext } from '../../Provider/AuthProvider';
import { toast } from 'react-toastify';

const WorkerDetails = () => {
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const { id } = useParams();
    const { user,findUser } = useContext(AuthContext);
    console.log(findUser)

    const [submissionDetails, setSubmissionDetails] = useState('');

    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                const response = await axios.get(`https://micro-task-earning-server.vercel.app/singleTask/${id}`);
                setTask(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching task details:', error);
                setLoading(false);
                toast.error('Failed to load task details');
            }
        };

        fetchTaskDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const submissionData = {
            task_id: id,
            task_title: task.task_title,
            payable_amount: task.payable_amount,
            worker_email: findUser.email,
            worker_name: findUser.name,
            submission_details: submissionDetails,
            buyer_name: task.user_name,
            buyer_email: task.user_email,
            current_date: new Date().toISOString(),
            status: 'pending'
        };

        try {
            await axios.post('https://micro-task-earning-server.vercel.app/taskSubmission', submissionData);
            toast.success('Submission successful!');
            setSubmissionDetails('');
        } catch (error) {
            console.error('Submission error:', error);
            toast.error('Failed to submit');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!task) {
        return (
            <div className="container mx-auto p-4">
                <div className="alert alert-error">Task not found</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Task Details Section */}
                <div className="card bg-base-100 shadow-xl">
                    <figure className="px-4 pt-4">
                        <img 
                            src={task.task_image_url} 
                            alt={task.task_title} 
                            className="rounded-xl w-full h-48 object-cover"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-4">{task.task_title}</h2>
                        
                        <div className="space-y-4">
                            {/* Buyer Information */}
                            <div className="bg-base-200 p-4 rounded-lg">
                                <h3 className="font-bold mb-2">Client Information</h3>
                                <div className="flex items-center gap-2">
                                    <MdEmail className="text-primary" />
                                    <span>{task.user_email}</span>
                                </div>
                                <p className="font-semibold">{task.user_name}</p>
                            </div>

                            {/* Task Details */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-primary" />
                                    <span>Deadline: {new Date(task.completion_date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaMoneyBillWave className="text-primary" />
                                    <span>Payment: ${task.payable_amount}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaUsers className="text-primary" />
                                    <span>Required Workers: {task.required_workers}</span>
                                </div>
                            </div>

                            {/* Task Details */}
                            <div className="bg-base-200 p-4 rounded-lg">
                                <h3 className="font-bold mb-2">Task Details</h3>
                                <p className="whitespace-pre-line">{task.task_detail}</p>
                            </div>

                            {/* Submission Info */}
                            <div className="bg-base-200 p-4 rounded-lg">
                                <h3 className="font-bold mb-2">Submission Information</h3>
                                <p className="whitespace-pre-line">{task.submission_info}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submission Form Section */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-4">Submit Your Work</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Submission Details</span>
                                </label>
                                <textarea 
                                    className="textarea textarea-bordered h-48"
                                    placeholder="Provide details about your work..."
                                    value={submissionDetails}
                                    onChange={(e) => setSubmissionDetails(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            <div className="form-control mt-6">
                                <button 
                                    type="submit" 
                                    className={`btn btn-primary ${submitting ? 'loading' : ''}`}
                                    disabled={submitting}
                                >
                                    {submitting ? 'Submitting...' : 'Submit Work'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkerDetails;