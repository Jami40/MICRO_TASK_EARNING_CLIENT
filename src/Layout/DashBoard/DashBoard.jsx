import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaHome, FaList, FaFileAlt, FaMoneyBillWave, FaUsers, FaTasks, FaCoins, FaBell, FaUser } from 'react-icons/fa';
import logoImg from '../../assets/logo.png'
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';

const DashBoard = () => {
    const {user}=useContext(AuthContext)
    const [userDashBoard, setUserDashBoard] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:5000/user/${user.email}`)
                .then(response => {
                    setUserDashBoard(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user coins:', error);
                });
        }
    }, [user]);

    console.log(userDashBoard)
    const userRole = userDashBoard?.role;
     
    const userName = userDashBoard?.name;
    const availableCoins = userDashBoard?.coins;
    

    const navItems = {
        worker: [
            { icon: FaHome, name: "Worker-Home", path: "/dashboard" },
            { icon: FaList, name: "TaskList", path: "/dashboard/task-list" },
            { icon: FaFileAlt, name: "My Submissions", path: "/dashboard/my-submissions" },
            { icon: FaMoneyBillWave, name: "Withdrawals", path: "/dashboard/withdrawals" }
        ],
        buyer: [
            { icon: FaHome, name: "Buyer-Home", path: "/dashboard" },
            { icon: FaTasks, name: "Add new Tasks", path: "/dashboard/add-tasks" },
            { icon: FaList, name: "My Task's", path: "/dashboard/my-tasks" },
            { icon: FaCoins, name: "Purchase Coin", path: "/dashboard/purchase-coin" }
        ],
        admin: [
            { icon: FaHome, name: "Admin-Home", path: "/dashboard" },
            { icon: FaUsers, name: "Manage Users", path: "/dashboard/manage-users" },
            { icon: FaTasks, name: "Manage Task", path: "/dashboard/manage-task" }
        ]
    };

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar bg-base-100 border-b">
                    <div className="flex-1">
                        <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-none gap-2">
                        {/* Available Coins */}
                        <div className="mr-4">
                            <span className="font-semibold">Available Coins: </span>
                            <span className="text-primary">{availableCoins}</span>
                        </div>
                        
                        {/* User Info */}
                        <div className="flex items-center gap-2 mr-4">
                            <div className="avatar">
                                <div className="w-8 rounded-full">
                                    {
                                        userDashBoard?.photo ? <img src={userDashBoard?.photo} alt="" /> : <FaUser className="h-8 w-8" />
                                    }
                                </div>
                            </div>
                            <div>
                                <div className="font-bold">{userName}</div>
                                <div className="text-sm opacity-75">{userRole}</div>
                            </div>
                        </div>

                        {/* Notification */}
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <FaBell className="h-5 w-5" />
                                    <span className="badge badge-sm indicator-item badge-primary">3</span>
                                </div>
                            </div>
                            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                                <div className="card-body">
                                    <span className="font-bold text-lg">3 Notifications</span>
                                    <div className="text-sm">
                                        <p>New task available</p>
                                        <p>Payment received</p>
                                        <p>Profile updated</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-4">
                    <Outlet></Outlet>
                </div>
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
                <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-5">
                        <img src={logoImg} alt="Logo" className="w-10 h-10" />
                        <h2 className="text-2xl font-bold">TOLOKA</h2>
                    </div>
                    
                    {/* Navigation Items */}
                    <ul className="space-y-2">
                        {navItems[userRole]?.map((item, index) => (
                            <li key={index}>
                                <Link to={item.path}  className="flex items-center gap-3 hover:bg-blue-300 rounded-lg p-3">
                                    <item.icon className="text-xl" />
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                        <div className='divider'></div>
                        <Link to="/" className="flex items-center gap-3 hover:bg-blue-300 rounded-lg p-3">
                                    <FaHome className="text-xl" />
                                    <span>Home</span>
                                </Link>
                    </ul>

                    {/* Footer */}
                    <div className="mt-auto pt-5 border-t">
                        <p className="text-sm text-gray-500">© 2024 Your Company</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;