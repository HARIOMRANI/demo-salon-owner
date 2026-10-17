import React, { useState, useEffect, useRef } from 'react';
import { useSalonStore } from '../store/salonStore';
import { Appointment } from '../types/salon';
import { X, AlertTriangle, Fingerprint, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface IrrevocableCompleteModalProps {
  appointment: Appointment | null;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export const IrrevocableCompleteModal: React.FC<IrrevocableCompleteModalProps> = ({
  appointment,
  onClose,
  onSuccess,
}) => {
  const { completeAppointment } = useSalonStore();

  const [confirmText, setConfirmText] = useState('DEDUCT');
  const [holdProgress, setHoldProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const holdIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    setHoldProgress(0);
    setIsCompleted(false);
    setConfirmText('DEDUCT');
  }, [appointment]);

  if (!appointment) return null;

  const isUnlocked = confirmText.trim().toUpperCase() === 'DEDUCT';

  const startHold = () => {
    if (!isUnlocked || isCompleted) return;
    setHoldProgress(0);

    const holdDuration = 1500; // 1.5 seconds
    const intervalTime = 30;

    holdIntervalRef.current = window.setInterval(() => {
      setHoldProgress((prev) => {
        const next = prev + (intervalTime / holdDuration) * 100;
        if (next >= 100) {
          if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
          handleCommit();
          return 100;
        }
        return next;
      });
    }, intervalTime);
  };

  const cancelHold = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
    if (holdProgress < 100) {
      setHoldProgress(0);
    }
  };

  const handleCommit = () => {
    setIsCompleted(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {
      // Ignore if confetti unavailable
    }

    setTimeout(() => {
      completeAppointment(appointment.id);
      onSuccess(`₹${appointment.amount.toLocaleString('en-IN')} deducted from ${appointment.clientName}'s wallet & ticket locked!`);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-inverse-surface/65 backdrop-blur-sm transition-opacity animate-fade-in">
      <div
        className="bg-surface-container-lowest w-full max-w-sm rounded-2xl shadow-2xl p-space-md flex flex-col space-y-4 relative overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Amber Safety Scrim */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-secondary" />

        {/* Warning Header */}
        <div className="flex items-start gap-3 pt-1">
          <div className="w-11 h-11 rounded-xl bg-error-container text-on-error-container flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-error" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold tracking-wider text-error uppercase">Irrevocable Action</span>
            <h3 className="font-bold text-base text-on-surface leading-tight">Confirm Ticket Closure</h3>
          </div>
          <button
            onClick={onClose}
            className="ml-auto text-outline hover:text-on-surface p-1 rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Informative Body Details */}
        <div className="bg-surface-container-low p-3.5 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-on-surface-variant font-medium">Customer:</span>
            <span className="font-bold text-on-surface">{appointment.clientName} {appointment.isVip ? '(VIP)' : ''}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-on-surface-variant font-medium">Service Amount:</span>
            <span className="font-bold text-secondary text-base">₹{appointment.amount.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-on-surface-variant font-medium">Settlement Method:</span>
            <span className="font-bold text-on-surface">Prepaid Platinum Wallet</span>
          </div>
        </div>

        <p className="text-xs text-on-surface-variant leading-relaxed">
          Are you sure? This will <span className="font-bold text-error">permanently deduct ₹{appointment.amount.toLocaleString('en-IN')}</span> from {appointment.clientName}'s prepaid wallet. This transaction is cryptographically locked, registers instantly on the central ledger, and <span className="font-bold text-on-surface">CANNOT</span> be undone.
        </p>

        {/* Type To Confirm Input */}
        <div className="flex flex-col space-y-1">
          <label className="text-[11px] font-bold text-on-surface uppercase tracking-wider">
            Type <span className="text-secondary font-mono">DEDUCT</span> to unlock
          </label>
          <div className="relative">
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
              className="w-full px-3 py-2 bg-surface-container rounded-lg font-mono font-bold tracking-widest text-on-surface text-center outline-none focus:ring-2 focus:ring-secondary/40 text-sm"
            />
            {isUnlocked && (
              <CheckCircle2 className="w-4 h-4 text-secondary absolute right-3 top-1/2 -translate-y-1/2" />
            )}
          </div>
        </div>

        {/* Long-Press Hold To Deduct Button */}
        <div className="relative w-full flex flex-col items-center">
          <div
            className="absolute left-0 top-0 bottom-0 bg-secondary rounded-xl transition-all duration-100 ease-linear pointer-events-none opacity-40"
            style={{ width: `${holdProgress}%` }}
          />
          <button
            disabled={!isUnlocked}
            onMouseDown={startHold}
            onMouseUp={cancelHold}
            onMouseLeave={cancelHold}
            onTouchStart={startHold}
            onTouchEnd={cancelHold}
            className={`relative z-10 w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 overflow-hidden select-none transition-all ${
              !isUnlocked
                ? 'bg-surface-container text-on-surface-variant cursor-not-allowed opacity-60'
                : isCompleted
                ? 'bg-green-700 text-white'
                : 'bg-primary text-on-primary active:scale-[0.99]'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-secondary-fixed" />
                <span>Deducted & Ticket Locked ✓</span>
              </>
            ) : (
              <>
                <Fingerprint className="w-5 h-5 text-secondary-fixed animate-pulse" />
                <span>Hold to Deduct ₹{appointment.amount.toLocaleString('en-IN')} & Close Ticket</span>
              </>
            )}
          </button>
          <span className="text-[10px] text-outline mt-1 font-medium">
            Press and hold for 1.5 seconds to commit
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-1.5 text-center text-xs font-semibold text-outline hover:text-on-surface transition-colors"
        >
          Cancel and Return to Active Queue
        </button>
      </div>
    </div>
  );
};
