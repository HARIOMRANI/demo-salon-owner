import React, { useState } from 'react';
import { useSalonStore } from '../store/salonStore';
import { X, Sparkles, PlusCircle } from 'lucide-react';
import { ServiceItem } from '../types/salon';

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export const AddServiceModal: React.FC<AddServiceModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { addService } = useSalonStore();

  const [name, setName] = useState('');
  const [duration, setDuration] = useState(45);
  const [category, setCategory] = useState<ServiceItem['category']>('Hair Rituals');
  const [price, setPrice] = useState(850);
  const [commission, setCommission] = useState(15);
  const [isBestseller, setIsBestseller] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addService({
      name: name.trim(),
      category,
      price,
      durationMinutes: duration,
      commissionPercent: commission,
      isBestseller,
      description: 'Exclusive salon floor ritual with customized care finish.',
      tag: isBestseller ? 'Bestseller' : undefined,
    });

    onSuccess(`Published "${name}" to POS catalog!`);
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
            <div className="w-9 h-9 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
              <PlusCircle className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-bold text-headline-sm text-on-surface">Add New Service</h3>
              <p className="text-xs text-on-surface-variant">Synchronizes immediately with live POS catalog</p>
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
            <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Service Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Royal Moroccan Clay Spa"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-semibold text-sm outline-none focus:ring-2 focus:ring-secondary/40"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Duration (Mins)</label>
              <input
                type="number"
                min="10"
                step="5"
                required
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface text-xs font-semibold outline-none focus:ring-2 focus:ring-secondary/40"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ServiceItem['category'])}
                className="w-full px-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface text-xs font-semibold outline-none focus:ring-2 focus:ring-secondary/40"
              >
                <option value="Hair Rituals">Hair Rituals</option>
                <option value="Skin & Facial">Skin & Facial</option>
                <option value="Beard & Shave">Beard & Shave</option>
                <option value="Combos">Combos</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Base Price (INR)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-on-surface text-xs">₹</span>
                <input
                  type="number"
                  min="50"
                  step="50"
                  required
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface text-xs font-semibold outline-none focus:ring-2 focus:ring-secondary/40"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Staff Commission</label>
              <div className="relative">
                <input
                  type="number"
                  min="5"
                  max="50"
                  required
                  value={commission}
                  onChange={(e) => setCommission(Number(e.target.value))}
                  className="w-full pl-3 pr-7 py-2.5 rounded-lg bg-surface-container-low text-on-surface text-xs font-semibold outline-none focus:ring-2 focus:ring-secondary/40"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant text-xs">%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-surface-container-high">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-xs font-bold text-on-surface">Mark as Flagship Bestseller</span>
            </div>
            <input
              type="checkbox"
              checked={isBestseller}
              onChange={(e) => setIsBestseller(e.target.checked)}
              className="w-4 h-4 accent-secondary rounded cursor-pointer"
            />
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
              <PlusCircle className="w-4 h-4 text-secondary-fixed" />
              <span>Save & Publish to POS</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
