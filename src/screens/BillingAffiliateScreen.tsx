import React, { useState } from 'react';
import { useSalonStore } from '../store/salonStore';
import { AutoPayModal } from '../components/AutoPayModal';
import {
  Sparkles,
  Timer,
  CheckCircle2,
  Copy,
  Check,
  Share2,
  Lock,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

interface BillingAffiliateScreenProps {
  onSuccessToast: (msg: string) => void;
}

export const BillingAffiliateScreen: React.FC<BillingAffiliateScreenProps> = ({ onSuccessToast }) => {
  const { referrals, salonProfile } = useSalonStore();

  const [activeTab, setActiveTab] = useState<'plans' | 'affiliate'>('affiliate');
  const [copied, setCopied] = useState(false);
  const [isAutoPayOpen, setIsAutoPayOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ title: string; total: string; monthly: string }>({
    title: '12 Months (Annual)',
    total: '12,000',
    monthly: '1,000',
  });

  const referralCode = 'SHARMA-ROYAL-99';

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    onSuccessToast('Referral Code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      `Hey! I'm using AuraOS Royal Salon ERP to manage ${salonProfile.name} (live queue, chair tracking & direct UPI billing). Use my exclusive partner code *${referralCode}* to get 50% off your early bird membership! https://auraos.salon/partner`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
    onSuccessToast('WhatsApp referral invite dispatched!');
  };

  const handleOpenPlan = (title: string, total: string, monthly: string) => {
    setSelectedPlan({ title, total, monthly });
    setIsAutoPayOpen(true);
  };

  return (
    <div className="flex flex-col w-full px-space-md py-space-sm space-y-4 max-w-md mx-auto pb-24 pt-16">
      {/* Top Segmented Control Switcher */}
      <div className="w-full bg-surface-container p-1 rounded-xl shadow-xs flex items-center">
        <button
          onClick={() => setActiveTab('plans')}
          className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'plans'
              ? 'bg-surface-container-lowest text-primary shadow-xs'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">workspace_premium</span>
          <span>SaaS Plans & Sub</span>
        </button>

        <button
          onClick={() => setActiveTab('affiliate')}
          className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'affiliate'
              ? 'bg-surface-container-lowest text-primary shadow-xs'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">handshake</span>
          <span>Refer & Earn (Affiliate)</span>
        </button>
      </div>

      {/* ================= TAB 1: SAAS PLANS & SUBSCRIPTION ================= */}
      {activeTab === 'plans' && (
        <div className="flex flex-col space-y-3.5 animate-fade-in">
          {/* Active Plan Status Banner */}
          <div className="relative overflow-hidden bg-surface-container-lowest rounded-xl p-3.5 shadow-xs border border-surface-container-high/60">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed flex-shrink-0">
                  <Timer className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-on-surface">14-Day Pro Trial</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[8px] font-bold">
                      Active
                    </span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">6 Days Remaining • Full indiranagar multi-chair suite</p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-[8px] text-secondary font-bold uppercase tracking-wider block">Lock Price</span>
                <span className="text-xs font-bold text-on-surface">Early Bird Tier</span>
              </div>
            </div>

            {/* Micro Progress Bar */}
            <div className="mt-3 pt-2 flex flex-col gap-1 border-t border-surface-container-high/50">
              <div className="flex justify-between text-[10px] text-on-surface-variant">
                <span>Trial timeline</span>
                <span className="text-on-surface font-bold">Day 8 of 14</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: '57.14%' }} />
              </div>
            </div>
          </div>

          {/* Section Header */}
          <div className="flex items-center justify-between px-0.5">
            <div>
              <h2 className="font-bold text-xs text-on-surface">Select Membership Tier</h2>
              <p className="text-[10px] text-on-surface-variant">Continuous automated chair analytics & VIP billing</p>
            </div>
            <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
              <ShieldCheck className="w-3 h-3 text-secondary" /> Guaranteed Rate
            </span>
          </div>

          {/* Plan 1: Annual 12 Months (BEST VALUE) */}
          <div className="relative bg-primary text-on-primary rounded-xl p-4 shadow-md overflow-hidden flex flex-col gap-3 border border-secondary/30">
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-secondary/20 blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[9px] font-bold">
                <Sparkles className="w-2.5 h-2.5 text-secondary" />
                MOST POPULAR & BEST VALUE
              </span>
              <span className="px-2 py-0.5 rounded-full bg-secondary text-on-secondary text-[8px] font-bold tracking-wide">
                SAVE 50% EARLY BIRD
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <div>
                <h3 className="font-bold text-base text-on-primary">12 Months (Annual)</h3>
                <p className="text-[10px] text-primary-fixed-dim">Total ₹12,000 billed annually (once)</p>
              </div>
              <div className="text-right">
                <div className="flex items-baseline justify-end gap-1">
                  <span className="font-bold text-xl text-secondary-fixed-dim">₹1,000</span>
                  <span className="text-[10px] text-primary-fixed-dim">/ mo</span>
                </div>
                <span className="text-[9px] line-through text-primary-fixed-dim/70">₹2,000 / mo</span>
              </div>
            </div>

            {/* Bullets */}
            <div className="bg-surface-container-highest/10 rounded-lg p-2.5 space-y-1 text-[11px]">
              <div className="flex items-center gap-1.5 text-on-primary">
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary-fixed flex-shrink-0" />
                <span>Free Unlimited WhatsApp SMS Appointment Alerts</span>
              </div>
              <div className="flex items-center gap-1.5 text-on-primary">
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary-fixed flex-shrink-0" />
                <span>Real-time Multi-chair Queue & Stylist Commission Analytics</span>
              </div>
              <div className="flex items-center gap-1.5 text-on-primary">
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary-fixed flex-shrink-0" />
                <span>Priority Royal Concierge & Dedicated Account Manager</span>
              </div>
            </div>

            <button
              onClick={() => handleOpenPlan('Annual - 12 Months', '12,000', '1,000')}
              className="w-full py-2.5 px-3 rounded-lg bg-secondary text-on-secondary font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.99] transition-transform hover:opacity-95"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock ₹1,000/mo Early Bird Access</span>
            </button>
          </div>

          {/* Secondary Plan Options: Quarterly & Monthly */}
          <div className="space-y-2">
            {/* 6 Months */}
            <div className="bg-surface-container-lowest rounded-xl p-3 shadow-xs border border-surface-container-high/60 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-xs text-on-surface">6 Months (Bi-Annual)</h3>
                  <span className="px-1.5 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[8px] font-bold">
                    Save 25%
                  </span>
                </div>
                <p className="text-[10px] text-on-surface-variant">Total ₹9,000 every 6 months</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="font-bold text-xs text-on-surface">₹1,500</span>
                  <span className="text-[9px] text-on-surface-variant block">/ month</span>
                </div>
                <button
                  onClick={() => handleOpenPlan('Bi-Annual - 6 Months', '9,000', '1,500')}
                  className="py-1.5 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-xs transition-colors"
                >
                  Select
                </button>
              </div>
            </div>

            {/* 1 Month */}
            <div className="bg-surface-container-lowest rounded-xl p-3 shadow-xs border border-surface-container-high/60 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-xs text-on-surface">1 Month Flexible</h3>
                  <span className="px-1.5 py-0.2 rounded-full bg-surface-container text-on-surface-variant text-[8px] font-bold">
                    Standard
                  </span>
                </div>
                <p className="text-[10px] text-on-surface-variant">Cancel anytime</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="font-bold text-xs text-on-surface">₹2,000</span>
                  <span className="text-[9px] text-on-surface-variant block">/ month</span>
                </div>
                <button
                  onClick={() => handleOpenPlan('Monthly Flexible', '2,000', '2,000')}
                  className="py-1.5 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-xs transition-colors"
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: REFER & EARN (AFFILIATE) ================= */}
      {activeTab === 'affiliate' && (
        <div className="flex flex-col space-y-3.5 animate-fade-in">
          {/* Hero Banner */}
          <div className="relative overflow-hidden bg-primary text-on-primary rounded-xl p-4 shadow-md border border-secondary/20">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-secondary/25 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[9px] font-bold uppercase tracking-wide">
                  ROYAL PARTNER PROGRAM
                </span>
                <span className="flex items-center gap-1 text-secondary-fixed text-[10px] font-semibold">
                  <ShieldCheck className="w-3 h-3" /> Verified Earning
                </span>
              </div>
              <h2 className="font-bold text-base text-on-primary">Refer a Salon Owner & Earn</h2>
              <div className="bg-surface-container-highest/10 rounded-lg p-2.5 border border-secondary/20">
                <p className="font-bold text-xs text-secondary-fixed-dim">
                  Earn ₹200/month for 5 months (₹1,000 total per salon)
                </p>
                <p className="text-[10px] text-primary-fixed-dim mt-0.5">
                  credited directly via UPI when your referred salon subscribes to Royal ERP.
                </p>
              </div>
            </div>
          </div>

          {/* Referral Code & Sharing Card */}
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-xs border border-surface-container-high/60 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                Your Unique Referral Code
              </label>
              <span className="text-[10px] text-secondary font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Unlimited Referrals
              </span>
            </div>

            {/* Code Box with 1-Tap Copy */}
            <div className="flex items-center justify-between bg-surface-container-low p-2.5 rounded-xl border border-surface-container-high">
              <div className="flex items-center gap-2 pl-1 min-w-0">
                <span className="material-symbols-outlined text-[20px] text-secondary">confirmation_number</span>
                <span className="font-mono font-bold text-sm tracking-wider text-on-surface select-all truncate">
                  {referralCode}
                </span>
              </div>
              <button
                onClick={copyReferralCode}
                className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-secondary" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            {/* Prominent Green WhatsApp CTA Button */}
            <button
              onClick={shareOnWhatsApp}
              className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-transform hover:opacity-95"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>Share via WhatsApp</span>
            </button>
          </div>

          {/* Payout & Growth Metrics */}
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-xs border border-surface-container-high/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                Payout & Growth Metrics
              </span>
              <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[9px] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" /> Live Sync
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-surface-container-low rounded-xl p-2.5 flex flex-col justify-between">
                <span className="text-[10px] text-on-surface-variant font-medium">Total Earned</span>
                <span className="font-bold text-sm text-on-surface mt-1">₹4,800</span>
                <span className="text-[9px] text-secondary font-semibold">Direct UPI</span>
              </div>

              <div className="bg-surface-container-low rounded-xl p-2.5 flex flex-col justify-between">
                <span className="text-[10px] text-on-surface-variant font-medium">Active Salons</span>
                <span className="font-bold text-sm text-on-surface mt-1">6 Salons</span>
                <span className="text-[9px] text-on-surface-variant">Recurring</span>
              </div>

              <div className="bg-secondary-fixed/30 border border-secondary/20 rounded-xl p-2.5 flex flex-col justify-between">
                <span className="text-[10px] text-secondary font-bold">Next Payout</span>
                <span className="font-bold text-sm text-secondary mt-1">₹1,200</span>
                <span className="text-[9px] text-on-surface-variant">on 1st Nov</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-[10px] text-on-surface-variant">
              <span>Settlement UPI Account:</span>
              <span className="font-mono text-on-surface font-semibold">{salonProfile.upiId}</span>
            </div>
          </div>

          {/* Active Referrals Ledger */}
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-xs border border-surface-container-high/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider block">
                  Referred Salons Roster
                </span>
                <h3 className="font-bold text-xs text-on-surface">Active Referrals Ledger</h3>
              </div>
              <span className="text-[9px] text-on-surface-variant bg-surface-container px-2 py-0.5 rounded font-bold">
                {referrals.length} Recorded
              </span>
            </div>

            <div className="space-y-2">
              {referrals.map((ref) => (
                <div
                  key={ref.id}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low border border-surface-container-high/60"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                      {ref.initials}
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-xs text-on-surface block truncate">{ref.salonName}</span>
                      <span className="text-[9px] text-on-surface-variant">
                        {ref.location} • {ref.joinedDate}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 pl-2">
                    <span className="font-bold text-xs text-secondary block">
                      {ref.isCompleted ? '₹1,000 paid' : `₹${ref.monthlyPayout}/mo`}
                    </span>
                    <span
                      className={`inline-block px-1.5 py-0.2 rounded-full text-[8px] font-bold mt-0.5 ${
                        ref.isCompleted
                          ? 'bg-surface-container text-on-surface-variant'
                          : 'bg-secondary-fixed text-on-secondary-fixed'
                      }`}
                    >
                      {ref.isCompleted ? 'Completed' : `Month ${ref.currentMonth}/5`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works Explainer */}
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-xs border border-surface-container-high/60 space-y-2.5">
            <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider block">
              Simple Earning Model
            </span>
            <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
              <div className="bg-surface-container-low rounded-xl p-2.5 flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-primary text-secondary-fixed flex items-center justify-center font-bold text-[10px] mb-1">
                  1
                </div>
                <span className="font-bold text-on-surface">Share Code</span>
                <span className="text-on-surface-variant text-[9px] mt-0.5">Invite salon owners</span>
              </div>

              <div className="bg-surface-container-low rounded-xl p-2.5 flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-primary text-secondary-fixed flex items-center justify-center font-bold text-[10px] mb-1">
                  2
                </div>
                <span className="font-bold text-on-surface">Salon Joins</span>
                <span className="text-on-surface-variant text-[9px] mt-0.5">Activates Pro suite</span>
              </div>

              <div className="bg-surface-container-low rounded-xl p-2.5 flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-primary text-secondary-fixed flex items-center justify-center font-bold text-[10px] mb-1">
                  3
                </div>
                <span className="font-bold text-on-surface">₹200/mo UPI</span>
                <span className="text-on-surface-variant text-[9px] mt-0.5">Bank auto-credit</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AutoPay Modal */}
      <AutoPayModal
        isOpen={isAutoPayOpen}
        onClose={() => setIsAutoPayOpen(false)}
        planTitle={selectedPlan.title}
        billedTotal={selectedPlan.total}
        monthlyRate={selectedPlan.monthly}
        onSuccess={onSuccessToast}
      />
    </div>
  );
};
