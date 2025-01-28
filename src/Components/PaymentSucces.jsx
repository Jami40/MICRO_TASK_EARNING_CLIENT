import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useNavigate } from 'react-router-dom';
export const stripePromise = loadStripe(import.meta.env.VITE_PAYMENTS_PUBLIC_KEY);
const PaymentSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
            <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
                Your coins have been added to your account.
            </p>
            <div className="space-y-4">
                <button
                    onClick={() => navigate('/dashboard/purchase-coin')}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Purchase More Coins
                </button>
                <button
                    onClick={() => navigate('/dashboard/payment/history')}
                    className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200"
                >
                    View Payment History
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;