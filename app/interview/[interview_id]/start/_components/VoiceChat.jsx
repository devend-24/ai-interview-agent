"use client";

import { useEffect, useState } from "react";

export default function VoiceChat({ onSendMessage }) {
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRec =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRec) {
      console.error("Speech Recognition not supported");
      return;
    }

    const rec = new SpeechRec();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      onSendMessage(transcript);
    };

    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);

    setRecognition(rec);
  }, [onSendMessage]);

  const toggleListening = () => {
    if (!recognition) return;
    if (listening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setListening(!listening);
  };

  return (
    <button
  type="button"
  onClick={toggleListening}
  className={`p-2 rounded-full transition-all ${
    listening 
      ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" 
      : "hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500"
  }`}
  title={listening ? "Stop recording" : "Start voice input"}
>
  {listening ? (
    <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 3a3 3 0 00-3 3v4a3 3 0 006 0V6a3 3 0 00-3-3z"/>
      <path d="M5.5 10a.5.5 0 01.5.5v.5a4 4 0 008 0v-.5a.5.5 0 011 0v.5a5 5 0 01-4.5 4.975V17h2a.5.5 0 010 1h-5a.5.5 0 010-1h2v-1.025A5 5 0 015 11.5v-.5a.5.5 0 01.5-.5z"/>
    </svg>
  ) : (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 3a3 3 0 00-3 3v4a3 3 0 006 0V6a3 3 0 00-3-3z"/>
      <path d="M5.5 10a.5.5 0 01.5.5v.5a4 4 0 008 0v-.5a.5.5 0 011 0v.5a5 5 0 01-4.5 4.975V17h2a.5.5 0 010 1h-5a.5.5 0 010-1h2v-1.025A5 5 0 015 11.5v-.5a.5.5 0 01.5-.5z"/>
    </svg>
  )}
</button>
  );
}