"use client";

import { InterviewDataContext } from "@/context/InterviewDataContext";
import React, { useContext, useRef, useState, useEffect } from "react";
import { Timer } from "lucide-react";
import Image from "next/image";
import CodingQuestion from "./_components/CodingQuestion";
import Chat from "./_components/Chat";




function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);
  console.log("Interview Info in Start Page:", interviewInfo);

  // 🔑 single bridge between Chat & CodingQuestion
  const sendMessageRef = useRef(null);

  // timer
    const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Parse duration and convert to seconds
  useEffect(() => {
    if (interviewInfo?.interviewData?.duration) {
      const duration = interviewInfo.interviewData.duration;
      const minutes = parseInt(duration.match(/\d+/)[0]); // Extract number from "30 Min"
      setTimeLeft(minutes * 60); // Convert to seconds
      setIsActive(true); // Start timer automatically
    }
  }, [interviewInfo]);

  // Countdown logic
  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          // Optional: trigger callback when timer ends
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Format time as HH:MM:SS
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

return (
    <div className="flex h-screen bg-gray-50 dark:bg-zinc-950">
      {/* LEFT PANEL - Sidebar */}
      <div className="flex flex-col w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 p-6 space-y-6">
        
        {/* Header */}
        <div className="space-y-2">
          <h2 className="font-bold text-lg text-gray-900 dark:text-white">
            AI Interview Session
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Timer className="w-4 h-4" />
            <span className="font-mono">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="h-px bg-gray-200 dark:bg-zinc-800"></div>

        {/* AI Recruiter Card */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl border border-blue-200 dark:border-blue-900 p-4 text-center space-y-3">
          <div className="mx-auto w-16 h-16 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center shadow-md">
            <Image
              src="/robot.png"
              alt="ai"
              width={100}
              height={100}
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">AI Recruiter</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Online</p>
          </div>
        </div>

        {/* User Card */}
        <div className="bg-gray-50 dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 p-4 text-center space-y-3">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
            {interviewInfo?.userName?.[0]}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{interviewInfo?.userName}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Candidate</p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-600 dark:text-gray-400">Session Active</span>
          </div>
        </div>
      </div>

      {/* CHAT PANEL */}
      <div className="flex-1 flex flex-col h-screen bg-white dark:bg-zinc-900">
        <Chat
          onSendReady={(sendMessage) => {
            sendMessageRef.current = sendMessage;
          }}
          interview_id={interviewInfo?.interviewData?.interview_id}
          interviewData={interviewInfo?.interviewData}
        />
      </div>

      {/* CODING PANEL */}
      <div className="flex-1 flex flex-col h-screen bg-gray-50 dark:bg-zinc-950 border-l border-gray-200 dark:border-zinc-800">
        <div className="p-6">
          <CodingQuestion
            onSubmit={({ language, code }) => {
              sendMessageRef.current?.({
                text: JSON.stringify({
                  type: "CODE_SUBMISSION",
                  language,
                  code,
                }),
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default StartInterview;
