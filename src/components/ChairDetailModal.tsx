import React from 'react';
import { useSalonStore } from '../store/salonStore';
import { ChairStatus } from '../types/salon';
import { X, UserCheck, Clock, Scissors, ArrowRight } from 'lucide-react';

interface ChairDetailModalProps {
  chair: ChairStatus | null;
  onClose: () => void;
  onBookWalkin: () => void;
  onViewQueue: () => void;
}

export const ChairDetailModal: React.FC<ChairDetailModalProps> = ({
  chair,
  onClose,
  onBookWalkin,
  onViewQueue,
}) => {
  const { activeAppointments } = useSalonStore();

  if (!chair) return null;

  const currentAppt = activeAppointments.find(
    (a) => a.chairId === chair.id || a.chairId === chair.label
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-inverse-surface/60 backdrop-blur-xs transition-opacity animate-fade-in">
      <div
        className="w-full max-w-md bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl p-space-md shadow-2xl flex flex-col space-y-4 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
              chair.isOccupied ? 'bg-primary text-on-primary' : 'bg-secondary-fixed text-on-secondary-fixed'
            }`}>
              {chair.label}
            </div>
            <div>
              <h3 className="font-bold text-headline-sm text-on-surface">Station {chair.label} Status</h3>
              <p className="text-xs text-on-surface-variant">Live Floor Dynamics • Indiranagar Flagship</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chair Details Card */}
        <div className="bg-surface-container-low rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Operational State</span>
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                chair.isOccupied
                  ? chair.status === 'Color Processing'
                    ? 'bg-secondary text-white'
                    : 'bg-primary text-on-primary'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {chair.status}
            </span>
          </div>

          {chair.isOccupied ? (
            <div className="space-y-2 pt-1 border-t border-surface-container-high">
              <div className="flex items-center justify-between">
                <span className="text-xs text-on-surface-variant font-medium flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-secondary" /> Seated Patron:
                </span>
                <span className="font-bold text-sm text-on-surface">
                  {currentAppt?.clientName || chair.clientName || 'Rajesh Khanna'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-on-surface-variant font-medium flex items-center gap-1.5">
                  <Scissors className="w-4 h-4 text-outline" /> Assigned Stylist:
                </span>
                <span className="font-semibold text-xs text-on-surface">
                  {currentAppt?.barberName || chair.barberName || 'Master Barber'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-on-surface-variant font-medium">Running Service:</span>
                <span className="font-semibold text-xs text-secondary truncate max-w-[200px]">
                  {currentAppt?.service || chair.service || 'Signature Hair Treatment'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-on-surface-variant font-medium flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-outline" /> Elapsed Session:
                </span>
                <span className="font-bold text-xs text-on-surface">
                  {currentAppt ? `${currentAppt.runningTimeMinutes} mins running` : chair.elapsed || '25m running'}
                </span>
              </div>
            </div>
          ) : (
            <div className="py-4 text-center space-y-1">
              <p className="font-bold text-sm text-green-700">Station Cleaned & Sanitized</p>
              <p className="text-xs text-on-surface-variant">Ready for immediate walk-in client or scheduled VIP reservation.</p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {chair.isOccupied ? (
            <button
              onClick={() => {
                onClose();
                onViewQueue();
              }}
              className="w-full py-3 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              <span>View & Manage in Live Queue</span>
              <ArrowRight className="w-4 h-4 text-secondary-fixed" />
            </button>
          ) : (
            <button
              onClick={() => {
                onClose();
                onBookWalkin();
              }}
              className="w-full py-3 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              <span>Seat Walk-in at {chair.label}</span>
              <ArrowRight className="w-4 h-4 text-secondary-fixed" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
