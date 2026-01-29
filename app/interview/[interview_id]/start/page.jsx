"use client"
import { InterviewDataContext } from '@/context/InterviewDataContext'
import React, { useContext, useEffect, useRef } from 'react'
import {Timer, Mic, Phone} from 'lucide-react'
import Image from 'next/image'
import Vapi from '@vapi-ai/web'
import AlertConfirmation from './_components/AlertConfirmation'


function StartInterview() {
  const {interviewInfo, setInterviewInfo}=useContext(InterviewDataContext);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  const hasStartedRef = useRef(false);

useEffect(() => {
  if (!interviewInfo?.interviewData?.questionList?.length) return;

  if (hasStartedRef.current) return; // 🛑 block second run

  hasStartedRef.current = true;
  startCall();
}, [interviewInfo]);


const startCall = () => {
  if (!interviewInfo?.interviewData?.questionList?.length) {
    console.log("Question list not ready", interviewInfo);
    return;
  }

  const questionList = interviewInfo.interviewData.questionList
    .map(q => q.question)
    .join(",");

  
  const assistantOptions = {
    name: "AI Recruiter",

    firstMessage:
      `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}`,

    transcriber: {
      provider: "deepgram",
      model: "nova-2",
      language: "en-US",
    },

    voice: {
      provider: "11labs",
      voiceId: "CwhRBWXzGAHq8TQ4Fs17",
    },

    model: {
      // provider: "custom",
      // model: "llama-3.1-8b-instant",

    provider: "custom-llm",
    url: "https://api.groq.com/v1/llama-3.3-70b-versatile/completions/chat/completions",
    model: "llama-3.3-70b-versatile",
    messages: [
        {
          role: "system",
          content: `
  You are an AI voice assistant conducting interviews.

  Your job is to ask candidates the provided interview questions and assess their responses.

  Begin the conversation with a friendly introduction, setting a relaxed yet professional tone.
  Example:
  "Hey there! Welcome to your ${interviewInfo?.interviewData?.jobPosition} interview. Let's get started with a few questions!"

  Ask one question at a time and wait for the candidate's response before proceeding.
  Keep the questions clear and concise.

  Below are the questions. Ask them one by one:
  ${questionList}

  If the candidate struggles, offer hints or rephrase the question without giving away the answer.
  Example:
  "Need a hint? Think about how React tracks component updates!"

  Provide brief, encouraging feedback after each answer.
  Examples:
  "Nice! That's a solid answer."
  "Hmm, not quite! Want to try again?"

  Keep the conversation natural and engaging.
  Use casual phrases like:
  "Alright, next up..."
  "Let's tackle a tricky one!"

  After 5–7 questions, wrap up the interview smoothly by summarizing their performance.
  End on a positive note.
  Examples:
  "That was great! You handled some tough questions well. Keep sharpening your skills!"
  "Thanks for chatting! Hope to see you crushing projects soon!"

  Key Guidelines:
  - Be friendly, engaging, and witty
  - Keep responses short and natural
  - Adapt based on the candidate's confidence level
  - Ensure the interview remains focused on the role
          `.trim(),
        },
      ],
    },
  };

  vapi.start(assistantOptions)

};

const stopInterview=()=>{
  vapi.stop();
}


  return (
    <div className='p-20 lg:px-48 xl:px-56'>
      <h2 className='font-bold text-xl flex justify-between'>AI Interview Session
          <span className='flex gap-2 items-center'>
            <Timer />
            00:00:00
          </span>
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
            <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
              <Image src={'/robot.png'} alt='ai'
                width={100}
                height={100}
                className='w-[60px] h-[60px] rounded-full object-cover'
              />
              <h2>AI Recruiter</h2>
            </div>

            <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 flex items-center justify-center'>
              <h2 className='text-2xl bg-primary text-white p-3 rounded-full px-5'>{interviewInfo?.userName[0]}</h2>
              <h2>{interviewInfo?.userName}</h2>
            </div>
      </div>

      <div className='flex items-center gap-5 justify-center mt-7'>
              <Mic className='h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer'/>
              <AlertConfirmation stopInterview={()=>stopInterview()}>
                <Phone className='h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer'/>
              </AlertConfirmation>
      </div>
      <h2 className='text-sm text-gray-400 text-center mt-5'>Interview in Progress...</h2>
    </div>
  )
}

export default StartInterview
