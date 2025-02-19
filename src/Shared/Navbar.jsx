import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { BiCoin } from 'react-icons/bi';
import { RiMenu3Line } from 'react-icons/ri';
import logoImg from '../assets/logo.png'
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';
import axios from 'axios';

const Navbar = () => {
    const { user, signOutUser,findUser } = useContext(AuthContext);

    const handleSignOut = () =>{
        signOutUser()
        .then(()=>{
           toast.success("Sign Out successFully")
        })
        .catch(error=>{
            toast.error(error.message);
            console.log("Error",error.message)

        })     
    }
    const navItems = (
        <>
            <li><Link to="/">Home</Link></li>
            
            <li><Link to="/all-products" className="hover:bg-white/10 rounded-lg transition-all duration-300">All Products</Link></li>
                            <li><Link to="/about" className="hover:bg-white/10 rounded-lg transition-all duration-300">About Us</Link></li>
                            {user && <li><Link to="/dashboard">Dashboard</Link></li>}
            <li>
                <a 
                    href="https://github.com/your-repo-url" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2"
                >
                    <FaGithub className="text-xl" /> Join as Developer
                </a>
            </li>
        </>
    );

    return (
        <div className="fixed top-0 w-full z-50 bg-gradient-to-r from-teal-500 to-emerald-500 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="navbar min-h-[4.5rem]">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden hover:bg-white/10">
                                <RiMenu3Line className="h-5 w-5 text-white" />
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-xl w-52">
                                {navItems}
                            </ul>
                        </div>
                        <Link to="/" className="flex items-center gap-3 lg:pl-4 group">
                            <img className='w-9 h-9 transition-transform group-hover:scale-110 duration-300' src={logoImg} alt="Logo" />
                            <span className="text-2xl font-bold text-white tracking-wide hover:text-teal-100 transition-colors">TOLOKA</span>
                        </Link>
                    </div>
                    
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 gap-2 text-white font-medium">
                            <li><Link to="/" className="hover:bg-white/10 rounded-lg transition-all duration-300">Home</Link></li>
                            <li><Link to="/all-products" className="hover:bg-white/10 rounded-lg transition-all duration-300">All Products</Link></li>
                            <li><Link to="/about" className="hover:bg-white/10 rounded-lg transition-all duration-300">About Us</Link></li>
                            {user && (
                                <>
                                    <li><Link to="/dashboard" className="hover:bg-white/10 rounded-lg transition-all duration-300">Dashboard</Link></li>
                                </>
                            )}
                            <li>
                <a 
                    href="https://github.com/your-repo-url" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 hover:bg-white/10 rounded-lg transition-all duration-300"
                >
                    <FaGithub className="text-xl" /> Join as Developer
                </a>
            </li>


                        </ul>
                    </div>
                    
                    <div className="navbar-end">
                        {user ? (
                            <div className='flex items-center gap-4'>
                                <button className="btn bg-teal-600 hover:bg-teal-700 text-white border-none rounded-lg shadow-md">
                                    <div className='flex items-center gap-2'>
                                        <span className='text-lg font-semibold'>{findUser?.coins}</span>
                                        <BiCoin className="w-5 h-5" />
                                    </div>
                                </button>
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar ring-2 ring-white/30 hover:ring-white transition-all duration-300">
                                        <img 
                                            className="w-10 h-10 rounded-full" 
                                            src={user.photoURL} 
                                            alt={user.displayName}
                                            title={user.displayName}
                                        />
                                    </label>
                                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-lg menu menu-sm dropdown-content bg-white rounded-xl w-52">
                                        <li><Link to="/profile" className="text-gray-700 hover:text-teal-600">Profile</Link></li>
                                        <li><button onClick={handleSignOut} className="text-gray-700 hover:text-teal-600">Sign Out</button></li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div className='flex items-center gap-3'>
                                <Link to="/login" className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-600 rounded-lg transition-all duration-300">
                                    Login
                                </Link>
                                <Link to="/register" className="btn bg-white text-teal-600 hover:bg-teal-50 border-none rounded-lg shadow-md transition-all duration-300">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;





