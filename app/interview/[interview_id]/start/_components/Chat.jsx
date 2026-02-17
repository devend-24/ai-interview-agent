"use client";

import { useChat } from "@ai-sdk/react";
import { useRef, useState, useEffect, useContext } from "react";
import VoiceChat from "./VoiceChat";
import { supabase } from "@/services/supabaseClient";
import { InterviewDataContext } from "@/context/InterviewDataContext";




// Pick the best available female-ish voice
function getFemaleVoice() {
  const voices = window.speechSynthesis.getVoices();

  return (
    voices.find(
      (v) =>
        v.lang.startsWith("en") &&
        /female|zira|susan|natasha|samantha|victoria|google us english/i.test(
          v.name
        )
    ) ||
    voices.find((v) => v.lang.startsWith("en-US")) ||
    voices[0]
  );
}

export default function Chat({ onSendReady, interview_id, interviewData }) {
    console.log("🎯 Interview ID received in Chat component:", interview_id);

  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat({
    api: `/api/voice-chat?interview_id=${interview_id}`,
    body: {
      interviewData, // 👈 send it here
    },
  });
  const speakTimeoutRef = useRef(null);
  const messagesEndRef = useRef(null);
  // const [conversation, setConversation] = useState();
  const [showEndCallModal, setShowEndCallModal] = useState(false);
  const { interviewInfo } = useContext(InterviewDataContext);
  
  console.log(messages);


  // Ensure voices are loaded (important for Chrome)
  useEffect(() => {
    console.table(
      window.speechSynthesis.getVoices().map((v) => ({
        name: v.name,
        lang: v.lang,
      }))
    );
  }, []);

  // expose sendMessage upward ONCE
  useEffect(() => {
    onSendReady?.(sendMessage);
  }, [sendMessage]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message (text or voice)
  const handleSendMessage = (text) => {
    if (!text.trim()) return;
    sendMessage({ text });
  };

  // TTS logic (natural + stable)
  useEffect(() => {
    if (!messages.length) return;

    const last = messages[messages.length - 1];
    if (last.role !== "assistant") return;

    if (speakTimeoutRef.current) {
      clearTimeout(speakTimeoutRef.current);
    }

    speakTimeoutRef.current = setTimeout(() => {
      const rawText = last.parts
        .filter((p) => p.type === "text")
        .map((p) => p.text)
        .join(" ")
        .trim();

      if (!rawText) return;

      const text = rawText
        .replace(/,/g, ", ")
        .replace(/\./g, ". ")
        .replace(/\?/g, "? ")
        .replace(/:/g, ": ");

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = getFemaleVoice();
      utterance.lang = "en-US";
      utterance.rate = 0.98;
      utterance.pitch = 1.05;
      utterance.volume = 1.0;

      window.speechSynthesis.speak(utterance);
    }, 1000);
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto h-screen suppressHydrationWarning">
      {/* Messages - Scrollable with minimal scrollbar */}
      <div 
        className="flex-1 overflow-y-auto px-6 py-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent"
        ref={messagesEndRef}
      >
        {messages.map((message) => {
          const isUser = message.role === "user";

          // 🔒 Check if it's a CODE_SUBMISSION in parts
          if (isUser && message.parts?.length > 0) {
            const textContent = message.parts
              .filter(p => p.type === "text")
              .map(p => p.text)
              .join("");

            try {
              const parsed = JSON.parse(textContent);

              if (parsed.type === "CODE_SUBMISSION") {
                return (
                  <div
                    key={message.id}
                    className="text-center text-sm italic text-gray-500"
                  >
                    💻 Code submitted. Analyzing… ({parsed.language?.toUpperCase()})
                  </div>
                );
              }
            } catch {
              // Not JSON, render normally
            }
          }

          return (
            <div
              key={message.id}
              className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-3 rounded-lg max-w-[75%] ${
                  isUser
                    ? "bg-blue-500 text-white"
                    : "bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700"
                }`}
              >
                {message.parts?.map((part, i) =>
                  part.type === "text" ? (
                    <div key={i} className="whitespace-pre-wrap text-sm leading-relaxed">
                      {part.text}
                    </div>
                  ) : null
                )}
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

{/* Input - Fixed Bottom with integrated mic and end call */}
<div className="border-t dark:border-zinc-800 p-4">
  <form
    onSubmit={(e) => {
      e.preventDefault();
      handleSendMessage(input);
      setInput("");
    }}
    className="relative flex items-center gap-3"
  >
    {/* Mic button on the left */}
    <div className="flex-shrink-0">
      <VoiceChat onSendMessage={handleSendMessage} />
    </div>
    
    {/* Text input in center */}
    <input
      className="flex-1 px-4 py-3 border rounded-full dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800 focus:outline-none focus:border-blue-500"
      value={input}
      placeholder="Say something..."
      onChange={(e) => setInput(e.currentTarget.value)}
    />
    
    {/* End call button on the right */}
    <button
      type="button"
      onClick={() => setShowEndCallModal(true)}
      className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-full transition-colors cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.68-1.36-2.66-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/>
      </svg>
    </button>
  </form>
</div>

      {/* End Call Confirmation Modal */}
      {showEndCallModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 max-w-sm w-[200px] mx-4 shadow-xl">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">End Interview?</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              Are you sure you want to end this interview session?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowEndCallModal(false)}
                className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors dark:text-white cursor-pointer"
              >
                Cancel
              </button>








<button
  onClick={async () => {
    setShowEndCallModal(false);
    
    try {
      // Send conversation to AI feedback API
      const response = await fetch('/api/ai-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversation: messages, // messages from useChat hook
        }),
      });
      
      if (response.ok) {
        const conversation = await response.json();
        console.log('AI Feedback:', conversation);

        const {data, error} = await supabase
          .from('interview-feedback')
          .insert([
            {
              userName: interviewInfo?.userName,
              userEmail: interviewInfo?.userEmail,
              interview_id: interview_id,
              feedback: conversation,
            }
          ])
          .select()
        
        console.log(data);

        // Optional: Store feedback data if needed before redirecting
        // localStorage.setItem('interviewFeedback', JSON.stringify(feedbackData));
        
        // Redirect to completed page
        // window.location.href = `/interview/${interview_id}/completed`;
      } else {
        const error = await response.json();
        console.error('Failed to get AI feedback:', error);
        // Redirect anyway or show error message
        // window.location.href = `/interview/${interview_id}/completed`;
      }
    } catch (error) {
      console.error('Error calling AI feedback API:', error);
      // Redirect anyway or show error message
      // window.location.href = `/interview/${interview_id}/completed`;
    }
  }}
    className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors dark:text-white cursor-pointer"
>
  End Interview
</button>








            </div>
          </div>
        </div>
      )}

      {/* Add to global CSS or tailwind.config.js */}
      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        .dark .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #52525b;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
}