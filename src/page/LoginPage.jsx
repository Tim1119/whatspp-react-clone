import { Button } from '@mui/material'
import React from 'react'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth,provider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from "../context/AuthContext";
const LoginPage = () => {
    const navigate  = useNavigate()
    const {setUser} = UserAuth()

    const SignInWithGoogle = ()=>{
        signInWithPopup(auth,provider)
        .then((result)=>{
           
            const newUser = {
                fullName:result.user.displayName,
                email:result.user.email,
                photoURL:result.user.photoURL
            }
            setUser(newUser)
            navigate('/whatsapp')
        })
    }
  return (
    <div className="bg-[#f8f8f8] h-screen w-full grid place-items-center">
      <div className="p-[100px] text-center  grid place-items-center bg-white rounded-xl shadow-md w-1/2">
        <img
        className='object-contain w-[200px] mb-[40px]'
          src="https://www.freepnglogos.com/uploads/whatsapp-png-logo-1.png"
          alt="whatsapp"
        />
        <div className="login__text">
          <h1>Sign in to Whatsapp</h1>
        </div>

        <button  className=" px-5 py-2 rounded-md text-2xl font-bold
         mt-[50px] bg-[#0a8d48] hover:bg-green-500 text-white" onClick={SignInWithGoogle} >Sign In with Google</button>
      </div>
    </div>
  )
}

export default LoginPage