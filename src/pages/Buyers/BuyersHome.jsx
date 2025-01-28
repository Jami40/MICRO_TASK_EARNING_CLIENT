import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';
import { FaTasks, FaUsersCog, FaMoneyBillWave } from 'react-icons/fa';
import { toast } from 'react-toastify';


const BuyerDashboard = () => {
    const [stats, setStats] = useState({
        totalTasks: 0,
        pendingWorkers: 0,
        totalPayments: 0
    });
    const [pendingSubmissions, setPendingSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const { user,findUser } = useContext(AuthContext);

    useEffect(() => {
        fetchDashboardData();
    }, [findUser?.email]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            // Fetch stats
            const statsRes = await axios.get(`https://micro-task-earning-server.vercel.app/buyer-stats/${findUser?.email}`);
            setStats(statsRes.data);

            // Fetch pending submissions
            const submissionsRes = await axios.get(`https://micro-task-earning-server.vercel.app/pending-submissions/${findUser?.email}`);
            setPendingSubmissions(submissionsRes.data);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (submissionId) => {
        try {
            const response = await axios.patch(`https://micro-task-earning-server.vercel.app/submissions/approve/${submissionId}`);
            if (response.data.success) {
                toast.success('Submission approved successfully');
                fetchDashboardData(); // Refresh data
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to approve submission');
        }
    };

    const handleReject = async (submissionId, taskId) => {
        try {
            const response = await axios.patch(`https://micro-task-earning-server.vercel.app/submissions/reject/${submissionId}`, {
                taskId
            });
            if (response.data.success) {
                toast.success('Submission rejected successfully');
                fetchDashboardData(); // Refresh data
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to reject submission');
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
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <FaTasks className="text-3xl" />
                        </div>
                        <div className="stat-title">Total Tasks</div>
                        <div className="stat-value text-primary">{stats.totalTasks}</div>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-warning">
                            <FaUsersCog className="text-3xl" />
                        </div>
                        <div className="stat-title">Pending Workers</div>
                        <div className="stat-value text-warning">{stats.pendingWorkers}</div>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-success">
                            <FaMoneyBillWave className="text-3xl" />
                        </div>
                        <div className="stat-title">Total Payments</div>
                        <div className="stat-value text-success">${stats.totalPayments}</div>
                    </div>
                </div>
            </div>

            {/* Submissions Table */}
            <div className="bg-base-100 rounded-lg shadow-xl">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Tasks To Review</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Worker Name</th>
                                <th>Task Title</th>
                                <th>Payment</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingSubmissions.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">
                                        No pending submissions to review
                                    </td>
                                </tr>
                            ) : (
                                pendingSubmissions.map((submission) => (
                                    <tr key={submission._id}>
                                        <td>{submission.worker_name}</td>
                                        <td>{submission.task_title}</td>
                                        <td>${submission.payable_amount}</td>
                                        <td className="space-x-2">
                                            <button
                                                className="btn btn-sm btn-ghost"
                                                onClick={() => setSelectedSubmission(submission)}
                                            >
                                                View Details
                                            </button>
                                            <button
                                                className="btn btn-sm btn-success"
                                                onClick={() => handleApprove(submission._id)}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="btn btn-sm btn-error"
                                                onClick={() => handleReject(submission._id, submission.task_id)}
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Submission Details Modal */}
            {selectedSubmission && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Submission Details</h3>
                        <p className="py-4 whitespace-pre-line">{selectedSubmission.submission_details}</p>
                        <div className="modal-action">
                            <button
                                className="btn"
                                onClick={() => setSelectedSubmission(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuyerDashboard;