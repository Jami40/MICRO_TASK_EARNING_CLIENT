import axios from 'axios';
import React from 'react';

export const axiosSecure=axios.create(
 {
    baseURL:'https://micro-task-earning-server.vercel.app'
 }
)
const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;