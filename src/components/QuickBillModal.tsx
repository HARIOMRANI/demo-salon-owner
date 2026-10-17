import React, { useState } from 'react';
import { useSalonStore } from '../store/salonStore';
import { X, Receipt, CheckCircle } from 'lucide-react';

interface QuickBillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export const QuickBillModal: React.FC<QuickBillModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { addQuickBill } = useSalonStore();
  const [billAmount, setBillAmount] = useState<number>(850);
  const [description, setDescription] = useState('Counter Product / Retail Add-on');

  if (!isOpen) return null;

  const quickPills = [250, 450, 850, 1200, 1850, 2500];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (billAmount <= 0) return;

    addQuickBill(billAmount);
    onSuccess(`Added ₹${billAmount.toLocaleString('en-IN')} to Today's Gross!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-inverse-surface/60 backdrop-blur-xs transition-opacity animate-fade-in">
      <div
        className="w-full max-w-md bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl p-space-md shadow-2xl flex flex-col space-y-4 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-surface-container-high text-on-surface flex items-center justify-center">
              <Receipt className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-bold text-headline-sm text-on-surface">Quick Cash / Card Bill</h3>
              <p className="text-xs text-on-surface-variant">Instant desk invoice credited straight to Today's Gross</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Quick Amounts */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Quick Select Amount</label>
            <div className="grid grid-cols-3 gap-2">
              {quickPills.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setBillAmount(amt)}
                  className={`py-2 rounded-lg font-bold text-sm transition-all ${
                    billAmount === amt
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                  }`}
                >
                  ₹{amt.toLocaleString('en-IN')}
                </button>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Exact Invoice Amount (INR)</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-on-surface text-lg">₹</span>
              <input
                type="number"
                min="50"
                step="10"
                required
                value={billAmount}
                onChange={(e) => setBillAmount(Number(e.target.value))}
                className="w-full pl-8 pr-3.5 py-3 rounded-lg bg-surface-container-low font-bold text-xl text-on-surface outline-none focus:ring-2 focus:ring-secondary/40"
              />
            </div>
          </div>

          {/* Note / Memo */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Transaction Note (Optional)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Keratin Shampoo & Serum Bottle"
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-xs font-medium text-on-surface outline-none focus:ring-2 focus:ring-secondary/40"
            />
          </div>

          {/* Instant Ledger Preview */}
          <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between">
            <span className="text-xs text-on-surface-variant font-medium">Auto-recorded to Central Ledger</span>
            <span className="text-xs font-bold text-secondary">Zero MDR POS</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-surface-container text-on-surface font-semibold text-sm hover:bg-surface-container-high transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-2 w-full py-3 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-md active:scale-95 transition-transform flex items-center justify-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4 text-secondary-fixed" />
              <span>Record & Add ₹{billAmount.toLocaleString('en-IN')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
