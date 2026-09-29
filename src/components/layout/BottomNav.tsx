import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, Scan, FileText, User } from 'lucide-react';

const navItems = [
  { path: '/home', icon: Home, label: 'Home' },
  { path: '/practice', icon: BookOpen, label: 'Practice' },
  { path: '/scanner', icon: Scan, label: 'Scanner' },
  { path: '/mock-exams', icon: FileText, label: 'Exams' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  // Find active index
  const currentIndex = navItems.findIndex(item => location.pathname.startsWith(item.path));
  const activeIndex = currentIndex === -1 ? 0 : currentIndex;

  // Calculate position for the floating active circle (assuming 5 equal tabs)
  // We offset based on percentage to handle responsiveness.
  const percentage = (activeIndex * 20) + 10; // Center of each 20% slot

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[88px] px-4 pb-4 pt-0 z-50 pointer-events-none">
      <div className="relative w-full h-[72px] pointer-events-auto">
        
        {/* The SVG background forming the notch */}
        <div className="absolute inset-0 overflow-hidden rounded-[24px]">
          <svg className="w-full h-full drop-shadow-[0_-4px_20px_rgba(0,0,0,0.06)]" preserveAspectRatio="none" viewBox="0 0 400 72">
            <defs>
              <filter id="shadow">
                <feDropShadow dx="0" dy="-4" stdDeviation="10" floodOpacity="0.06" />
              </filter>
            </defs>
            <path
              fill="#FFFFFF"
              filter="url(#shadow)"
              d="M0,24 C0,10.745 10.745,0 24,0 L400,0 C413.255,0 424,10.745 424,24 L424,72 L0,72 Z"
            />
          </svg>
        </div>

        {/* The floating yellow circle */}
        <div 
          className="absolute top-[-22px] w-[56px] h-[56px] bg-[#FFD000] rounded-full flex items-center justify-center transition-all duration-300 ease-out z-10"
          style={{ 
            left: `calc(${percentage}% - 28px)`,
            boxShadow: '0 4px 12px rgba(255, 208, 0, 0.4)'
          }}
        >
          {React.createElement(navItems[activeIndex]?.icon || Home, {
            size: 26,
            color: '#0D367A',
            strokeWidth: 2.5
          })}
        </div>

        {/* The clickable tab areas */}
        <div className="absolute inset-0 flex">
          {navItems.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex-1 h-full flex flex-col items-center justify-center pt-2 relative z-20 focus:outline-none"
              >
                <div className={`transition-all duration-300 ${isActive ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
                  {React.createElement(item.icon, {
                    size: 24,
                    color: '#CBD5E1',
                    className: 'mb-1'
                  })}
                </div>
                {/* Optional label if we wanted, but Flutter hides it or shows it? 
                    In Flutter, the label isn't used in the animated circle, just the icon.
                    Actually, looking at `SolaBottomNavBar`, it just uses icons.
                */}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
