import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';
import { FaFileAlt, FaHourglassHalf, FaDollarSign } from 'react-icons/fa';

const WorkerStats = () => {
    const [stats, setStats] = useState({
        totalSubmissions: 0,
        pendingSubmissions: 0,
        totalEarnings: 0
    });
    const [approvedSubmissions, setApprovedSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user,findUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchWorkerData = async () => {
            try {
                // Fetch all submissions for stats
                const response = await axios.get(`http://localhost:5000/taskSubmission/${findUser?.email}`);
                const submissions = response.data;

                // Calculate stats
                const totalCount = submissions.length;
                const pendingCount = submissions.filter(sub => sub.status === 'pending').length;
                const totalEarnings = submissions
                    .filter(sub => sub.status === 'approved')
                    .reduce((sum, sub) => sum + (parseFloat(sub.payable_amount) || 0), 0);

                // Set stats
                setStats({
                    totalSubmissions: totalCount,
                    pendingSubmissions: pendingCount,
                    totalEarnings: totalEarnings
                });

                // Filter approved submissions for table
                const approved = submissions.filter(sub => sub.status === 'approved');
                setApprovedSubmissions(approved);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching worker data:', error);
                setLoading(false);
            }
        };

        fetchWorkerData();
    }, [findUser?.email]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Total Submissions */}
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <FaFileAlt className="text-3xl" />
                        </div>
                        <div className="stat-title">Total Submissions</div>
                        <div className="stat-value text-primary">{stats.totalSubmissions}</div>
                    </div>
                </div>

                {/* Pending Submissions */}
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-warning">
                            <FaHourglassHalf className="text-3xl" />
                        </div>
                        <div className="stat-title">Pending Submissions</div>
                        <div className="stat-value text-warning">{stats.pendingSubmissions}</div>
                    </div>
                </div>

                {/* Total Earnings */}
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-success">
                            <FaDollarSign className="text-3xl" />
                        </div>
                        <div className="stat-title">Total Earnings</div>
                        <div className="stat-value text-success">${stats.totalEarnings}</div>
                    </div>
                </div>
            </div>

            {/* Approved Submissions Table */}
            <div className="bg-base-100 rounded-lg shadow-xl">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Approved Submissions</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr className="bg-base-200">
                                <th>Task Title</th>
                                <th>Payment</th>
                                <th>Client Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {approvedSubmissions.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">
                                        No approved submissions yet
                                    </td>
                                </tr>
                            ) : (
                                approvedSubmissions.map((submission) => (
                                    <tr key={submission._id}>
                                        <td className="max-w-xs truncate">
                                            {submission.task_title}
                                        </td>
                                        <td>${submission.payable_amount}</td>
                                        <td>{submission.buyer_name}</td>
                                        <td>
                                            <span className="badge badge-success badge-outline">
                                                {submission.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default WorkerStats;