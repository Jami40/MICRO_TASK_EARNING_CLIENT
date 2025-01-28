import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { FaEye } from 'react-icons/fa';
import { format } from 'date-fns';
import { AuthContext } from '../../Provider/AuthProvider';

const MySubmissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user,findUser } = useContext(AuthContext);
    console.log(submissions)

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axios.get(`https://micro-task-earning-server.vercel.app/taskSubmission/${findUser?.email}`);
                setSubmissions(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching submissions:', error);
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, [findUser?.email]);

    const getStatusBadgeClass = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'approved':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">My Submissions</h2>
            
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* Table Header */}
                    <thead>
                        <tr className="bg-base-200">
                            <th>Date</th>
                            <th>Task Title</th>
                            <th>Payment</th>
                            <th>Client</th>
                            <th>Status</th>
                            <th>Submission Details</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {submissions.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-4">
                                    No submissions found
                                </td>
                            </tr>
                        ) : (
                            submissions.map((submission) => (
                                <tr key={submission._id}>
                                    <td className="whitespace-nowrap">
                                        {format(new Date(submission.current_date), 'MMM dd, yyyy')}
                                    </td>
                                    <td className="max-w-xs truncate">
                                        {submission.task_title}
                                    </td>
                                    <td>${submission.payable_amount}</td>
                                    <td>
                                        <div className="flex flex-col">
                                            <span>{submission.buyer_name}</span>
                                            <span className="text-sm text-gray-500">
                                                {submission.buyer_email}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadgeClass(submission.status)}`}>
                                            {submission.status}
                                        </span>
                                    </td>
                                    <td>
                                    <div className="card-body">
                                                    <p className="text-sm">{submission.submission_details}</p>
                                                </div>
                                        {/* <div className="dropdown dropdown-end">
                                            
                                            <div tabIndex={0} className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64">
                                                
                                            </div>
                                        </div> */}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySubmissions;