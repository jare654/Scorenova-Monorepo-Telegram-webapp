import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { apiClient } from '@/lib/api';
import { getInitData } from '@/lib/telegram';
import { useAuthStore } from '@/lib/store';
import { haptic } from '@/lib/telegram';

export default function ProfileSetupPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);
  const [fullName, setFullName] = useState('');
  const [stream, setStream] = useState<'natural' | 'social'>('natural');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      haptic('error');
      return;
    }
    
    setIsLoading(true);
    try {
      const initData = getInitData();
      const response = await apiClient.post('/telegram/auth/complete-profile', {
        initData,
        name: fullName,
        streamId: stream,
        gender
      });
      const { accessToken, refreshToken, user } = (response as any).data || response;
      apiClient.setTokens(accessToken, refreshToken);
      setUser(user);
      haptic('success');
      navigate('/');
    } catch (error) {
      console.error(error);
      haptic('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-50 dark:bg-[#08101F] text-slate-900 dark:text-white font-poppins p-6 flex flex-col"
    >
      <div className="mt-8 mb-8">
        <h1 className="text-3xl font-bold mb-2">Complete Profile</h1>
        <p className="text-slate-500 dark:text-slate-400">Tell us a bit about yourself to personalize your experience.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Full Name</label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[20px] px-4 py-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Academic Stream</label>
          <div className="grid grid-cols-2 gap-3">
            {(['natural', 'social'] as const).map((s) => (
              <div
                key={s}
                onClick={() => {
                  setStream(s);
                  haptic('selection');
                }}
                className={`border rounded-[20px] p-4 text-center cursor-pointer transition-all ${
                  stream === s 
                    ? 'border-primary bg-primary/10 text-primary font-semibold' 
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {s === 'natural' ? 'Natural Science' : 'Social Science'}
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Gender</label>
          <div className="grid grid-cols-2 gap-3">
            {(['male', 'female'] as const).map((g) => (
              <div
                key={g}
                onClick={() => {
                  setGender(g);
                  haptic('selection');
                }}
                className={`border rounded-[20px] p-4 text-center cursor-pointer transition-all ${
                  gender === g 
                    ? 'border-primary bg-primary/10 text-primary font-semibold' 
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-3 mt-2">
          <input
            type="checkbox"
            id="terms"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-1 w-5 h-5 rounded accent-primary"
          />
          <label htmlFor="terms" className="text-sm text-slate-500 dark:text-slate-400">
            I agree to the <span className="text-primary cursor-pointer">Terms of Service</span> and <span className="text-primary cursor-pointer">Privacy Policy</span>.
          </label>
        </div>

        <div className="mt-auto pt-6 flex flex-col gap-4">
          <button
            type="submit"
            disabled={!acceptedTerms || isLoading || !fullName.trim()}
            className="w-full h-[58px] bg-primary text-white rounded-[20px] font-semibold text-lg shadow-[0_2px_8px_rgba(0,26,66,0.08)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? 'Loading...' : 'Create Account'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/link-phone')}
            className="text-primary font-semibold text-sm"
          >
            I already have an account
          </button>
        </div>
      </form>
    </motion.div>
  );
}
