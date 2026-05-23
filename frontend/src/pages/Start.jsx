import React, { useState } from 'react';
import { startChallenge } from '../api';
import { useNavigate } from 'react-router-dom';

function Start() {
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('7');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleStart = async () => {
    if (!email) return;
    setIsLoading(true);
    try {
      await startChallenge(email, plan);
      navigate(`/dashboard/${email}`);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1a1a1a] font-sans flex items-center justify-center p-6 selection:bg-indigo-100">
      <div className="max-w-md w-full">
        
        {/* Minimal Header */}
        <header className="mb-12 text-center">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl mb-6 mx-auto shadow-lg shadow-indigo-200 flex items-center justify-center">
             <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Welcome back
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            Enter your details to begin your journey.
          </p>
        </header>

        {/* Input Card */}
        <div className="bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100">
          <div className="space-y-8">
            
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-slate-400 ml-1">
                Email Address
              </label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Plan Selector */}
            <div className="space-y-3">
              <label className="text-xs font-medium uppercase tracking-wider text-slate-400 ml-1">
                Select Duration
              </label>
              <div className="flex p-1 bg-slate-100 rounded-2xl">
                {['7', '14', '30'].map((d) => (
                  <button
                    key={d}
                    onClick={() => setPlan(d)}
                    className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all ${
                      plan === d 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {d} Days
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button 
              onClick={handleStart}
              disabled={isLoading || !email}
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-semibold hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:bg-slate-300 shadow-xl shadow-indigo-200"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Starting...
                </span>
              ) : (
                "Start Challenge"
              )}
            </button>
          </div>
        </div>

        {/* Minimal Footer */}
        <footer className="mt-10 flex flex-col items-center gap-4">
          <p className="text-xs text-slate-400 font-medium">
            Step 1 of 3 <span className="mx-2 text-slate-200">|</span> Setup
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Start;