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
        <div className="navbar py-5 bg-opacity-10 bg-[#151515] ">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <RiMenu3Line className="h-5 w-5" />
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <Link to="/" className="flex items-center gap-2 lg:pl-4">
                    <img className='w-7 h-7' src={logoImg} alt="Toloka Logo" />
                    <span className="text-xl font-bold">TOLOKA</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
            {
             user?
             <>
             <div className='flex items-center gap-3'>
             <button className="px-6 btn btn-outline rounded-xl">
    <div className='flex items-center gap-1'>
        <span className='text-3xl font-semibold'>{findUser?.coins}</span>
    <BiCoin className="w-7 h-7" />
    </div>
    </button>
    <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <img 
                className="w-12 h-12 rounded-full" 
                src={user.photoURL} 
                alt={user.displayName}
                title={user.displayName}
            />
        </label>
        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li><Link to="/profile">Profile</Link></li>
            <li><button onClick={handleSignOut}>Sign Out</button></li>
        </ul>
    </div>
             </div>
            
             </>
     
              :<>  <div className='flex items-center gap-4'>
                  <NavLink className='btn btn-outline btn-primary font-semibold' to="/login">Login</NavLink>
                  <NavLink className='btn btn-outline btn-primary font-semibold' to="/register">Register</NavLink>
              </div>

              </>
         }
            </div>
        </div>
    );
};

export default Navbar;





