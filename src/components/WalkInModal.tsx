import React, { useState } from 'react';
import { useSalonStore } from '../store/salonStore';
import { X, Sparkles, UserPlus } from 'lucide-react';

interface WalkInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export const WalkInModal: React.FC<WalkInModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { staff, services, chairs, addWalkIn } = useSalonStore();

  const [clientName, setClientName] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id || '');
  const [selectedBarberId, setSelectedBarberId] = useState(staff[0]?.id || '');
  const [selectedChairId, setSelectedChairId] = useState('C-2');
  const [isVip, setIsVip] = useState(false);

  if (!isOpen) return null;

  const currentService = services.find((s) => s.id === selectedServiceId) || services[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) return;

    addWalkIn({
      clientName: clientName.trim(),
      serviceName: currentService?.name || 'Signature Haircut',
      amount: currentService?.price || 450,
      barberId: selectedBarberId,
      chairId: selectedChairId,
      isVip,
    });

    onSuccess(`Added ${clientName} to Chair ${selectedChairId}!`);
    setClientName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-inverse-surface/60 backdrop-blur-xs transition-opacity animate-fade-in">
      <div
        className="w-full max-w-md bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl p-space-md shadow-2xl flex flex-col space-y-4 max-h-[90vh] overflow-y-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-secondary-fixed" />
            </div>
            <div>
              <h3 className="font-bold text-headline-sm text-on-surface">Book Walk-in Client</h3>
              <p className="text-xs text-on-surface-variant">Instant chair assignment & active queue dispatch</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Client Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Client Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Vikramaditya Rathore"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-semibold text-sm outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/40"
            />
          </div>

          {/* Service Selector */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Select Ritual / Service</label>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-semibold text-sm outline-none focus:ring-2 focus:ring-secondary/40"
            >
              {services.map((srv) => (
                <option key={srv.id} value={srv.id}>
                  {srv.name} — ₹{srv.price.toLocaleString('en-IN')} ({srv.durationMinutes}m)
                </option>
              ))}
            </select>
          </div>

          {/* Barber & Chair Selector (2 Cols) */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Assign Barber</label>
              <select
                value={selectedBarberId}
                onChange={(e) => setSelectedBarberId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface text-xs font-semibold outline-none focus:ring-2 focus:ring-secondary/40"
              >
                {staff.map((barber) => (
                  <option key={barber.id} value={barber.id}>
                    {barber.name} ({barber.rating}★)
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Assign Chair</label>
              <select
                value={selectedChairId}
                onChange={(e) => setSelectedChairId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface text-xs font-semibold outline-none focus:ring-2 focus:ring-secondary/40"
              >
                {chairs.map((chair) => (
                  <option key={chair.id} value={chair.id}>
                    {chair.label} {chair.isOccupied ? '(Occupied)' : '✓ Ready'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* VIP Flag */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-surface-container-high">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-xs font-bold text-on-surface">Flag as Elite VIP Patron</span>
            </div>
            <input
              type="checkbox"
              checked={isVip}
              onChange={(e) => setIsVip(e.target.checked)}
              className="w-4 h-4 accent-secondary rounded cursor-pointer"
            />
          </div>

          {/* Pricing Summary */}
          <div className="p-3 rounded-xl bg-secondary-fixed/40 flex items-center justify-between">
            <span className="text-xs font-bold text-on-secondary-fixed-variant">Billable Amount</span>
            <span className="font-bold text-lg text-secondary">
              ₹{(currentService?.price || 450).toLocaleString('en-IN')}
            </span>
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
              className="flex-2 w-full py-3 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4 text-secondary-fixed" />
              <span>Seat Client & Open Ticket</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
