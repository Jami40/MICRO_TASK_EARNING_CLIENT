import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';


const useUser = () => {
    const axiosSecure=useAxiosSecure()
    const {data:user=[]}=useQuery({
        queryKey:['usersTanstack'],
        queryFn:async()=>{
            const response=await axiosSecure.get('/user');
            
            return  response.data;
        }
    })
    return [user]
    
};

export default useUser;