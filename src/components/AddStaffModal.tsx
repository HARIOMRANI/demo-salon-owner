import React, { useState } from 'react';
import { useSalonStore } from '../store/salonStore';
import { X, UserPlus, Sparkles } from 'lucide-react';

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export const AddStaffModal: React.FC<AddStaffModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { addStaff, staff } = useSalonStore();

  const [name, setName] = useState('');
  const [role, setRole] = useState('Senior Stylist');
  const [specialty, setSpecialty] = useState('Hair & Keratin');
  const [experience, setExperience] = useState('4 yrs exp');
  const [chairId, setChairId] = useState(`Chair #${staff.length + 1}`);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addStaff({
      name: name.trim(),
      role,
      specialty,
      experience,
      rating: 4.9,
      chairId,
      status: 'available',
    });

    onSuccess(`Added ${name} to ${chairId} roster!`);
    setName('');
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
            <div className="w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-secondary-fixed" />
            </div>
            <div>
              <h3 className="font-bold text-headline-sm text-on-surface">Add New Stylist / Barber</h3>
              <p className="text-xs text-on-surface-variant">Allocates chair station & floor commission tracker</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Stylist Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Arjun Kapoor"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-semibold text-sm outline-none focus:ring-2 focus:ring-secondary/40"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface text-xs font-semibold outline-none focus:ring-2 focus:ring-secondary/40"
              >
                <option value="Master Barber">Master Barber</option>
                <option value="Senior Stylist">Senior Stylist</option>
                <option value="Colour Expert">Colour Expert</option>
                <option value="Spa Specialist">Spa Specialist</option>
                <option value="Junior Stylist">Junior Stylist</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Station Chair</label>
              <input
                type="text"
                required
                value={chairId}
                onChange={(e) => setChairId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface text-xs font-semibold outline-none focus:ring-2 focus:ring-secondary/40"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Specialty</label>
              <input
                type="text"
                required
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                placeholder="e.g. Precision Fade"
                className="w-full px-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface text-xs font-semibold outline-none focus:ring-2 focus:ring-secondary/40"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Experience</label>
              <input
                type="text"
                required
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="e.g. 5 yrs exp"
                className="w-full px-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface text-xs font-semibold outline-none focus:ring-2 focus:ring-secondary/40"
              />
            </div>
          </div>

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
              <span>Onboard & Activate on Floor</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
