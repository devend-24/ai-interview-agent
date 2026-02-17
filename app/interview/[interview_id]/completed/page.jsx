"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { CheckCircle2, Home, FileText, Star } from "lucide-react";

export default function InterviewComplete() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        
        {/* Success Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
          
          {/* Header with Checkmark */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Interview Completed!</h1>
            <p className="text-green-100">Great job on completing your AI interview session</p>
          </div>

          {/* Content */}
          <div className="p-8">
            
            {/* Image */}
            <div className="flex justify-center mb-8">
              <Image
                src="/interview_complete.jpg"
                alt="Interview Complete"
                width={400}
                height={400}
                className="w-64 h-auto rounded-lg shadow-md"
              />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">8</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Questions</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-900">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">25:43</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Duration</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  <Star className="w-6 h-6 mx-auto fill-current" />
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Completed</div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                📧 Your detailed feedback report will be sent to your email within 24 hours
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => router.push("/dashboard")}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <Home className="w-5 h-5" />
                Dashboard
              </button>
              <button
                onClick={() => router.push("/feedback")}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors shadow-md"
              >
                <FileText className="w-5 h-5" />
                View Feedback
              </button>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Thank you for using our AI Interview Platform. Keep practicing! 🚀
        </p>
      </div>
    </div>
  );
}