import React, { useState } from 'react';
import { useSalonStore } from '../store/salonStore';
import { X, Heart, Sparkles } from 'lucide-react';

interface StaffTipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export const StaffTipModal: React.FC<StaffTipModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { staff, addStaffTip } = useSalonStore();
  const [selectedBarberId, setSelectedBarberId] = useState(staff[0]?.id || '');
  const [tipAmount, setTipAmount] = useState<number>(100);

  if (!isOpen) return null;

  const quickAmounts = [50, 100, 200, 500];
  const targetBarber = staff.find((s) => s.id === selectedBarberId) || staff[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tipAmount <= 0) return;

    addStaffTip(selectedBarberId, tipAmount);
    onSuccess(`Added ₹${tipAmount} tip to ${targetBarber?.name}'s earnings!`);
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
            <div className="w-9 h-9 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
              <Heart className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-bold text-headline-sm text-on-surface">Distribute Staff Tip</h3>
              <p className="text-xs text-on-surface-variant">Credits directly to barber's daily payout ledger</p>
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
          {/* Select Stylist */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Select Barber / Stylist</label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
              {staff.map((barber) => {
                const isSelected = barber.id === selectedBarberId;
                return (
                  <button
                    key={barber.id}
                    type="button"
                    onClick={() => setSelectedBarberId(barber.id)}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                      isSelected
                        ? 'border-secondary bg-secondary-fixed/30 ring-1 ring-secondary'
                        : 'border-surface-container-high bg-surface-container-low hover:bg-surface-container'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs flex-shrink-0">
                      {barber.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-xs text-on-surface truncate">{barber.name}</p>
                      <p className="text-[10px] text-on-surface-variant truncate">{barber.chairId}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Amounts */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Tip Amount (INR)</label>
            <div className="grid grid-cols-4 gap-2">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setTipAmount(amt)}
                  className={`py-2 rounded-lg font-bold text-sm transition-all ${
                    tipAmount === amt
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Input */}
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-on-surface text-base">₹</span>
            <input
              type="number"
              min="10"
              step="10"
              value={tipAmount}
              onChange={(e) => setTipAmount(Number(e.target.value))}
              className="w-full pl-8 pr-3.5 py-2.5 rounded-lg bg-surface-container-low font-bold text-base text-on-surface outline-none focus:ring-2 focus:ring-secondary/40"
            />
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
              <Sparkles className="w-4 h-4 text-secondary-fixed" />
              <span>Credit ₹{tipAmount} Tip</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
