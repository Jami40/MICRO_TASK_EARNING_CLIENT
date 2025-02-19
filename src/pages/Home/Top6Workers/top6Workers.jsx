import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Top6Workers = () => {
    const [topWorkers, setTopWorkers] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchTopWorkers = async () => {
            try {
                const response = await axiosSecure.get('/user/top-workers?role=worker');
                setTopWorkers(response.data);
            } catch (error) {
                console.error('Error fetching top workers:', error);
            }
        };

        fetchTopWorkers();
    }, [axiosSecure]);

    return (
        <div className="bg-base-200 py-16">
            <div className="w-11/12 mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent mb-4">
                        Our Top Performers
                    </h2>
                   
                    <p className="text-gray-600 text-lg">Meet our most dedicated and successful workers</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {topWorkers.map((worker, index) => (
                        <div 
                            key={worker._id} 
                            className="card bg-white backdrop-blur-sm bg-opacity-70 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-opacity-20 border-white"
                        >
                            <figure className="px-4 pt-6">
                                <div className="avatar relative">
                                    <div className="w-28 h-28 rounded-full ring-2 ring-offset-2 relative overflow-hidden">
                                        <img 
                                            src={worker.photo} 
                                            alt={worker.name}
                                            className="object-cover w-full h-full"
                                        />
                                        {/* Rank Badge */}
                                        <div className={`absolute -top-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm
                                            ${index === 0 ? 'bg-yellow-500' : 
                                              index === 1 ? 'bg-slate-400' :
                                              index === 2 ? 'bg-amber-600' :
                                              'bg-gradient-to-br from-violet-500 to-pink-500'}`}>
                                            {index + 1}
                                        </div>
                                    </div>
                                </div>
                            </figure>

                            <div className="card-body items-center text-center p-4">
                                <h3 className="card-title text-lg font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                                    {worker.name}
                                </h3>
                                
                                <div className="flex items-center gap-2 mt-3 bg-gradient-to-r from-violet-100 to-pink-100 px-4 py-2 rounded-full">
                                    <span className="text-xl">🏆</span>
                                    <span className="font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                                        {worker.coins || 0} coins
                                    </span>
                                </div>

                                <div className="mt-3">
                                    <div className="badge bg-gradient-to-r from-violet-500 to-pink-500 text-white border-none px-4 py-3">
                                        Top Performer
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Top6Workers;

