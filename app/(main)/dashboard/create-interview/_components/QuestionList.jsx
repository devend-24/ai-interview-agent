"use client";

import { supabase } from '@/services/supabaseClient';
import { v4 as uuidv4} from 'uuid';
import {Button} from "@/components/ui/button"
import {useRef} from "react";
import {toast} from "sonner";
import { Loader2Icon, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import QuestionListContainer from "./QuestionListContainer";
import {useUser} from '@/app/provider'


function QuestionList({ formData, onCreateLink }) {

  const [loading, setLoading] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const {user} = useUser();
  const hasFetched = useRef(false);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(()=>{
      if(!formData || hasFetched.current) return;

      hasFetched.current = true;
      GenerateQuestionList();
  },[formData])

  const  GenerateQuestionList=async()=>{
    setLoading(true);
    try{
        const result = await axios.post('/api/ai-model',{
        ...formData
      })
      console.log(result.data);

      // const Content=JSON.parse(result.data);
      setQuestionList(result.data.interviewQuestions);
      setLoading(false);
    }
    catch(e){
      toast('Server Error, Try Again!')
      setLoading(false);
    }
    finally{
      setLoading(false);
    }

  }

  const onFinish= async()=>{
      setSaveLoading(true);
      const interview_id = uuidv4();
      const {data, error} = await supabase
        .from('Interviews')
        .insert([
          {
            ...formData,
            questionList:questionList,
            userEmail:user?.email,
            interview_id:interview_id
          },
        ])
        .select()

  //Update credits
  const userUpdate = await supabase
    .from('Users')
    .update({credits: Number(user?.credits)-1})
    .eq('email', user?.email)
    .select()
  console.log(userUpdate)

        setSaveLoading(false);

        onCreateLink( interview_id )
        // console.log(data);
  }

  return (

  <>
    {/* Loader box – only when loading and no questions yet */}
    {loading && questionList.length === 0 && (
      <div className="p-5 bg-blue-50 rounded-xl border border-primary">
        <div className="flex gap-3 items-center">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="font-medium">Generating Interview Questions</h2>
            <p className="text-primary">
              Our AI is crafting personalized questions based on your job position.
            </p>
          </div>
        </div>
      </div>
    )}

    {/* Questions box – only when questions exist */}
    {questionList.length > 0 && (
      <div>
        <QuestionListContainer questionList={questionList}/>
      </div>
    )}

    <div className="flex justify-end mt-10">
      <Button onClick={()=>onFinish()} disabled={saveLoading}>
        {saveLoading && <Loader2 className='animate-spin'/>}  
        Create Interview Link & Finish
      </Button>
    </div>
  </>


  )
}

export default QuestionList
