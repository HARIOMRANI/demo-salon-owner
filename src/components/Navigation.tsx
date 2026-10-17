import React from 'react';
import { useSalonStore } from '../store/salonStore';
import { TabType } from '../types/salon';

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, walletApprovals } = useSalonStore();

  const navItems: { id: TabType; label: string; icon: string; badge?: number }[] = [
    { id: 'home', label: 'Home', icon: 'dashboard' },
    { id: 'queue', label: 'Queue', icon: 'table_restaurant' },
    { id: 'approvals', label: 'Approvals', icon: 'verified', badge: walletApprovals.length },
    { id: 'menu', label: 'Menu', icon: 'spa' },
    { id: 'billing', label: 'Billing', icon: 'receipt_long' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.06)] border-t border-surface-container-high/60">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-space-xs">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 flex flex-col items-center justify-center min-h-[48px] py-1 transition-all relative group select-none active:scale-95 ${
                isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface font-medium'
              }`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[24px] transition-transform group-hover:scale-105"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-[15px] h-3.5 px-1 rounded-full bg-secondary text-on-secondary text-[8px] flex items-center justify-center font-bold shadow-xs animate-bounce">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] mt-0.5 leading-tight ${isActive ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
                {item.label}
              </span>
              <span
                className={`w-1.5 h-1.5 rounded-full bg-secondary mt-0.5 transition-all duration-200 ${
                  isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
};
