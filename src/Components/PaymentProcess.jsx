import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { loadStripe } from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENTS_PUBLIC_KEY);


const CheckoutForm = ({ amount, coins }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) {
            toast.error('Stripe not loaded properly');
            return;
        }

        try {
            // const processingToast = toast.loading('Processing payment...');

            // const response = await fetch('http://localhost:5000/payments/create-intentt', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ amount: amount * 100 }),
            // });

            // const data = await response.json();

            // const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
            //     data.clientSecret,
            //     {
            //         payment_method: {
            //             card: elements.getElement(CardElement),
            //         },
            //     }
            // );

            // 
            const { data: paymentIntentData } = await axios.post('http://localhost:5000/payments/create-intent', {
                amount: amount * 100,
            });
    
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
                paymentIntentData.clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                    },
                }
            );
            toast.dismiss(processingToast);
    
            // toast.dismiss(processingToast);
            if (stripeError) {
                setError(stripeError.message);
                toast.error(stripeError.message);
            } else if (paymentIntent.status === 'succeeded') {
                await savePaymentInfo(paymentIntent, coins);
                
                await Swal.fire({
                    title: 'Payment Successful!',
                    html: `
                        <p>You have successfully purchased ${coins} coins!</p>
                        <p class="text-sm text-gray-600 mt-2">Transaction ID: ${paymentIntent.id}</p>
                    `,
                    icon: 'success',
                    confirmButtonText: 'Great!'
                });

                navigate('/dashboard/payment/success');
            }
        } catch (err) {
            toast.error('Payment failed. Please try again.');
            setError('Payment failed. Please try again.');
        }
        setProcessing(false);
    };

    const savePaymentInfo = async (paymentIntent, coins) => {
        try {
            const saveToast = toast.loading('Saving payment information...');
            
            await fetch('http://localhost:5000/payments/save-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentId: paymentIntent.id,
                    amount: amount,
                    coins: coins,
                }),
            });

            toast.dismiss(saveToast);
            toast.success('Payment information saved successfully!');
        } catch (err) {
            console.error('Error saving payment:', err);
            toast.error('Error saving payment information');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 border rounded-md">
                <CardElement 
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </div>
            {error && (
                <div className="text-red-500 text-sm">{error}</div>
            )}
            <button
                type="submit"
                disabled={!stripe || processing}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
            >
                {processing ? 'Processing...' : `Pay $${amount}`}
            </button>
        </form>
    );
};

const PaymentProcess = () => {
    const location = useLocation();
    const { coins, amount } = location.state || {};

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Complete Purchase</h2>
            <div className="mb-6">
                <p className="text-lg">Purchasing {coins} coins</p>
                <p className="text-lg font-bold">Total: ${amount}</p>
            </div>
            <Elements stripe={stripePromise}>
                <CheckoutForm amount={amount} coins={coins} />
            </Elements>
        </div>
    );
};

export default PaymentProcess;