export const dynamic = "force-dynamic";
"use client"

import { useRouter } from 'next/navigation';
import React, { useEffect,useState,useContext } from 'react'
import Image from 'next/image'
import { Clock, Info, Video, Loader2Icon } from 'lucide-react'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import {toast} from "sonner";
import { InterviewDataContext } from '@/context/InterviewDataContext'
import ResumeUpload from './start/_components/fileUpload';


function Interview() {

    const {interview_id}= useParams();
    console.log(interview_id)
    const [interviewData, setInterviewData]=useState();
    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [loading,setLoading] = useState(false);
    const {interviewInfo, setInterviewInfo} = useContext(InterviewDataContext);
    const router=useRouter();

    useEffect(()=>{
        interview_id && GetInterviewDetails();
    },[interview_id])

    const GetInterviewDetails=async()=>{
        setLoading(true);

        try{
        let {data: Interviews, error } = await supabase
            .from('Interviews')
            .select('jobPosition, jobDescription, duration, type')
            .eq('interview_id',interview_id)
        setInterviewData(Interviews[0]);

        if(Interviews?.length==0)
        {
            toast('Incorrect Interview Link')
            return;
        }

        setLoading(false);
        }
        catch(e){
            setLoading(false);
            toast('Incorrect Interview Link')
        }
    }


    const onJoinInterview= async()=>{
        setLoading(true);
        let { data:Interviews, error} = await supabase
            .from("Interviews")
            .select("*")
            .eq('interview_id',interview_id)


            console.log(Interviews[0]);
        setInterviewInfo({
            userName:userName,
            userEmail:userEmail,
            interviewData:Interviews[0]
        });
        router.push('/interview/'+interview_id+'/start')
        setLoading(false);
    }

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900 py-12 px-4'>
        <div className='max-w-2xl mx-auto'>
            {/* Header Card */}
            <div className='bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-gray-200 dark:border-zinc-800 overflow-hidden'>
                
                {/* Logo & Title Section */}
                <div className='bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 text-center'>
                    <div className='flex justify-center mb-4'>
                        <Image 
                            src='/mainlogo.png' 
                            alt='logo'
                            width={100}
                            height={100}
                            className='w-20 h-auto bg-white rounded-lg p-2'
                        />
                    </div>
                    <h1 className='text-2xl font-bold'>AI-Powered Interview Platform</h1>
                    <p className='text-blue-100 mt-2'>Prepare for success with AI-driven practice</p>
                </div>

                {/* Content Section */}
                <div className='p-8'>
                    
                    {/* Interview Image */}
                    <div className='flex justify-center mb-6'>
                        <Image 
                            src={'/interview.jpg'} 
                            alt='interview'
                            width={500}
                            height={500}
                            className='w-48 h-auto rounded-lg shadow-md'
                        />
                    </div>

                    {/* Job Details */}
                    <div className='text-center mb-8 space-y-2'>
                        <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
                            {interviewData?.jobPosition}
                        </h2>
                        <div className='flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400'>
                            <Clock className='w-4 h-4' />
                            <span className='text-sm'>{interviewData?.duration}</span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className='border-t border-gray-200 dark:border-zinc-800 my-6'></div>

                    {/* Name Input */}
                    <div className='mb-6'>
                        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                            Enter your full name
                        </label>
                        <Input 
                            placeholder='e.g. John Smith' 
                            onChange={(event) => setUserName(event.target.value)}
                            className='w-full px-4 py-3 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    {/* Email Input */}
                    <div className='mb-6'>
                        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                            Enter your email address
                        </label>
                        <Input 
                            placeholder='e.g. john@company.com' 
                            onChange={(event) => setUserEmail(event.target.value)}
                            className='w-full px-4 py-3 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    {/* Resume Input */}
                    <div className='mb-6'>
                        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                            Upload your Resume
                        </label>
                        <ResumeUpload
                        onSuccess={(text, name) => {
                            setResumeText(text);
                            setFileName(name);
                        }}
                        />
                    </div>
                    



                    {/* Info Box */}
                    <div className='bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4 mb-6'>
                        <div className='flex gap-3'>
                            <Info className='w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5'/>
                            <div>
                                <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
                                    Before you begin
                                </h3>
                                <ul className='space-y-1.5 text-sm text-gray-700 dark:text-gray-300'>
                                    <li className='flex items-start gap-2'>
                                        <span className='text-blue-600 dark:text-blue-400'>✓</span>
                                        Test your camera and microphone
                                    </li>
                                    <li className='flex items-start gap-2'>
                                        <span className='text-blue-600 dark:text-blue-400'>✓</span>
                                        Ensure you have a stable internet connection
                                    </li>
                                    <li className='flex items-start gap-2'>
                                        <span className='text-blue-600 dark:text-blue-400'>✓</span>
                                        Find a quiet place for the interview
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Join Button */}
                    <Button 
                        className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                        disabled={loading || !userName}
                        onClick={() => onJoinInterview()}
                    > 
                        {loading ? (
                            <Loader2Icon className='w-5 h-5 animate-spin' />
                        ) : (
                            <Video className='w-5 h-5' />
                        )}
                        {loading ? 'Joining...' : 'Join Interview'}
                    </Button>
                </div>
            </div>

            {/* Footer Note */}
            <p className='text-center text-sm text-gray-500 dark:text-gray-400 mt-6'>
                Your privacy is important. This session will not be recorded.
            </p>
        </div>
    </div>
  )
}

export default Interview
