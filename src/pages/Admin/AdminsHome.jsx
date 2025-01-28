import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUsers, FaCoins, FaMoneyBillWave } from 'react-icons/fa';
import { MdPendingActions } from 'react-icons/md';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const AdminsHome = () => {
    const [stats, setStats] = useState({
        totalWorkers: 0,
        totalBuyers: 0,
        totalCoins: 0,
        totalPayments: 0
    });
    const [withdrawRequests, setWithdrawRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
        fetchWithdrawRequests();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/admin/dashboard-stats');
            setStats(data);
        } catch (error) {
            toast.error('Failed to fetch dashboard statistics');
        }
    };

    const fetchWithdrawRequests = async () => {
        try {
            const { data } = await axios.get('/admin/withdraw-requests');
            setWithdrawRequests(data);
        } catch (error) {
            toast.error('Failed to fetch withdrawal requests');
        } finally {
            setLoading(false);
        }
    };

    const handleApproveWithdrawal = async (withdrawalId, userEmail, amount) => {
        try {
            const result = await Swal.fire({
                title: 'Confirm Payment',
                html: `
                    <p>Are you sure you want to approve withdrawal of</p>
                    <p class="text-xl font-bold">$${amount}</p>
                    <p>for user: ${userEmail}?</p>
                `,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, approve!'
            });

            if (result.isConfirmed) {
                const loadingToast = toast.loading('Processing withdrawal...');

                await axios.patch(`/api/admin/approve-withdrawal/${withdrawalId}`, {
                    userEmail,
                    amount
                });

                toast.dismiss(loadingToast);
                toast.success('Withdrawal approved successfully');

                // Refresh data
                fetchDashboardData();
                fetchWithdrawRequests();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to approve withdrawal');
        }
    };

    return (
        <div className="p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="stat bg-white shadow-lg rounded-lg">
                    <div className="stat-figure text-primary">
                        <FaUsers className="text-3xl" />
                    </div>
                    <div className="stat-title">Total Workers</div>
                    <div className="stat-value text-primary">{stats.totalWorkers}</div>
                </div>

                <div className="stat bg-white shadow-lg rounded-lg">
                    <div className="stat-figure text-secondary">
                        <FaUsers className="text-3xl" />
                    </div>
                    <div className="stat-title">Total Buyers</div>
                    <div className="stat-value text-secondary">{stats.totalBuyers}</div>
                </div>

                <div className="stat bg-white shadow-lg rounded-lg">
                    <div className="stat-figure text-accent">
                        <FaCoins className="text-3xl" />
                    </div>
                    <div className="stat-title">Total Available Coins</div>
                    <div className="stat-value text-accent">{stats.totalCoins}</div>
                </div>

                <div className="stat bg-white shadow-lg rounded-lg">
                    <div className="stat-figure text-info">
                        <FaMoneyBillWave className="text-3xl" />
                    </div>
                    <div className="stat-title">Total Payments</div>
                    <div className="stat-value text-info">${stats.totalPayments}</div>
                </div>
            </div>

            {/* Withdrawal Requests Table */}
            {/* <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <MdPendingActions />
                    Pending Withdrawal Requests
                </h2>

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                ) : withdrawRequests.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                        No pending withdrawal requests
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Amount</th>
                                    <th>Request Date</th>
                                    <th>Payment Method</th>
                                    <th>Account Details</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {withdrawRequests?.map((request) => (
                                    <tr key={request._id}>
                                        <td>{request.userEmail}</td>
                                        <td>${request.amount}</td>
                                        <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                                        <td>{request.paymentMethod}</td>
                                        <td>
                                            <div className="max-w-xs overflow-hidden text-ellipsis">
                                                {request.accountDetails}
                                            </div>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleApproveWithdrawal(
                                                    request._id,
                                                    request.userEmail,
                                                    request.amount
                                                )}
                                                className="btn btn-success btn-sm"
                                            >
                                                Approve Payment
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div> */}
        </div>
    );
};

export default AdminsHome;
