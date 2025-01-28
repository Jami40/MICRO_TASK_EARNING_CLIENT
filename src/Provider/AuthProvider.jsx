import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase.config';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AuthContext=createContext(null)

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [findUser,setFindUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const provider=new GoogleAuthProvider();
    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const login=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const googleSignIn=()=>{
        setLoading(true)
        return signInWithPopup(auth,provider)
    }
    const manageProfile = (name,image) =>{
        setLoading(false)
        return updateProfile(auth.currentUser,{
             displayName:name,photoURL:image
         })
       }
       const signOutUser=()=>{
        setLoading(true)
        return signOut(auth)
    }
    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth,async currentUser=>{
             setUser(currentUser)
             setLoading(false)
         })
         return ()=>{
             unsubscribe();
         }
 
     },[])
     useEffect(() => {
        if (user?.email) {
            axios.get(`https://micro-task-earning-server.vercel.app/user/${user?.email}`)
                .then(response => {
                    setFindUser(response.data);
                })
                .catch(error => {
                    toast.error('Error fetching user coins:', error);
                });
        }
    }, [user]);
    const AuthInfo={
        user,
        createUser,
        login,
        googleSignIn,
        loading,
        manageProfile,
        signOutUser,
        setLoading,
        findUser,
        setFindUser

    }
    return (
       <AuthContext.Provider value={AuthInfo}>
        {children}

       </AuthContext.Provider>
    );
};

export default AuthProvider;