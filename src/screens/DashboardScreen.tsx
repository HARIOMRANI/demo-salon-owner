import React, { useState } from 'react';
import { useSalonStore } from '../store/salonStore';
import { ChairStatus } from '../types/salon';
import { WalkInModal } from '../components/WalkInModal';
import { StaffTipModal } from '../components/StaffTipModal';
import { QuickBillModal } from '../components/QuickBillModal';
import { ChairDetailModal } from '../components/ChairDetailModal';
import { AutoPayModal } from '../components/AutoPayModal';
import {
  Sparkles,
  Timer,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  UserPlus,
  Heart,
  Receipt,
  Crown,
  Medal,
  Award,
  ChevronRight,
} from 'lucide-react';

interface DashboardScreenProps {
  onSuccessToast: (msg: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onSuccessToast }) => {
  const {
    salonProfile,
    todayGross,
    weeklyRun,
    walletApprovals,
    chairs,
    vips,
    setActiveTab,
  } = useSalonStore();

  const [isWalkInOpen, setIsWalkInOpen] = useState(false);
  const [isTipOpen, setIsTipOpen] = useState(false);
  const [isQuickBillOpen, setIsQuickBillOpen] = useState(false);
  const [isAutoPayOpen, setIsAutoPayOpen] = useState(false);
  const [selectedChair, setSelectedChair] = useState<ChairStatus | null>(null);

  const pendingApprovalsTotal = walletApprovals.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="flex flex-col w-full px-space-md py-space-sm space-y-4 max-w-md mx-auto pb-24 pt-16">
      {/* Header Greeting & Status */}
      <div className="flex flex-col space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h1 className="font-bold text-lg text-on-surface tracking-tight">
              Welcome, {salonProfile.name.split(' ')[0]} Salon
            </h1>
            <Sparkles className="w-4 h-4 text-secondary" />
          </div>
          <div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface text-[10px] font-semibold shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            Today, 24 Oct
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant text-[10px] font-medium">
            <span className="material-symbols-outlined text-[13px] text-secondary">chair</span>
            All 6 Chairs Stationed
          </span>
        </div>
      </div>

      {/* Free Trial Countdown Banner */}
      <div className="relative overflow-hidden rounded-xl bg-secondary-fixed text-on-secondary-fixed p-3.5 shadow-xs border border-secondary/20">
        <div className="absolute -right-4 -bottom-6 w-28 h-28 rounded-full bg-secondary-container/20 blur-xl pointer-events-none" />
        <div className="relative flex items-center justify-between gap-2">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center flex-shrink-0 text-secondary shadow-xs">
              <Timer className="w-4 h-4 text-secondary" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] uppercase tracking-wider font-bold text-on-secondary-fixed-variant">Special Early Access</span>
                <span className="w-1 h-1 rounded-full bg-secondary" />
                <span className="text-[10px] font-bold text-secondary">14 Days Left</span>
              </div>
              <p className="font-bold text-xs text-on-secondary-fixed truncate mt-0.5">Pro Trial Active</p>
              <p className="text-[10px] text-on-secondary-fixed-variant">Lock in ₹1,000/mo Early Bird Rate</p>
            </div>
          </div>
          <button
            onClick={() => setIsAutoPayOpen(true)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full bg-primary text-on-primary font-bold text-xs shadow-xs active:scale-95 transition-transform flex items-center gap-1"
          >
            <span>Upgrade</span>
            <ArrowRight className="w-3 h-3 text-secondary-fixed" />
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Today's Gross */}
        <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-xs flex flex-col justify-between border border-surface-container-high/40 min-h-[115px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Today's Gross</span>
            <div className="w-6 h-6 rounded-lg bg-secondary-fixed/50 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[14px]">payments</span>
            </div>
          </div>
          <div className="my-0.5">
            <span className="font-bold text-xl text-on-surface tracking-tight block">
              ₹{todayGross.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-flex items-center gap-0.5 px-1 py-0.2 rounded bg-secondary-fixed text-on-secondary-fixed text-[9px] font-bold">
              <TrendingUp className="w-2.5 h-2.5" />
              +18%
            </span>
            <span className="text-[10px] text-on-surface-variant">vs yesterday</span>
          </div>
        </div>

        {/* Weekly Run */}
        <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-xs flex flex-col justify-between border border-surface-container-high/40 min-h-[115px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Weekly Run</span>
            <div className="w-6 h-6 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant">
              <span className="material-symbols-outlined text-[14px]">insights</span>
            </div>
          </div>
          <div className="my-0.5">
            <span className="font-bold text-xl text-on-surface tracking-tight block">
              ₹{weeklyRun.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex items-center justify-between gap-1">
            <svg className="w-16 h-4 text-secondary overflow-visible" fill="none" viewBox="0 0 80 20">
              <path
                d="M2 17 L14 14 L26 15 L38 8 L50 11 L62 5 L78 2"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <circle cx="78" cy="2" fill="currentColor" r="2.5" />
            </svg>
            <span className="text-[9px] text-on-surface-variant font-medium">7d trend</span>
          </div>
        </div>
      </div>

      {/* Pending Approvals Link Card */}
      <button
        onClick={() => setActiveTab('approvals')}
        className="w-full bg-surface-container-lowest rounded-xl p-3.5 shadow-xs flex items-center justify-between border border-surface-container-high/50 text-left active:scale-[0.99] transition-transform group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-error-container text-on-error-container flex items-center justify-center font-bold flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-error" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs text-on-surface">Wallet Approvals Queue</span>
              {walletApprovals.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-error animate-ping" />
              )}
            </div>
            <p className="text-[11px] text-on-surface-variant mt-0.5">
              {walletApprovals.length} waiting • ₹{pendingApprovalsTotal.toLocaleString('en-IN')} total to credit
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-secondary text-xs font-bold flex-shrink-0">
          <span>Review</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </button>

      {/* Direct Actions (Instant Desk) */}
      <div className="flex flex-col space-y-1.5">
        <div className="flex items-center justify-between px-0.5">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Direct Actions</span>
          <span className="text-[10px] text-secondary font-semibold">Instant Desk</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {/* Walk-in Client */}
          <button
            onClick={() => setIsWalkInOpen(true)}
            className="bg-surface-container-lowest hover:bg-surface-container rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all text-center border border-surface-container-high/40"
          >
            <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-xs">
              <UserPlus className="w-4 h-4 text-secondary-fixed" />
            </div>
            <span className="text-[11px] font-bold text-on-surface leading-tight">Walk-in Client</span>
          </button>

          {/* Staff Tip */}
          <button
            onClick={() => setIsTipOpen(true)}
            className="bg-surface-container-lowest hover:bg-surface-container rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all text-center border border-surface-container-high/40"
          >
            <div className="w-9 h-9 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shadow-xs">
              <Heart className="w-4 h-4 text-secondary" />
            </div>
            <span className="text-[11px] font-bold text-on-surface leading-tight">Staff Tip</span>
          </button>

          {/* Quick Bill */}
          <button
            onClick={() => setIsQuickBillOpen(true)}
            className="bg-surface-container-lowest hover:bg-surface-container rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all text-center border border-surface-container-high/40"
          >
            <div className="w-9 h-9 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center shadow-xs">
              <Receipt className="w-4 h-4 text-secondary" />
            </div>
            <span className="text-[11px] font-bold text-on-surface leading-tight">Quick Bill</span>
          </button>
        </div>
      </div>

      {/* Live Chair Dynamics (C1–C5 & SPA Suite) */}
      <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-xs flex flex-col space-y-2 border border-surface-container-high/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[17px] text-secondary">sensor_occupied</span>
            <h2 className="font-bold text-xs text-on-surface">Live Chair Dynamics</h2>
          </div>
          <span className="text-[10px] text-secondary font-semibold">Tap to inspect</span>
        </div>

        <div className="grid grid-cols-6 gap-1.5 py-1">
          {chairs.map((chair) => (
            <button
              key={chair.id}
              onClick={() => setSelectedChair(chair)}
              className={`flex flex-col items-center gap-1 p-1.5 rounded-lg text-center transition-all active:scale-90 ${
                chair.isOccupied
                  ? chair.id === 'SPA'
                    ? 'bg-secondary-fixed/40 border border-secondary/30'
                    : 'bg-surface-container border border-surface-container-high'
                  : 'bg-surface-container-low border border-dashed border-outline-variant hover:bg-surface-container'
              }`}
            >
              <span className="text-[9px] font-bold text-on-surface-variant">{chair.label}</span>
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  chair.isOccupied
                    ? chair.status === 'Color Processing'
                      ? 'bg-secondary animate-pulse'
                      : chair.id === 'SPA'
                      ? 'bg-secondary-container'
                      : 'bg-primary'
                    : 'bg-green-500'
                }`}
                title={chair.status}
              />
              <span className="text-[8px] font-medium text-on-surface truncate w-full">
                {chair.isOccupied ? chair.clientName?.split(' ')[0] || 'Seated' : 'Ready'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Top VIP Customers (Loyalty Leaderboard) */}
      <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-xs flex flex-col space-y-2.5 border border-surface-container-high/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
              military_tech
            </span>
            <h2 className="font-bold text-xs text-on-surface">Top VIP Customers</h2>
          </div>
          <span className="text-[10px] text-on-surface-variant font-medium">Loyalty Leaderboard</span>
        </div>

        <div className="flex flex-col space-y-2">
          {vips.map((vip) => (
            <div
              key={vip.rank}
              className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low/70 hover:bg-surface-container transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative w-8 h-8 flex-shrink-0">
                  <img
                    src={vip.avatarUrl}
                    alt={vip.name}
                    className="w-8 h-8 rounded-full object-cover shadow-xs"
                  />
                  <span className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-secondary text-on-secondary text-[8px] flex items-center justify-center font-bold shadow-xs">
                    {vip.rank}
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-on-surface truncate">{vip.name}</span>
                    <span className="inline-flex items-center px-1.5 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[8px] font-bold">
                      {vip.rank === 1 ? <Crown className="w-2.5 h-2.5 mr-0.5" /> : <Medal className="w-2.5 h-2.5 mr-0.5" />}
                      {vip.tier}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-on-surface-variant">
                    <span>{vip.visits} Visits</span>
                    <span>•</span>
                    <span className="text-secondary font-medium truncate">{vip.favoriteService}</span>
                  </div>
                </div>
              </div>

              <div className="text-right flex-shrink-0 pl-2">
                <span className="font-bold text-xs text-on-surface block">
                  ₹{vip.lifetimeSpend.toLocaleString('en-IN')}
                </span>
                <span className="text-[8px] text-on-surface-variant font-medium">Lifetime</span>
              </div>
            </div>
          ))}
        </div>

        {/* Client Retention Footnote */}
        <div className="pt-1 flex items-center justify-between border-t border-surface-container-high/60 text-[10px]">
          <span className="text-on-surface-variant">VIP Repeat Frequency</span>
          <span className="text-secondary font-bold">89.4% (Top 5% in Bangalore)</span>
        </div>
      </div>

      {/* Modals */}
      <WalkInModal
        isOpen={isWalkInOpen}
        onClose={() => setIsWalkInOpen(false)}
        onSuccess={onSuccessToast}
      />
      <StaffTipModal
        isOpen={isTipOpen}
        onClose={() => setIsTipOpen(false)}
        onSuccess={onSuccessToast}
      />
      <QuickBillModal
        isOpen={isQuickBillOpen}
        onClose={() => setIsQuickBillOpen(false)}
        onSuccess={onSuccessToast}
      />
      <ChairDetailModal
        chair={selectedChair}
        onClose={() => setSelectedChair(null)}
        onBookWalkin={() => {
          setSelectedChair(null);
          setIsWalkInOpen(true);
        }}
        onViewQueue={() => {
          setSelectedChair(null);
          setActiveTab('queue');
        }}
      />
      <AutoPayModal
        isOpen={isAutoPayOpen}
        onClose={() => setIsAutoPayOpen(false)}
        planTitle="12 Months (Annual)"
        billedTotal="12,000"
        monthlyRate="1,000"
        onSuccess={onSuccessToast}
      />
    </div>
  );
};
