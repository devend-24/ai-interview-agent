import React from 'react';
import { CheckCircle, Zap, Brain, Mic, FileText } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 bg-white border-b">
        <div className="text-2xl font-bold text-blue-600 tracking-tight">Hire Smart</div>
        <div className="space-x-8 hidden md:flex font-medium text-slate-600">
          <a href="#features" className="hover:text-blue-600 transition">Features</a>
          <a href="#how-it-works" className="hover:text-blue-600 transition">How it Works</a>
        </div>
        <Link href="/auth">
          <button className="px-6 py-2 rounded-full font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95 cursor-pointer text-slate-700 dark:text-slate-200">
            Log In
          </button>
        </Link>
        <Link href="/dashboard">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition">
            Get Started
          </button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Screen Candidates <span className="text-blue-600">10x Faster</span> with AI
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          Automate resume scoring, technical assessments, and voice interviews. Get a comprehensive PDF report for every candidate—without lifting a finger.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button className="bg-slate-900 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-slate-800 transition">
            Start Free Pilot
          </button>
          <button className="border border-slate-300 px-8 py-4 rounded-lg text-lg font-bold hover:bg-slate-100 transition">
            Watch Demo
          </button>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="bg-white py-20 border-y">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center mb-16">The Intelligent Screening Suite</h2>
          <div className="grid md:grid-cols-3 gap-12">
            
            {/* LLM Resume Scoring */}
            <div className="p-6 rounded-2xl bg-slate-50 hover:shadow-lg transition">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Brain size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">LLM Resume Scoring</h3>
              <p className="text-slate-600">Context-aware scoring that matches resumes against job requirements with human-level nuance.</p>
            </div>

            {/* Voice AI Interviews */}
            <div className="p-6 rounded-2xl bg-slate-50 hover:shadow-lg transition">
              <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Mic size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Retell AI Voice Agent</h3>
              <p className="text-slate-600">Conduct natural-sounding HR and tech interviews to evaluate soft skills and culture fit automatically.</p>
            </div>

            {/* PDF Reports */}
            <div className="p-6 rounded-2xl bg-slate-50 hover:shadow-lg transition">
              <div className="bg-green-100 text-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FileText size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Automated PDF Reports</h3>
              <p className="text-slate-600">Instant generation of candidate performance summaries, ready for your recruitment team to review.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Technical Workflow Section */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-8 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Technical Evaluation Without the Headache</h2>
            <ul className="space-y-4">
              {[
                "Deep-dive technical problem solving via LLM",
                "Real-time voice-to-text interview transcription",
                "Standardized scoring to eliminate bias",
                "Seamless integration with your existing ATS"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle className="text-blue-500" size={20} />
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-900 rounded-xl p-8 text-blue-400 font-mono text-sm shadow-2xl">
            <p className="mb-2">// Automated Assessment Pipeline</p>
            <p className="text-white">const report = await AI.evaluate(candidate);</p>
            <p className="mt-4 text-slate-500">{"{"}</p>
            <p className="ml-4">resumeScore: 94,</p>
            <p className="ml-4">softSkills: "Excellent",</p>
            <p className="ml-4">technicalRank: "Senior",</p>
            <p className="ml-4 text-green-400">status: "Recommended"</p>
            <p className="text-slate-500">{"}"}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-8 text-center">
        <p>© 2026 AutoHire AI. All rights reserved.</p>
      </footer>
    </div>
  );
}