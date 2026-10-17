import React, { useState } from 'react';
import { useSalonStore } from '../store/salonStore';
import { Appointment } from '../types/salon';
import { IrrevocableCompleteModal } from '../components/IrrevocableCompleteModal';
import {
  RefreshCw,
  Crown,
  Scissors,
  CheckCircle,
  Lock,
  Verified,
  Sparkles,
} from 'lucide-react';

interface QueueScreenProps {
  onSuccessToast: (msg: string) => void;
}

export const QueueScreen: React.FC<QueueScreenProps> = ({ onSuccessToast }) => {
  const { activeAppointments, completedAppointments } = useSalonStore();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  return (
    <div className="flex flex-col w-full px-space-md py-space-sm space-y-4 max-w-md mx-auto pb-24 pt-16">
      {/* Active Appointments Header */}
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-base text-on-surface">Active Appointments</h2>
          <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface text-[10px] font-bold">
            {activeAppointments.length} Running
          </span>
        </div>
        <span className="text-[10px] text-outline flex items-center gap-1 font-medium">
          <RefreshCw className="w-3 h-3 text-secondary animate-spin" style={{ animationDuration: '6s' }} />
          Auto-synced
        </span>
      </div>

      {/* Active Running Cards */}
      <div className="flex flex-col space-y-3">
        {activeAppointments.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-xl p-6 text-center shadow-xs border border-surface-container-high/60 space-y-2">
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
              <CheckCircle className="w-5 h-5" />
            </div>
            <p className="font-bold text-sm text-on-surface">No Active Running Sessions</p>
            <p className="text-xs text-on-surface-variant">All salon chairs are currently sanitized and ready for clients.</p>
          </div>
        ) : (
          activeAppointments.map((appt) => (
            <div
              key={appt.id}
              className="bg-surface-container-lowest rounded-xl p-3.5 shadow-xs border border-surface-container-high/60 flex flex-col space-y-2.5 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="relative flex-shrink-0">
                    <img
                      src={appt.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'}
                      alt={appt.clientName}
                      className="w-10 h-10 rounded-full object-cover shadow-xs"
                    />
                    {appt.isVip && (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary text-white rounded-full flex items-center justify-center shadow-xs">
                        <Crown className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-on-surface truncate">{appt.clientName}</span>
                      {appt.isVip && (
                        <span className="px-1.5 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[8px] font-bold">
                          {appt.vipTier || 'VIP'}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-on-surface-variant flex items-center gap-1 mt-0.5">
                      <Scissors className="w-3 h-3 text-secondary" />
                      {appt.barberName}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end flex-shrink-0">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-outline">{appt.chairId}</span>
                  <span className="font-bold text-sm text-on-surface mt-0.5">₹{appt.amount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Service & Real-time Live Timer */}
              <div className="bg-surface-container-low p-2 rounded-lg flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 min-w-0 pr-2">
                  <Sparkles className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                  <span className="font-medium text-on-surface truncate">{appt.service}</span>
                </div>
                <div className="flex items-center gap-1 bg-surface-container-lowest px-1.5 py-0.5 rounded shadow-xs flex-shrink-0 text-[10px] font-bold text-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  <span>{appt.runningTimeMinutes}m running</span>
                </div>
              </div>

              {/* Mark as Completed Button */}
              <button
                onClick={() => setSelectedAppointment(appt)}
                className="w-full py-2.5 px-3 rounded-lg bg-primary text-on-primary font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition-all hover:bg-inverse-surface"
              >
                <span>Mark as Completed</span>
                <CheckCircle className="w-3.5 h-3.5 text-secondary-fixed" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Recently Completed & Locked Receipts */}
      <div className="flex flex-col space-y-2.5 pt-2">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-outline" />
            <h3 className="font-bold text-xs text-on-surface">Recently Completed & Locked</h3>
          </div>
          <span className="text-[10px] text-outline font-medium">Today</span>
        </div>

        <div className="flex flex-col space-y-2">
          {completedAppointments.map((receipt) => (
            <div
              key={receipt.id}
              className="bg-surface-container-lowest p-2.5 rounded-xl shadow-xs border border-surface-container-high/40 flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-outline flex-shrink-0">
                  <Verified className="w-4 h-4 text-secondary" />
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-on-surface truncate">{receipt.clientName}</span>
                    <span className="px-1 py-0.2 bg-surface-container text-outline rounded text-[8px] font-bold font-mono">
                      {receipt.invoiceNo}
                    </span>
                  </div>
                  <span className="text-[10px] text-on-surface-variant truncate">
                    {receipt.service} • {receipt.chairId} ({receipt.barberName})
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end flex-shrink-0 pl-2">
                <span className="font-bold text-xs text-on-surface">₹{receipt.amount.toLocaleString('en-IN')}</span>
                <span className="text-[9px] text-outline font-medium">{receipt.completedAt} • Locked</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Irrevocable Complete Modal */}
      <IrrevocableCompleteModal
        appointment={selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
        onSuccess={onSuccessToast}
      />
    </div>
  );
};
