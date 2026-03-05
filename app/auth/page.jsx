"use client"

import React,{useState} from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'

const Login = () => {

  const [role, setRole] = useState("candidate");


  const signInWithGoogle=async()=>{

    localStorage.setItem("selectedRole", role);

    const {error}=await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if(error){
      console.error('Error:', error.message)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col items-center border rounded-2xl p-8'>
        <Image src={'/mainlogo.png'} alt='logo'
          width={100}
          height={100}
          className='w-[120px]'
        />

        <div className='flex items-center flex-col'>
          <Image src={'/login.jpg'} alt='login'
            width={600}
            height={400}
            className='w-[400px] h-[250px] rounded-2xl'
          />
          <h2 className='text-2xl font-bold text-center mt-5'>Welcome to AI Hiring Platform</h2>
          <p className='text-gray-500 text-center'>Sign In With Google Authentication</p>

          <div className="flex py-3 gap-4 w-full">
            <button
              type="button"
              onClick={() => setRole("recruiter")}
              className={`flex-1 py-3 rounded-xl border transition-all duration-200
                ${
                  role === "recruiter"
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                }`}
            >
              Recruiter
            </button>

            <button
              type="button"
              onClick={() => setRole("candidate")}
              className={`flex-1 py-3 rounded-xl border transition-all duration-200
                ${
                  role === "candidate"
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                }`}
            >
              Candidate
            </button>
          </div>
          
          <Button className='mt-7 w-full'
          onClick={signInWithGoogle}
          >Login with Google</Button>
        </div>
      </div>
    </div>
  )
}

export default Login
