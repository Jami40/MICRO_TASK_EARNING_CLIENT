import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';

const Login = () => {
    const {login, googleSignIn} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const handleLoginSubmit=e=>{
        e.preventDefault();
        const email=e.target.email.value;
        const password=e.target.password.value;
        console.log(email,password)
        login(email,password)
        .then(result=>{
            console.log(result.user)
            e.target.reset();
            navigate(location?.state ? location.state:"/")
            toast.success("Login succesFully");

        })
        .catch(error=>{
            e.target.reset();
            toast.error(error.message)
            console.log("Error",error.message)
        })
    }
    const handleGoogleSign = () => {
        googleSignIn()
        .then(result => {
            const data = result.user;
            
            // First check if user exists
            axios.get(`https://micro-task-earning-server.vercel.app/user/${data?.email}`)
            .then(response => {
                if (!response.data) {
                    // New user - create with default role and coins
                    const defaultRole = 'buyer';
                    const defaultCoins = 50; // buyers get 50 coins by default

                    axios.post(`https://micro-task-earning-server.vercel.app/user/${data?.email}`, {
                        name: data?.displayName,
                        photo: data?.photoURL,
                        email: data?.email,
                        role: defaultRole,
                        coins: defaultCoins
                    })
                    .then(res => {
                        console.log('New user created:', res.data);
                        toast.success("Account created and logged in successfully");
                    })
                    .catch(error => {
                        console.error('Error saving user data:', error);
                        toast.error("Error creating account");
                    });
                } else {
                    // Existing user
                    toast.success("Login successful");
                }
                
                // Navigate after either creating new user or existing user login
                navigate(location?.state ? location.state : "/");
            })
            .catch(error => {
                console.error('Error checking user existence:', error);
                toast.error("Error during login");
            });
        })
        .catch(error => {
            toast.error(error.message);
        });
    }
    return (
        <div className="bg-base-200 min-h-screen flex flex-col justify-center items-center">
          <div className="card bg-base-100 my-7 w-full max-w-lg shrink-0 rounded-none p-8">
          <form onSubmit={handleLoginSubmit} className="card-body">
              <h2 className="text-2xl font-semibold text-center mb-5-">Login your account</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name="email" placeholder="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" name="password" placeholder="password" className="input input-bordered" required />
              <label className="label">
                <a  href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary bg-[#403F3F]">Login</button>
            </div>
          </form>
          <p className="text-center text-[#706F6F] -mt-6 mb-8">Don't Have An Account?<Link className="text-[#FF8C47]" to="/register">Register</Link></p>
          <p className="text-center">
                  <button onClick={handleGoogleSign} className="btn btn-secondary">Google</button>
               
           </p>
        </div>
          
      </div>
    );
};

export default Login;