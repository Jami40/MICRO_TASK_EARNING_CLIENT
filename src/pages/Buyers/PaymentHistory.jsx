import { useState, useEffect, useContext } from 'react';
import { FaCoins } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Provider/AuthProvider';

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const {findUser}=useContext(AuthContext)

    useEffect(() => {
        fetchPaymentHistory();
    }, []);

    const fetchPaymentHistory = async () => {
        try {
            const response = await fetch(`https://micro-task-earning-server.vercel.app/payments/history/${findUser?.email}`);
            const data = await response.json();
            
            if (response.ok) {
                setPayments(data);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            toast.error('Failed to fetch payment history');
            console.error('Error:', error);
        } finally {
            setLoading(false);
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
                        <MdPayment className="text-primary" />
                        Payment History
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* Table Head */}
                            <thead>
                                <tr>
                                    <th>Transaction ID</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Coins</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>
                                {payments.map((payment) => (
                                    <tr key={payment._id}>
                                        {/* Transaction ID */}
                                        <td>
                                            <div className="font-mono text-sm">
                                                {payment.paymentId.slice(0, 15)}...
                                            </div>
                                        </td>

                                        {/* Date */}
                                        <td>
                                            <div className="text-sm">
                                                {new Date(payment.transactionDate).toLocaleDateString()} 
                                                <br />
                                                <span className="text-gray-500">
                                                    {new Date(payment.transactionDate).toLocaleTimeString()}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Amount */}
                                        <td>
                                            <div className="font-semibold">
                                                ${payment.amount}
                                            </div>
                                        </td>

                                        {/* Coins */}
                                        <td>
                                            <div className="flex items-center gap-1">
                                                <FaCoins className="text-yellow-500" />
                                                <span>{payment.coins}</span>
                                            </div>
                                        </td>

                                        {/* Status */}
                                        <td>
                                            <span className={`badge ${
                                                payment.status === 'completed' 
                                                    ? 'badge-success' 
                                                    : payment.status === 'pending'
                                                    ? 'badge-warning'
                                                    : 'badge-error'
                                            }`}>
                                                {payment.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {payments.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No payment history found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;