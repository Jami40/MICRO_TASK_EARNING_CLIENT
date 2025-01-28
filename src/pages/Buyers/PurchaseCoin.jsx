import React from 'react';
import { useNavigate } from 'react-router-dom';

const CoinPackage = ({ coins, price, onSelect }) => {
    return (
        <div 
            onClick={() => onSelect(coins, price)}
            className="border p-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-all text-center bg-white"
        >
            <h3 className="text-xl font-bold mb-2">{coins} coins</h3>
            <div className="text-gray-600">=</div>
            <p className="text-2xl font-bold text-green-600">${price}</p>
        </div>
    );
};

const PurchaseCoin = () => {
    const navigate = useNavigate();
    
    const coinPackages = [
        { coins: 10, price: 1 },
        { coins: 150, price: 10 },
        { coins: 500, price: 20 },
        { coins: 1000, price: 35 },
    ];

    const handlePackageSelect = (coins, amount) => {
        // Navigate to payment process with package details
        navigate(`/dashboard/payment/process`, {
            state: { coins, amount }
        });
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6">
            <h2 className="text-2xl font-bold mb-8 text-center">Purchase Coins</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {coinPackages.map((pkg) => (
                    <CoinPackage
                        key={pkg.coins}
                        coins={pkg.coins}
                        price={pkg.price}
                        onSelect={handlePackageSelect}
                    />
                ))}
            </div>
        </div>
    );
};

export default PurchaseCoin;