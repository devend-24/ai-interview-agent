"use client"

import {useUser} from '@/app/provider';
import { supabase } from '@/services/supabaseClient'
import React, { useEffect, useState} from 'react'
import { Camera, Video } from 'lucide-react';
import { Button } from '@/components/ui/button'
import InterviewCard from '@/app/(main)/dashboard/_components/InterviewCard';

import { set } from 'zod';

function ScheduledInterview() {
    const {user} = useUser();
    const [interviewList, setInterviewList] = useState();

    useEffect(()=>{
        user && GetInterviewList()
    },[user])

    const GetInterviewList=async()=>{
        const result = await supabase.from('Interviews')
        .select('jobPosition, duration, interview_id, interview-feedback(userEmail)')
        .eq('userEmail', user?.email)
        .order('id', { ascending: false })

        console.log(result)
        setInterviewList(result.data)
    }

  return (
    <div className='mt-5'>
      <h2 className='font-bold text-2xl'>Interview List with Candidate Feedback</h2>
      {interviewList?.length==0 && 
        <div className='p-5 flex flex-col gap-3 items-center bg-white rounded-2xl mt-5'>
            <Video className='h-10 w-10 text-primary' />
            <h2>You don't have any interview created!</h2>
            <Button>+ Create New Inerview</Button>
        </div>}
        {interviewList &&
            <div className='mt-5 grid grid-cols-2 xl:grid-cols-3 gap-5'>
                {interviewList?.map((interview, index)=>(
                  <InterviewCard interview={interview} key={index}
                    viewDetail={true}
                  />
                ))}
            </div>
        }
    </div>
  )
}

export default ScheduledInterview
