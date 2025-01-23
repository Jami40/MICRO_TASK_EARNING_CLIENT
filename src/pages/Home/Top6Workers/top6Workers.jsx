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
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8">Top Performers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {topWorkers.map((worker) => (
                    <div key={worker._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                        <figure className="px-4 pt-4">
                            <div className="avatar">
                                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img 
                                        src={worker.photo} 
                                        alt={worker.name}
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </figure>
                        <div className="card-body items-center text-center p-4">
                            <h3 className="card-title text-lg font-semibold">{worker.name}</h3>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-xl">🪙</span>
                                <span className="text-primary font-bold">{worker.coins || 0}</span>
                            </div>
                            {/* Optional: Add a badge for ranking */}
                            <div className="badge badge-primary badge-outline mt-2">
                                Rank #{topWorkers.indexOf(worker) + 1}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Top6Workers;