import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Copy } from 'lucide-react';

export default function UpgradePage() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [copied, setCopied] = useState('');

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0D367A] font-poppins">
      {/* HEADER SECTION */}
      <div className="w-full pt-[48px] pb-[10px] px-6 relative">
        <button 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft size={28} color="white" />
        </button>
        
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-white text-[30px] font-bold tracking-tight">Premium</h1>
            <p className="text-white/70 text-[13px] leading-[1.4] mt-2 max-w-[200px]">
              Access exclusive tools with Premium membership.
            </p>
          </div>
          <div className="absolute right-[-10px] top-[40px] w-[140px] h-auto">
            <img 
              src="/assets/premium.png" 
              alt="Premium Crown" 
              className="w-full h-auto object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
        </div>
      </div>

      {/* CONTENT ROUNDED CONTAINER */}
      <div className="flex-1 bg-white rounded-t-[36px] w-full px-6 pt-8 pb-10 mt-4 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
        
        {/* PLANS */}
        <h2 className="text-[18px] font-bold text-[#0F172A] mb-4">Choose a Plan</h2>
        <div className="flex flex-col space-y-3 mb-8">
          {[
            { id: 'monthly', name: 'Monthly Plan', price: '199 ETB', duration: 'per month' },
            { id: 'quarterly', name: 'Quarterly Plan', price: '499 ETB', duration: 'per 3 months', badge: 'Save 15%' },
            { id: 'annual', name: 'Annual Plan', price: '1,499 ETB', duration: 'per year', badge: 'Best Value' },
          ].map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative p-4 rounded-[16px] border-[2px] transition-all text-left flex items-center justify-between ${
                selectedPlan === plan.id 
                  ? 'border-[#FFD000] bg-[#FFD000]/10 shadow-[0_4px_12px_rgba(255,208,0,0.15)]' 
                  : 'border-[#E2E8F0] bg-white'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`font-bold text-[16px] ${selectedPlan === plan.id ? 'text-[#0D367A]' : 'text-[#1F2937]'}`}>
                    {plan.name}
                  </h3>
                  {plan.badge && (
                    <span className="bg-[#22C55E]/10 text-[#22C55E] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <p className="text-[13px] text-[#64748B] mt-1">{plan.duration}</p>
              </div>
              <div className="text-right">
                <span className={`font-extrabold text-[18px] ${selectedPlan === plan.id ? 'text-[#0D367A]' : 'text-[#1F2937]'}`}>
                  {plan.price}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* PAYMENT INSTRUCTIONS */}
        <h2 className="text-[18px] font-bold text-[#0F172A] mb-4">Payment Methods</h2>
        <div className="bg-[#F8FAFC] rounded-[16px] p-4 border border-[#E2E8F0] mb-8">
          
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-3">
              <div className="w-[40px] h-[40px] bg-[#00A14F]/10 rounded-[10px] flex items-center justify-center text-[#00A14F] font-bold text-[18px]">
                CBE
              </div>
              <div>
                <p className="text-[12px] text-[#64748B]">Commercial Bank of Ethiopia</p>
                <p className="text-[15px] font-bold text-[#1F2937]">1000123456789</p>
              </div>
            </div>
            <button 
              onClick={() => handleCopy('1000123456789', 'CBE Account')}
              className="p-2 text-[#0D367A] hover:bg-[#0D367A]/10 rounded-full"
            >
              {copied === 'CBE Account' ? <CheckCircle2 size={20} color="#22C55E" /> : <Copy size={20} />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-[40px] h-[40px] bg-[#00AEEF]/10 rounded-[10px] flex items-center justify-center text-[#00AEEF] font-bold text-[18px]">
                TB
              </div>
              <div>
                <p className="text-[12px] text-[#64748B]">Telebirr</p>
                <p className="text-[15px] font-bold text-[#1F2937]">0911234567</p>
              </div>
            </div>
            <button 
              onClick={() => handleCopy('0911234567', 'Telebirr')}
              className="p-2 text-[#0D367A] hover:bg-[#0D367A]/10 rounded-full"
            >
              {copied === 'Telebirr' ? <CheckCircle2 size={20} color="#22C55E" /> : <Copy size={20} />}
            </button>
          </div>
        </div>

        {/* ACTIVATION INSTRUCTIONS */}
        <h2 className="text-[18px] font-bold text-[#0F172A] mb-4">How to Activate?</h2>
        <div className="flex flex-col space-y-4 mb-8">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-[#0D367A] text-white flex items-center justify-center font-bold shrink-0">1</div>
            <p className="text-[14px] text-[#475569] mt-1">Make the payment using CBE or Telebirr to the accounts above.</p>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-[#0D367A] text-white flex items-center justify-center font-bold shrink-0">2</div>
            <p className="text-[14px] text-[#475569] mt-1">Take a screenshot of the completed transaction receipt.</p>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-[#0D367A] text-white flex items-center justify-center font-bold shrink-0">3</div>
            <p className="text-[14px] text-[#475569] mt-1">Send the screenshot to our Telegram support to get activated instantly.</p>
          </div>
        </div>

        <a 
          href="https://t.me/Scorenova" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center bg-[#0D367A] text-white rounded-[16px] py-4 font-bold text-[16px] shadow-[0_4px_12px_rgba(13,54,122,0.25)] active:scale-[0.98] transition-transform"
        >
          <img src="https://api.iconify.design/logos:telegram.svg" alt="Telegram" className="w-6 h-6 mr-3" />
          Send Receipt via Telegram
        </a>
      </div>
    </div>
  );
}
