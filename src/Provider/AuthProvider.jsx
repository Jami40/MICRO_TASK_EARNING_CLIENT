import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase.config';
import axios from 'axios';

export const AuthContext=createContext(null)

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
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
            //  console.log(currentUser)
            //  const userRole = localStorage.getItem('userRole');
            //  console.log(userRole)
            //  await axios.post(`http://localhost:5000/user/${currentUser?.email}`,{
            //     name:currentUser?.displayName,
            //     photo:currentUser?.photoURL,
            //     email:currentUser?.email,
            //     role: userRole || 'buyer',

            //  })
            //  .then(res=>console.log(res.data))
            //  .catch(error => {
            //     console.error('Error saving user data:', error);
            // });
             setLoading(false)
         })
         return ()=>{
             unsubscribe();
         }
 
     },[])
    const AuthInfo={
        user,
        createUser,
        login,
        googleSignIn,
        loading,
        manageProfile,
        signOutUser,
        setLoading

    }
    return (
       <AuthContext.Provider value={AuthInfo}>
        {children}

       </AuthContext.Provider>
    );
};

export default AuthProvider;