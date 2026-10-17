import React, { useState } from 'react';
import { useSalonStore } from '../store/salonStore';
import {
  CheckCircle,
  X,
  CreditCard,
  Phone,
  Clock,
  ChevronDown,
  ChevronUp,
  FileCheck,
  CheckCircle2,
} from 'lucide-react';

interface ApprovalsScreenProps {
  onSuccessToast: (msg: string) => void;
}

export const ApprovalsScreen: React.FC<ApprovalsScreenProps> = ({ onSuccessToast }) => {
  const {
    walletApprovals,
    approveWalletTopup,
    rejectWalletTopup,
    reconciledTodayCount,
    reconciledTodayAmount,
  } = useSalonStore();

  const [activeFilter, setActiveFilter] = useState<'all' | 'upi' | 'cash'>('all');
  const [expandedReceiptId, setExpandedReceiptId] = useState<string | null>('appr-1');

  const filteredApprovals = walletApprovals.filter((item) => {
    if (activeFilter === 'upi') return item.type === 'upi';
    if (activeFilter === 'cash') return item.type === 'cash';
    return true;
  });

  const pendingCount = walletApprovals.length;
  const pendingValue = walletApprovals.reduce((acc, curr) => acc + curr.amount, 0);

  const handleApprove = (id: string, name: string, amount: number) => {
    approveWalletTopup(id);
    onSuccessToast(`Credited ₹${amount.toLocaleString('en-IN')} to ${name}'s Luxury Wallet!`);
  };

  const handleReject = (id: string, name: string) => {
    rejectWalletTopup(id);
    onSuccessToast(`Declined top-up request for ${name}`);
  };

  return (
    <div className="flex flex-col w-full px-space-md py-space-sm space-y-4 max-w-md mx-auto pb-24 pt-16">
      {/* Header Metric Ribbon Card */}
      <div className="w-full bg-surface-container-lowest rounded-2xl shadow-xs p-4 flex flex-col space-y-3.5 border border-surface-container-high/60 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-36 h-36 bg-secondary-fixed/30 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping" />
            <h2 className="font-bold text-sm text-on-surface">Wallet Top-up Approvals</h2>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container text-[10px] font-bold">
            Review Queue
          </span>
        </div>

        {/* Dual Metric Ribbon */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-surface-container-low rounded-xl p-2.5 flex flex-col justify-center">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Total Pending</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-bold text-xl text-on-surface">{pendingCount}</span>
              <span className="text-[11px] text-on-surface-variant font-medium">requests</span>
            </div>
          </div>

          <div className="bg-secondary-fixed/40 rounded-xl p-2.5 flex flex-col justify-center">
            <span className="text-[10px] font-bold text-on-secondary-fixed-variant uppercase tracking-wider">Total Pending Value</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-bold text-lg text-secondary">₹{pendingValue.toLocaleString('en-IN')}</span>
              <span className="text-[10px] text-on-secondary-fixed-variant">to credit</span>
            </div>
          </div>
        </div>

        {/* Filter Segmented Control Tabs */}
        <div className="flex items-center gap-1 bg-surface-container p-1 rounded-xl">
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold text-center transition-all ${
              activeFilter === 'all'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            All ({walletApprovals.length})
          </button>
          <button
            onClick={() => setActiveFilter('upi')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold text-center transition-all ${
              activeFilter === 'upi'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            UPI Direct ({walletApprovals.filter((a) => a.type === 'upi').length})
          </button>
          <button
            onClick={() => setActiveFilter('cash')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold text-center transition-all ${
              activeFilter === 'cash'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Cash ({walletApprovals.filter((a) => a.type === 'cash').length})
          </button>
        </div>
      </div>

      {/* Pending Approvals Stack */}
      <div className="flex flex-col space-y-3">
        {filteredApprovals.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-xs border border-surface-container-high/60 flex flex-col items-center justify-center text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary mb-1">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-on-surface">Queue Cleared!</h3>
            <p className="text-xs text-on-surface-variant max-w-xs leading-relaxed">
              All pending wallet top-up requests have been reviewed and reconciled to client accounts.
            </p>
          </div>
        ) : (
          filteredApprovals.map((req) => (
            <div
              key={req.id}
              className="bg-surface-container-lowest rounded-2xl shadow-xs border border-surface-container-high/60 p-4 flex flex-col space-y-3 transition-all animate-slide-up"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative w-10 h-10 flex-shrink-0">
                    <img
                      src={req.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'}
                      alt={req.clientName}
                      className="w-10 h-10 rounded-full object-cover shadow-xs"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-on-surface truncate">{req.clientName}</span>
                      <span className="px-1.5 py-0.2 rounded bg-secondary-fixed text-on-secondary-fixed text-[8px] font-bold">
                        {req.tier}
                      </span>
                    </div>
                    <span className="text-[10px] text-on-surface-variant flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3 text-outline" /> {req.phone}
                    </span>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end flex-shrink-0">
                  <span className="font-bold text-base text-secondary">₹{req.amount.toLocaleString('en-IN')}</span>
                  <span className="text-[9px] text-outline flex items-center gap-0.5 mt-0.5 font-medium">
                    <Clock className="w-2.5 h-2.5" /> {req.timeAgo}
                  </span>
                </div>
              </div>

              {/* Payment Proof / Reference Ribbon */}
              {req.type === 'upi' ? (
                <div className="bg-surface-container-low rounded-xl p-2.5 flex flex-col space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded bg-primary text-on-primary text-[9px] font-bold uppercase flex items-center gap-1">
                      <CreditCard className="w-2.5 h-2.5" /> UPI Direct
                    </span>
                    <span className="font-mono text-[10px] text-on-surface-variant font-medium">{req.utr}</span>
                  </div>

                  {/* Toggle Receipt Preview */}
                  <button
                    type="button"
                    onClick={() => setExpandedReceiptId(expandedReceiptId === req.id ? null : req.id)}
                    className="inline-flex items-center gap-1 text-secondary text-[11px] font-semibold hover:underline self-start"
                  >
                    <span>{expandedReceiptId === req.id ? 'Hide UPI Receipt' : 'View UPI Receipt Slip'}</span>
                    {expandedReceiptId === req.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>

                  {/* Expandable Image Slip Drawer */}
                  {expandedReceiptId === req.id && (
                    <div className="w-full bg-surface-container rounded-lg p-2 flex items-center gap-2.5 border border-surface-container-high/70 animate-fade-in">
                      <img
                        src={req.receiptImg || 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=200&auto=format&fit=crop&q=80'}
                        alt="Receipt Screenshot"
                        className="w-12 h-14 rounded object-cover flex-shrink-0 shadow-xs border"
                      />
                      <div className="flex flex-col min-w-0 text-[10px]">
                        <span className="font-bold text-on-surface truncate">Bank Reference: HDFC-UPI-984</span>
                        <span className="text-on-surface-variant">Verified sender: {req.clientName}</span>
                        <span className="text-secondary font-bold mt-0.5">Instant Bank Stamp Validated ✓</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-surface-container-low rounded-xl p-2.5 flex flex-col space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[9px] font-bold uppercase flex items-center gap-1">
                      <CreditCard className="w-2.5 h-2.5" /> Cash Counter Handover
                    </span>
                    <span className="text-[10px] font-semibold text-on-surface-variant">Desk #1</span>
                  </div>
                  <span className="text-[10px] text-on-surface-variant leading-tight">
                    {req.deskStaff || 'Collected at front reception desk'}
                  </span>
                </div>
              )}

              {/* Action Buttons Pair */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleApprove(req.id, req.clientName, req.amount)}
                  className="flex-1 py-2 px-3 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-secondary-fixed" />
                  <span>Approve (Credit ₹{req.amount.toLocaleString('en-IN')})</span>
                </button>
                <button
                  onClick={() => handleReject(req.id, req.clientName)}
                  className="px-3 py-2 rounded-xl bg-error-container text-on-error-container font-bold text-xs shadow-xs flex items-center justify-center gap-1 active:scale-[0.98] transition-transform"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Ledger Summary Pill / Today's Reconciled Banner */}
      <div className="w-full bg-surface-container-high rounded-xl p-3.5 flex items-center justify-between shadow-xs border border-surface-container-highest/60">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center flex-shrink-0">
            <FileCheck className="w-4 h-4 text-secondary-fixed" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-xs text-on-surface truncate">Ledger Reconciliation Active</span>
            <span className="text-[10px] text-on-surface-variant font-medium">{reconciledTodayCount} Approvals cleared today</span>
          </div>
        </div>
        <div className="text-right flex flex-col items-end flex-shrink-0 pl-2">
          <span className="font-bold text-sm text-secondary">₹{reconciledTodayAmount.toLocaleString('en-IN')}</span>
          <span className="text-[9px] text-on-surface-variant font-medium">Credited today</span>
        </div>
      </div>
    </div>
  );
};
