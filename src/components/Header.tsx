import React, { useState } from 'react';
import { useSalonStore } from '../store/salonStore';
import { Bell, RotateCcw, Check } from 'lucide-react';

interface HeaderProps {
  onNotifyClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNotifyClick }) => {
  const { salonProfile, walletApprovals, resetDemoData, setActiveTab, activeTab } = useSalonStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleReset = () => {
    resetDemoData();
    setShowResetConfirm(true);
    setTimeout(() => setShowResetConfirm(false), 2000);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe transition-all border-b border-surface-container-high/40">
      <div className="h-16 px-space-md flex items-center justify-between gap-space-sm max-w-md mx-auto">
        {/* Salon Logo & Name Identity */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-9 h-9 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-md flex-shrink-0">
            <span className="material-symbols-outlined text-[20px] text-secondary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>
              spa
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[15px] text-on-surface truncate leading-tight tracking-tight">
                {salonProfile.name || 'Sharma Luxury Salon'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold text-[10px] leading-none">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary mr-1 animate-pulse" />
                Live Floor
              </span>
              <span className="text-[11px] text-on-surface-variant font-medium truncate">
                • {activeTab === 'home' ? 'Overview' : activeTab === 'queue' ? 'Queue' : activeTab === 'approvals' ? 'Approvals' : activeTab === 'menu' ? 'Menu' : 'Billing'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* 1-Click Reset Demo Data Button */}
          <button
            onClick={handleReset}
            title="Reset All Demo Data"
            className="px-2.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center gap-1 text-[11px] font-semibold transition-all active:scale-95 shadow-xs"
          >
            {showResetConfirm ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span className="text-green-600">Reset!</span>
              </>
            ) : (
              <>
                <RotateCcw className="w-3.5 h-3.5 text-secondary" />
                <span className="hidden xs:inline">Reset</span>
              </>
            )}
          </button>

          {/* Pending Approvals Notifications */}
          <button
            onClick={() => {
              if (onNotifyClick) onNotifyClick();
              else setActiveTab('approvals');
            }}
            aria-label="Pending Approvals Notifications"
            className="relative w-9 h-9 flex items-center justify-center rounded-lg text-on-surface hover:bg-surface-container transition-colors"
          >
            <Bell className="w-5 h-5 text-on-surface" />
            {walletApprovals.length > 0 && (
              <span className="absolute top-1.5 right-1 min-w-[15px] h-4 px-1 rounded-full bg-secondary text-on-secondary text-[9px] flex items-center justify-center font-bold shadow-xs animate-pulse">
                {walletApprovals.length}
              </span>
            )}
          </button>

          {/* Owner Profile Avatar */}
          <button
            onClick={() => setActiveTab('billing')}
            className="w-9 h-9 flex items-center justify-center rounded-full ring-1 ring-surface-container-high hover:ring-2 hover:ring-secondary/40 transition-all overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
              alt="Owner"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
