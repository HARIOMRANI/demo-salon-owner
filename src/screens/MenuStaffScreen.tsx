import React, { useState } from 'react';
import { useSalonStore } from '../store/salonStore';
import { AddStaffModal } from '../components/AddStaffModal';
import { AddServiceModal } from '../components/AddServiceModal';
import {
  Search,
  X,
  Plus,
  Star,
  Clock,
  Sparkles,
} from 'lucide-react';

interface MenuStaffScreenProps {
  onSuccessToast: (msg: string) => void;
}

export const MenuStaffScreen: React.FC<MenuStaffScreenProps> = ({ onSuccessToast }) => {
  const { staff, services, toggleService } = useSalonStore();

  const [activeMainTab, setActiveMainTab] = useState<'services' | 'staff'>('staff');
  const [serviceSearch, setServiceSearch] = useState('');
  const [serviceCategory, setServiceCategory] = useState<string>('All');
  const [staffSearch, setStaffSearch] = useState('');
  const [staffFilter, setStaffFilter] = useState<'all' | 'on_floor' | 'in_treatment' | 'on_break'>('all');

  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);

  // Filter Services
  const filteredServices = services.filter((srv) => {
    const matchesCat = serviceCategory === 'All' || srv.category === serviceCategory;
    const matchesSearch = srv.name.toLowerCase().includes(serviceSearch.toLowerCase()) ||
      srv.category.toLowerCase().includes(serviceSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Filter Staff
  const filteredStaff = staff.filter((barber) => {
    const matchesSearch = barber.name.toLowerCase().includes(staffSearch.toLowerCase()) ||
      barber.specialty.toLowerCase().includes(staffSearch.toLowerCase()) ||
      barber.chairId.toLowerCase().includes(staffSearch.toLowerCase());

    if (staffFilter === 'on_floor') return matchesSearch && (barber.status === 'active' || barber.status === 'available');
    if (staffFilter === 'in_treatment') return matchesSearch && barber.status === 'in_treatment';
    if (staffFilter === 'on_break') return matchesSearch && barber.status === 'on_break';
    return matchesSearch;
  });

  const totalStaffEarned = staff.reduce((acc, curr) => acc + curr.earnedToday, 0);
  const activeServicesCount = services.filter((s) => s.isActive).length;

  return (
    <div className="flex flex-col w-full px-space-md py-space-sm space-y-4 max-w-md mx-auto pb-24 pt-16">
      {/* Top Segmented Control Switcher */}
      <div className="w-full bg-surface-container-high p-1 rounded-xl flex items-center shadow-xs">
        <button
          onClick={() => setActiveMainTab('services')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeMainTab === 'services'
              ? 'bg-primary text-on-primary shadow-xs'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">spa</span>
          <span>Services Catalog</span>
          <span className="px-1.5 py-0.2 rounded-full bg-surface-container-highest/30 text-[9px]">
            {services.length}
          </span>
        </button>

        <button
          onClick={() => setActiveMainTab('staff')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeMainTab === 'staff'
              ? 'bg-primary text-on-primary shadow-xs'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">badge</span>
          <span>Staff & Barbers</span>
          <span className="px-1.5 py-0.2 rounded-full bg-surface-container-highest/30 text-[9px]">
            {staff.length}
          </span>
        </button>
      </div>

      {/* ================= SECTION 1: SERVICES CATALOG ================= */}
      {activeMainTab === 'services' && (
        <div className="flex flex-col space-y-3 animate-fade-in">
          {/* Search Bar */}
          <div className="relative w-full">
            <Search className="w-4 h-4 text-outline absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search hair, facial, beard rituals..."
              value={serviceSearch}
              onChange={(e) => setServiceSearch(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-surface-container-lowest text-on-surface text-xs font-medium shadow-xs border border-surface-container-high/60 outline-none focus:ring-2 focus:ring-secondary/40"
            />
            {serviceSearch && (
              <button
                onClick={() => setServiceSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {['All', 'Hair Rituals', 'Skin & Facial', 'Beard & Shave', 'Combos'].map((cat) => (
              <button
                key={cat}
                onClick={() => setServiceCategory(cat)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all flex-shrink-0 ${
                  serviceCategory === cat
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Active Menu Stats Ticker */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-high/60 flex items-center justify-between">
              <div>
                <span className="text-[9px] text-outline font-bold uppercase tracking-wider block">Average Ticket</span>
                <span className="text-base font-bold text-on-surface">₹1,533</span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[18px]">payments</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-high/60 flex items-center justify-between">
              <div>
                <span className="text-[9px] text-outline font-bold uppercase tracking-wider block">Live POS Items</span>
                <span className="text-base font-bold text-on-surface">{activeServicesCount} / {services.length}</span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
              </div>
            </div>
          </div>

          {/* Services List */}
          <div className="flex flex-col space-y-2.5">
            {filteredServices.map((srv) => (
              <div
                key={srv.id}
                className="p-3 rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-high/50 flex flex-col space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="font-bold text-xs text-on-surface truncate">{srv.name}</h3>
                      {srv.tag && (
                        <span className="px-1.5 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[8px] font-bold">
                          {srv.tag}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-on-surface-variant">
                      <span className="flex items-center gap-0.5">
                        <Clock className="w-3 h-3 text-outline" /> {srv.durationMinutes} mins
                      </span>
                      <span>•</span>
                      <span>{srv.category}</span>
                    </div>
                    <p className="text-[10px] text-on-surface-variant mt-1 line-clamp-1 leading-tight">
                      {srv.description}
                    </p>
                  </div>

                  <div className="text-right flex-shrink-0 pl-2">
                    <span className="font-bold text-sm text-on-surface block">₹{srv.price.toLocaleString('en-IN')}</span>
                    <span className="text-[9px] text-secondary font-medium">{srv.commissionPercent}% comm.</span>
                  </div>
                </div>

                {/* Bottom Toggle Bar */}
                <div className="flex items-center justify-between pt-1.5 border-t border-surface-container-high/50 text-[10px]">
                  <span className="text-on-surface-variant font-medium">Status on POS Register</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={srv.isActive}
                      onChange={() => {
                        toggleService(srv.id);
                        onSuccessToast(`${srv.name} ${srv.isActive ? 'hidden from' : 'activated on'} POS`);
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-secondary" />
                  </label>
                </div>
              </div>
            ))}
          </div>

          {/* Add Service Button */}
          <button
            onClick={() => setIsAddServiceOpen(true)}
            className="w-full py-3 rounded-xl bg-surface-container-lowest border border-dashed border-secondary text-secondary font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs hover:bg-secondary-fixed/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service to Menu</span>
          </button>
        </div>
      )}

      {/* ================= SECTION 2: STAFF & BARBERS ROSTER ================= */}
      {activeMainTab === 'staff' && (
        <div className="flex flex-col space-y-3 animate-fade-in">
          {/* Search Bar */}
          <div className="relative w-full">
            <Search className="w-4 h-4 text-outline absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search barber name, chair or skill..."
              value={staffSearch}
              onChange={(e) => setStaffSearch(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-surface-container-lowest text-on-surface text-xs font-medium shadow-xs border border-surface-container-high/60 outline-none focus:ring-2 focus:ring-secondary/40"
            />
            {staffSearch && (
              <button
                onClick={() => setStaffSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <button
              onClick={() => setStaffFilter('all')}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all flex-shrink-0 ${
                staffFilter === 'all'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              All Staff ({staff.length})
            </button>
            <button
              onClick={() => setStaffFilter('on_floor')}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all flex-shrink-0 ${
                staffFilter === 'on_floor'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              On Floor ({staff.filter((s) => s.status === 'active' || s.status === 'available').length})
            </button>
            <button
              onClick={() => setStaffFilter('in_treatment')}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all flex-shrink-0 ${
                staffFilter === 'in_treatment'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              In Treatment ({staff.filter((s) => s.status === 'in_treatment').length})
            </button>
            <button
              onClick={() => setStaffFilter('on_break')}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all flex-shrink-0 ${
                staffFilter === 'on_break'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              On Break ({staff.filter((s) => s.status === 'on_break').length})
            </button>
          </div>

          {/* Active Stylists Ticker */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-high/60 flex items-center justify-between">
              <div>
                <span className="text-[9px] text-outline font-bold uppercase tracking-wider block">Active Stylists</span>
                <span className="text-base font-bold text-on-surface">{staff.length} / {staff.length} on duty</span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                <span className="material-symbols-outlined text-[18px]">badge</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-high/60 flex items-center justify-between">
              <div>
                <span className="text-[9px] text-outline font-bold uppercase tracking-wider block">Today's Chair Split</span>
                <span className="text-base font-bold text-secondary">
                  ₹{totalStaffEarned.toLocaleString('en-IN')} <span className="text-[10px] text-outline font-normal">comm.</span>
                </span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[18px]">payments</span>
              </div>
            </div>
          </div>

          {/* Staff Roster Cards */}
          <div className="flex flex-col space-y-2.5">
            {filteredStaff.map((barber) => (
              <div
                key={barber.id}
                className="p-3.5 rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-high/50 flex flex-col space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex gap-2.5 min-w-0">
                    <div className="relative flex-shrink-0">
                      {barber.avatarUrl ? (
                        <img
                          src={barber.avatarUrl}
                          alt={barber.name}
                          className="w-10 h-10 rounded-full object-cover shadow-xs"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs">
                          {barber.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                      )}
                      <span
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                          barber.status === 'active'
                            ? 'bg-secondary'
                            : barber.status === 'in_treatment'
                            ? 'bg-secondary'
                            : barber.status === 'on_break'
                            ? 'bg-outline'
                            : 'bg-green-500'
                        }`}
                      />
                    </div>

                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="font-bold text-xs text-on-surface truncate">{barber.name}</h4>
                        <span className="px-1.5 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[8px] font-bold">
                          {barber.role}
                        </span>
                      </div>
                      <p className="text-[10px] text-on-surface-variant truncate mt-0.5">
                        {barber.specialty} • {barber.experience}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5 text-[10px]">
                        <span className="flex items-center text-secondary font-bold">
                          <Star className="w-2.5 h-2.5 fill-current mr-0.5" />
                          {barber.rating.toFixed(1)}
                        </span>
                        {barber.reviewsCount > 0 && (
                          <span className="text-outline">({barber.reviewsCount} reviews)</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-surface-container text-on-surface">
                      {barber.chairId}
                    </span>
                    <span
                      className={`inline-flex items-center px-1.5 py-0.2 rounded-full text-[8px] font-bold ${
                        barber.status === 'active' || barber.status === 'in_treatment'
                          ? 'bg-secondary-fixed text-on-secondary-fixed'
                          : barber.status === 'on_break'
                          ? 'bg-surface-container text-on-surface-variant'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {barber.status === 'active' ? (
                        <>
                          <span className="w-1 h-1 rounded-full bg-secondary mr-1 animate-pulse" /> Active
                        </>
                      ) : barber.status === 'in_treatment' ? (
                        'In Treatment'
                      ) : barber.status === 'on_break' ? (
                        'On Break'
                      ) : (
                        'Available'
                      )}
                    </span>
                  </div>
                </div>

                {/* Earnings & Client Tally */}
                <div className="flex items-center justify-between pt-2 border-t border-surface-container-high/50 text-[10px]">
                  <span className="text-on-surface-variant font-medium">Today: {barber.clientsToday} clients</span>
                  <span className="font-bold text-xs text-on-surface">
                    ₹{barber.earnedToday.toLocaleString('en-IN')} earned
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating Action Button (FAB): Add Staff */}
      <div className="fixed right-4 bottom-20 z-40">
        <button
          onClick={() => setIsAddStaffOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-on-primary shadow-xl hover:shadow-secondary/20 transition-all transform active:scale-95 group border border-secondary/30"
        >
          <Plus className="w-4 h-4 text-secondary-fixed transition-transform group-hover:rotate-90" />
          <span className="text-xs font-bold tracking-wide">Add Staff</span>
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
        </button>
      </div>

      {/* Modals */}
      <AddStaffModal
        isOpen={isAddStaffOpen}
        onClose={() => setIsAddStaffOpen(false)}
        onSuccess={onSuccessToast}
      />
      <AddServiceModal
        isOpen={isAddServiceOpen}
        onClose={() => setIsAddServiceOpen(false)}
        onSuccess={onSuccessToast}
      />
    </div>
  );
};
