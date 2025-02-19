import { useState, useEffect, useContext } from 'react';
import { FaCoins, FaDollarSign, FaMoneyBillWave } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';
import { BsBank } from 'react-icons/bs';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Provider/AuthProvider';

const Withdrawal = () => {
    const [userCoins, setUserCoins] = useState(0);
    const [coinsToWithdraw, setCoinsToWithdraw] = useState('');
    const [withdrawalAmount, setWithdrawalAmount] = useState(0);
    const [paymentSystem, setPaymentSystem] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const {findUser}=useContext(AuthContext)
    console.log(findUser)

    const MINIMUM_COINS = 200; // Minimum coins required for withdrawal
    const COIN_TO_DOLLAR_RATIO = 20; // 20 coins = 1 dollar

    useEffect(() => {
        fetchUserCoins();
    }, []);

    const fetchUserCoins = async () => {
        try {
            const response = await fetch(`https://micro-task-earning-server.vercel.app/users/coins/${findUser?.email}`);
            const data = await response.json();
            setUserCoins(data.coins || 0);
        } catch (error) {
            toast.error('Failed to fetch user coins');
        }
    };

    const handleCoinsChange = (e) => {
        const coins = parseInt(e.target.value) || 0;
        setCoinsToWithdraw(coins > userCoins ? userCoins : coins);
        setWithdrawalAmount((coins / COIN_TO_DOLLAR_RATIO).toFixed(2));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (coinsToWithdraw < MINIMUM_COINS) {
            toast.error(`Minimum withdrawal is ${MINIMUM_COINS} coins`);
            return;
        }

        try {
            const result = await Swal.fire({
                title: 'Confirm Withdrawal',
                html: `
                    <div class="space-y-2">
                        <p>You are about to withdraw:</p>
                        <p class="text-xl font-bold">${withdrawalAmount}</p>
                        <p class="text-sm text-gray-600">
                            (${coinsToWithdraw} coins) via ${paymentSystem}
                        </p>
                    </div>
                `,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, withdraw!'
            });

            if (result.isConfirmed) {
                const response = await fetch('https://micro-task-earning-server.vercel.app/withdrawals/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        worker_email: findUser.email,
                        worker_name: findUser.name,
                        withdrawal_coin: parseInt(coinsToWithdraw),
                        withdrawal_amount: parseFloat(withdrawalAmount),
                        payment_system: paymentSystem,
                        account_number: accountNumber,
                        withdraw_date: new Date(),
                        status: 'pending'
                    }),
                });

                const data = await response.json();

                if (data.success) {
                    toast.success('Withdrawal request submitted successfully');
                    // Reset form
                    setCoinsToWithdraw('');
                    setWithdrawalAmount(0);
                    setPaymentSystem('');
                    setAccountNumber('');
                    // Refresh user coins
                    fetchUserCoins();
                } else {
                    throw new Error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message || 'Failed to submit withdrawal request');
        }
    };

    return (
        <div className="p-6">
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Current Balance Section */}
                <div className="p-6 bg-gradient-to-r from-primary to-primary-focus text-white">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <FaCoins />
                        Current Balance
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/10 rounded-lg">
                            <div className="text-sm opacity-80">Available Coins</div>
                            <div className="text-2xl font-bold flex items-center gap-2">
                                <FaCoins className="text-yellow-300" />
                                {userCoins}
                            </div>
                        </div>
                        <div className="p-4 bg-white/10 rounded-lg">
                            <div className="text-sm opacity-80">Available to Withdraw</div>
                            <div className="text-2xl font-bold flex items-center gap-2">
                                <FaDollarSign />
                                {(userCoins / COIN_TO_DOLLAR_RATIO).toFixed(2)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Withdrawal Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <FaMoneyBillWave className="text-primary" />
                        Withdraw Funds
                    </h3>

                    {/* Coins Input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Coins to Withdraw</span>
                        </label>
                        <input
                            type="number"
                            className="input input-bordered"
                            value={coinsToWithdraw}
                            onChange={handleCoinsChange}
                            min="0"
                            max={userCoins}
                            required
                        />
                    </div>

                    {/* Dollar Amount (Read-only) */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Withdrawal Amount ($)</span>
                        </label>
                        <input
                            type="number"
                            className="input input-bordered"
                            value={withdrawalAmount}
                            readOnly
                        />
                    </div>

                    {/* Payment System Dropdown */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Payment System</span>
                        </label>
                        <select
                            className="select select-bordered"
                            value={paymentSystem}
                            onChange={(e) => setPaymentSystem(e.target.value)}
                            required
                        >
                            <option value="">Select payment system</option>
                            <option value="Bkash">Bkash</option>
                            <option value="Rocket">Rocket</option>
                            <option value="Nagad">Nagad</option>
                            <option value="PayPal">PayPal</option>
                        </select>
                    </div>

                    {/* Account Number */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Account Number</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            required
                        />
                    </div>

                    {/* Submit Button or Insufficient Message */}
                    <div className="form-control mt-6">
                        {userCoins >= MINIMUM_COINS ? (
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                disabled={!coinsToWithdraw || !paymentSystem || !accountNumber}
                            >
                                <MdPayment className="text-xl" />
                                Submit Withdrawal Request
                            </button>
                        ) : (
                            <div className="alert alert-warning">
                                <BsBank className="text-xl" />
                                Insufficient coins. Minimum required: {MINIMUM_COINS} coins
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Withdrawal;