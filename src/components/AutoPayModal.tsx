import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';

interface AutoPayModalProps {
  isOpen: boolean;
  onClose: () => void;
  planTitle: string;
  billedTotal: string;
  monthlyRate: string;
  onSuccess: (message: string) => void;
}

export const AutoPayModal: React.FC<AutoPayModalProps> = ({
  isOpen,
  onClose,
  planTitle,
  billedTotal,
  monthlyRate,
  onSuccess,
}) => {
  const [upiId, setUpiId] = useState('sharmasalon@hdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleAuthorize = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess(`NPCI e-Mandate linked successfully for ${planTitle} (${monthlyRate}/mo)!`);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-inverse-surface/60 backdrop-blur-xs transition-opacity animate-fade-in">
      <div
        className="w-full max-w-md bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl p-space-md shadow-2xl flex flex-col space-y-4 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between pb-2 border-b border-surface-container-high">
          <div>
            <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold tracking-wider uppercase">
              NPCI RECURRING MANDATE
            </span>
            <h3 className="font-bold text-headline-sm text-on-surface mt-1">{planTitle}</h3>
            <p className="text-xs text-on-surface-variant">Locking best price before 14-day trial concludes</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Pricing Summary */}
        <div className="bg-surface-container-low rounded-xl p-3.5 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-on-surface-variant font-medium">Effective Monthly Rate:</span>
            <span className="font-bold text-on-surface font-mono">₹{monthlyRate} / mo</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-on-surface-variant font-medium">Billed Total Amount:</span>
            <span className="font-bold text-secondary font-mono">₹{billedTotal}</span>
          </div>
          <div className="flex justify-between text-xs pt-1 border-t border-surface-container-high">
            <span className="text-on-surface-variant font-medium">Auto-Renewal Cadence:</span>
            <span className="font-semibold text-xs text-on-surface">Auto-renews on cycle</span>
          </div>
        </div>

        {/* UPI ID Input */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Settlement UPI VPA</label>
          <div className="relative">
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low font-mono font-semibold text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary/40"
            />
            <CheckCircle2 className="w-4 h-4 text-green-600 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-3 text-[11px] text-on-surface-variant py-1">
          <span className="flex items-center gap-1 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-secondary" /> 256-Bit Cryptographic Binding
          </span>
          <span>•</span>
          <span>Cancel anytime</span>
        </div>

        {/* Action */}
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-surface-container text-on-surface font-semibold text-sm hover:bg-surface-container-high transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAuthorize}
            disabled={isProcessing}
            className="flex-2 w-full py-3 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-md active:scale-95 transition-transform flex items-center justify-center gap-1.5"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-secondary-fixed" />
                <span>Binding e-Mandate...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-secondary-fixed" />
                <span>Authorize NPCI Auto-Pay</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
