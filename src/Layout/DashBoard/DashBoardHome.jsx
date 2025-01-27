import React from 'react';
import dashBoardHomeImg from '../../assets/cheerful-diverse-people-showing-pie-chart-tablet.jpg'

const DashBoardHome = () => {
    return (
        <div className="p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">Welcome to Dashboard</h1>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">Manage Everything in One Place</h2>
                        <p className="text-gray-600">
                            Welcome to your dashboard! Here you can manage and monitor all your activities efficiently.
                            Get started by exploring the different sections using the sidebar navigation.
                        </p>
                    </div>
                    <div className="rounded-lg overflow-hidden shadow-xl">
                        <img 
                            className='w-full h-auto object-cover' 
                            src={dashBoardHomeImg} 
                            alt="Dashboard Overview" 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoardHome;