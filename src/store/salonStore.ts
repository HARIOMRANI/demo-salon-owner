import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  SalonProfile,
  Appointment,
  CompletedAppointment,
  WalletApproval,
  Barber,
  ServiceItem,
  VipCustomer,
  ChairStatus,
  ReferralPartner,
  TabType,
} from '../types/salon';

const initialSalonProfile: SalonProfile = {
  name: 'Sharma Luxury Salon & Spa',
  archetype: 'Unisex Luxury Salon',
  address: 'Plot 42, 100ft Road, Indiranagar, Bengaluru - 560038',
  phone: '+91 98450 82190',
  gstNumber: '29AABCU9603R1ZX',
  upiId: 'sharmasalon@hdfcbank',
  isSetupDone: false, // User starts on Onboarding to experience the setup screen first!
};

const initialAppointments: Appointment[] = [
  {
    id: 'appt-1',
    clientName: 'Aarav Malhotra',
    isVip: true,
    vipTier: 'VIP Tier 1',
    barberId: 'barber-1',
    barberName: 'Raju (Master Stylist)',
    chairId: 'C-3',
    service: 'Royal Hair Spa + Beard Sculpting',
    amount: 1850,
    startTime: '16:00',
    runningTimeMinutes: 35,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'appt-2',
    clientName: 'Devendra Joshi',
    isVip: false,
    barberId: 'barber-2',
    barberName: 'Suresh',
    chairId: 'C-1',
    service: 'Executive Haircut + Charcoal Detox',
    amount: 1200,
    startTime: '16:15',
    runningTimeMinutes: 18,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'appt-3',
    clientName: 'Karan Singhania',
    isVip: false,
    barberId: 'barber-6',
    barberName: 'Kabir Sen',
    chairId: 'C-4',
    service: 'Beard Trim & Styling',
    amount: 650,
    startTime: '16:22',
    runningTimeMinutes: 11,
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
  },
];

const initialCompleted: CompletedAppointment[] = [
  {
    id: 'comp-1',
    invoiceNo: 'INV-9821',
    clientName: 'Vikramaditya Roy',
    service: 'Signature Fade',
    chairId: 'C-2',
    barberName: 'Wasim',
    amount: 950,
    completedAt: '14:20',
    settlementMethod: 'Prepaid Wallet',
  },
  {
    id: 'comp-2',
    invoiceNo: 'INV-9820',
    clientName: 'Rohan Mehra',
    service: 'Head Massage + Wash',
    chairId: 'C-5',
    barberName: 'Kabir',
    amount: 800,
    completedAt: '13:45',
    settlementMethod: 'UPI Direct',
  },
  {
    id: 'comp-3',
    invoiceNo: 'INV-9819',
    clientName: 'Aditya Verma',
    service: 'Express Beard Trim',
    chairId: 'SPA',
    barberName: 'Deepika',
    amount: 450,
    completedAt: '13:10',
    settlementMethod: 'Prepaid Wallet',
  },
];

const initialChairs: ChairStatus[] = [
  { id: 'C-1', label: 'C-1', isOccupied: true, status: 'Occupied', clientName: 'Devendra Joshi', barberName: 'Suresh', service: 'Executive Haircut', elapsed: '18m' },
  { id: 'C-2', label: 'C-2', isOccupied: false, status: 'Available' },
  { id: 'C-3', label: 'C-3', isOccupied: true, status: 'Color Processing', clientName: 'Aarav Malhotra (VIP)', barberName: 'Raju Sharma', service: 'Royal Hair Spa', elapsed: '35m' },
  { id: 'C-4', label: 'C-4', isOccupied: true, status: 'Occupied', clientName: 'Karan Singhania', barberName: 'Kabir Sen', service: 'Beard Trim', elapsed: '11m' },
  { id: 'C-5', label: 'C-5', isOccupied: false, status: 'Available' },
  { id: 'SPA', label: 'SPA', isOccupied: true, status: 'VIP Suite Busy', clientName: 'Deepika Padukone', barberName: 'Deepika Rao', service: 'Aroma Therapy', elapsed: '45m' },
];

const initialApprovals: WalletApproval[] = [
  {
    id: 'appr-1',
    clientName: 'Priya Sundaram',
    phone: '+91 99821 44102',
    tier: 'VIP Gold',
    amount: 2000,
    type: 'upi',
    utr: 'UTR: #409218204921',
    timeAgo: '4 mins ago',
    receiptImg: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&auto=format&fit=crop&q=80',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'appr-2',
    clientName: 'Sameer Varma',
    phone: '+91 98200 11984',
    tier: 'Tier 1',
    amount: 1500,
    type: 'cash',
    deskStaff: 'Collected by Reception desk - Desk #1 (Staff: Ananya R.)',
    timeAgo: '12 mins ago',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'appr-3',
    clientName: 'Aditya Birla',
    phone: '+91 97120 44390',
    tier: 'Client',
    amount: 800,
    type: 'upi',
    utr: 'UTR: #409218119023',
    timeAgo: '25 mins ago',
  },
  {
    id: 'appr-4',
    clientName: 'Neha Kapoor',
    phone: '+91 98402 77192',
    tier: 'Frequent',
    amount: 500,
    type: 'upi',
    utr: 'UTR: #409218001894',
    timeAgo: '42 mins ago',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  },
];

const initialStaff: Barber[] = [
  {
    id: 'barber-1',
    name: 'Raju Sharma',
    role: 'Master Barber',
    specialty: 'Hair Artisan',
    experience: '8 yrs exp',
    rating: 5.0,
    reviewsCount: 142,
    chairId: 'Chair #1',
    status: 'active',
    clientsToday: 8,
    earnedToday: 4200,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'barber-2',
    name: 'Suresh Patil',
    role: 'Senior Stylist',
    specialty: 'Beard & Shave',
    experience: '6 yrs exp',
    rating: 4.9,
    reviewsCount: 98,
    chairId: 'Chair #2',
    status: 'available',
    clientsToday: 6,
    earnedToday: 2800,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'barber-3',
    name: 'Deepika Rao',
    role: 'Spa Specialist',
    specialty: 'Skin & Facial',
    experience: '5 yrs exp',
    rating: 4.9,
    reviewsCount: 115,
    chairId: 'Spa Room 1',
    status: 'in_treatment',
    clientsToday: 4,
    earnedToday: 5600,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'barber-4',
    name: 'Vikram Chauhan',
    role: 'Colour Expert',
    specialty: 'Hair & Keratin',
    experience: '7 yrs exp',
    rating: 4.8,
    reviewsCount: 84,
    chairId: 'Chair #3',
    status: 'active',
    clientsToday: 3,
    earnedToday: 6100,
  },
  {
    id: 'barber-5',
    name: 'Ananya Roy',
    role: 'Junior Stylist',
    specialty: 'Wash Rituals',
    experience: '2 yrs exp',
    rating: 4.7,
    reviewsCount: 45,
    chairId: 'Chair #4',
    status: 'on_break',
    clientsToday: 5,
    earnedToday: 1500,
  },
  {
    id: 'barber-6',
    name: 'Kabir Sen',
    role: 'Senior Barber',
    specialty: 'Precision Grooming',
    experience: '4 yrs exp',
    rating: 4.8,
    reviewsCount: 72,
    chairId: 'Chair #5',
    status: 'available',
    clientsToday: 4,
    earnedToday: 2100,
  },
];

const initialVips: VipCustomer[] = [
  {
    rank: 1,
    name: 'Rajesh Khanna',
    tier: 'Elite Diamond',
    visits: 38,
    favoriteService: 'Royal Hair Spa',
    lifetimeSpend: 72400,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  },
  {
    rank: 2,
    name: 'Vikramaditya Roy',
    tier: 'Platinum VIP',
    visits: 31,
    favoriteService: 'Beard Sculpt',
    lifetimeSpend: 58900,
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
  },
  {
    rank: 3,
    name: 'Kabir Mehta',
    tier: 'Gold Tier',
    visits: 27,
    favoriteService: 'Color Treatment',
    lifetimeSpend: 49200,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  {
    rank: 4,
    name: 'Ananya Sen',
    tier: 'Silver Elite',
    visits: 22,
    favoriteService: 'Keratin Care',
    lifetimeSpend: 38100,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    rank: 5,
    name: 'Rohan Gupta',
    tier: 'Silver Elite',
    visits: 19,
    favoriteService: 'Deluxe Facial',
    lifetimeSpend: 31500,
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
  },
];

const initialServices: ServiceItem[] = [
  {
    id: 'srv-1',
    name: 'Signature Royal Haircut',
    category: 'Hair Rituals',
    price: 450,
    durationMinutes: 40,
    commissionPercent: 15,
    isBestseller: true,
    tag: 'Master Stylist',
    description: 'Personalized precision consultation, bespoke wash, scalp massage & styling finish.',
    isActive: true,
  },
  {
    id: 'srv-2',
    name: 'Deep Charcoal Hair Detox Spa',
    category: 'Hair Rituals',
    price: 1200,
    durationMinutes: 60,
    commissionPercent: 18,
    isBestseller: true,
    tag: 'Bestseller',
    description: 'Purifying volcanic clay, ozone mist therapy & peptide repair elixir.',
    isActive: true,
  },
  {
    id: 'srv-3',
    name: 'Gold Radiance Glow Facial',
    category: 'Skin & Facial',
    price: 2200,
    durationMinutes: 75,
    commissionPercent: 20,
    isBestseller: true,
    tag: 'VIP Signature',
    description: 'Ultrasonic pore extraction, botanical gold infusion, hydro-jelly cryo mask.',
    isActive: true,
  },
  {
    id: 'srv-4',
    name: 'Precision Beard Sculpting & Steam',
    category: 'Beard & Shave',
    price: 350,
    durationMinutes: 30,
    commissionPercent: 12,
    isBestseller: false,
    tag: 'Express',
    description: 'Hot towel eucalyptus wrap, straight razor contouring, jojoba hydration.',
    isActive: true,
  },
  {
    id: 'srv-5',
    name: 'Keratin Protein Treatment',
    category: 'Hair Rituals',
    price: 4500,
    durationMinutes: 120,
    commissionPercent: 22,
    isBestseller: false,
    tag: 'Premium Care',
    description: 'Formaldehyde-free intense deep restoration smoothing up to 90 days.',
    isActive: true,
  },
  {
    id: 'srv-6',
    name: 'Express Head & Shoulder Massage',
    category: 'Combos',
    price: 500,
    durationMinutes: 25,
    commissionPercent: 10,
    isBestseller: false,
    tag: 'Add-on',
    description: 'Ayurvedic warm herbal oil tension release pressure points ritual.',
    isActive: true,
  },
  {
    id: 'srv-7',
    name: 'Royal Moroccan Clay Facial',
    category: 'Skin & Facial',
    price: 1800,
    durationMinutes: 50,
    commissionPercent: 18,
    isBestseller: false,
    description: 'Deep mineral pore detox with argan oil hydration.',
    isActive: true,
  },
  {
    id: 'srv-8',
    name: 'Beard Trim & Royal Shave',
    category: 'Beard & Shave',
    price: 300,
    durationMinutes: 25,
    commissionPercent: 12,
    isBestseller: false,
    description: 'Traditional hot foam straight razor grooming.',
    isActive: true,
  },
  {
    id: 'srv-9',
    name: 'Anti-Dandruff Scalp Therapy',
    category: 'Hair Rituals',
    price: 950,
    durationMinutes: 45,
    commissionPercent: 15,
    isBestseller: false,
    description: 'Tea tree and zinc pyrithione purifying cleanse.',
    isActive: true,
  },
  {
    id: 'srv-10',
    name: 'Charcoal Detox Facial',
    category: 'Skin & Facial',
    price: 1100,
    durationMinutes: 40,
    commissionPercent: 15,
    isBestseller: false,
    description: 'Activated charcoal suction treatment for blackheads.',
    isActive: true,
  },
  {
    id: 'srv-11',
    name: 'Groom VIP Deluxe Combo',
    category: 'Combos',
    price: 3200,
    durationMinutes: 90,
    commissionPercent: 20,
    isBestseller: true,
    tag: 'VIP Combo',
    description: 'Haircut, luxury beard sculpt, express facial, and scalp massage.',
    isActive: true,
  },
  {
    id: 'srv-12',
    name: 'Straight Razor Classic Shave',
    category: 'Beard & Shave',
    price: 250,
    durationMinutes: 20,
    commissionPercent: 10,
    isBestseller: false,
    description: 'Single blade shave with soothing sandalwood balm.',
    isActive: true,
  },
  {
    id: 'srv-13',
    name: 'Hair Color Touch-up',
    category: 'Hair Rituals',
    price: 1400,
    durationMinutes: 60,
    commissionPercent: 18,
    isBestseller: false,
    description: 'Ammonia-free root touch-up with gloss finish.',
    isActive: true,
  },
  {
    id: 'srv-14',
    name: 'Relaxing Foot Reflexology',
    category: 'Combos',
    price: 700,
    durationMinutes: 30,
    commissionPercent: 12,
    isBestseller: false,
    description: 'Peppermint foot soak and pressure point massage.',
    isActive: true,
  },
];

const initialReferrals: ReferralPartner[] = [
  {
    id: 'ref-1',
    salonName: 'Prestige Unisex Salon',
    location: 'Koramangala',
    joinedDate: 'Joined Aug 2024',
    currentMonth: 3,
    totalMonths: 5,
    monthlyPayout: 200,
    isCompleted: false,
    initials: 'PU',
  },
  {
    id: 'ref-2',
    salonName: 'Enstyle Studio & Spa',
    location: 'HSR Layout',
    joinedDate: 'Joined Sep 2024',
    currentMonth: 2,
    totalMonths: 5,
    monthlyPayout: 200,
    isCompleted: false,
    initials: 'ES',
  },
  {
    id: 'ref-3',
    salonName: 'Glamour Zone',
    location: 'Whitefield',
    joinedDate: 'Joined Oct 2024',
    currentMonth: 1,
    totalMonths: 5,
    monthlyPayout: 200,
    isCompleted: false,
    initials: 'GZ',
  },
  {
    id: 'ref-4',
    salonName: 'Belleza Hair Lounge',
    location: 'Jayanagar',
    joinedDate: 'Completed 5/5 months',
    currentMonth: 5,
    totalMonths: 5,
    monthlyPayout: 1000,
    isCompleted: true,
    initials: 'BL',
  },
];

interface SalonStore {
  // Navigation & Core Profile
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  salonProfile: SalonProfile;
  updateSalonProfile: (profile: Partial<SalonProfile>) => void;
  launchErp: () => void;

  // KPI Metrics
  todayGross: number;
  weeklyRun: number;
  reconciledTodayCount: number;
  reconciledTodayAmount: number;

  // Operational Queues
  activeAppointments: Appointment[];
  completedAppointments: CompletedAppointment[];
  chairs: ChairStatus[];
  walletApprovals: WalletApproval[];
  staff: Barber[];
  services: ServiceItem[];
  vips: VipCustomer[];
  referrals: ReferralPartner[];

  // Actions
  completeAppointment: (appointmentId: string) => void;
  approveWalletTopup: (approvalId: string) => void;
  rejectWalletTopup: (approvalId: string) => void;
  addWalkIn: (data: { clientName: string; serviceName: string; barberId: string; chairId: string; amount: number; isVip?: boolean }) => void;
  addStaffTip: (barberId: string, amount: number) => void;
  addQuickBill: (amount: number, description?: string) => void;
  addStaff: (barber: Omit<Barber, 'id' | 'clientsToday' | 'earnedToday' | 'reviewsCount'>) => void;
  addService: (service: Omit<ServiceItem, 'id' | 'isActive'>) => void;
  toggleService: (serviceId: string) => void;
  resetDemoData: () => void;
}

export const useSalonStore = create<SalonStore>()(
  persist(
    (set, get) => ({
      activeTab: 'home',
      setActiveTab: (tab) => set({ activeTab: tab }),

      salonProfile: initialSalonProfile,
      updateSalonProfile: (profile) =>
        set((state) => ({ salonProfile: { ...state.salonProfile, ...profile } })),
      launchErp: () =>
        set((state) => ({
          salonProfile: { ...state.salonProfile, isSetupDone: true },
          activeTab: 'home',
        })),

      todayGross: 24850,
      weeklyRun: 142600,
      reconciledTodayCount: 18,
      reconciledTodayAmount: 24500,

      activeAppointments: initialAppointments,
      completedAppointments: initialCompleted,
      chairs: initialChairs,
      walletApprovals: initialApprovals,
      staff: initialStaff,
      services: initialServices,
      vips: initialVips,
      referrals: initialReferrals,

      completeAppointment: (appointmentId: string) => {
        const state = get();
        const appointment = state.activeAppointments.find((a) => a.id === appointmentId);
        if (!appointment) return;

        // 1. Create completed appointment
        const completed: CompletedAppointment = {
          id: `comp-${Date.now()}`,
          invoiceNo: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
          clientName: appointment.clientName,
          service: appointment.service,
          chairId: appointment.chairId,
          barberName: appointment.barberName,
          amount: appointment.amount,
          completedAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false }),
          settlementMethod: 'Prepaid Platinum Wallet',
        };

        // 2. Free assigned chair
        const updatedChairs = state.chairs.map((chair) => {
          if (chair.id === appointment.chairId || chair.label === appointment.chairId) {
            return {
              ...chair,
              isOccupied: false,
              status: 'Available' as const,
              clientName: undefined,
              barberName: undefined,
              service: undefined,
              elapsed: undefined,
            };
          }
          return chair;
        });

        // 3. Increment barber earnings and client count
        const updatedStaff = state.staff.map((barber) => {
          if (barber.id === appointment.barberId || appointment.barberName.toLowerCase().includes(barber.name.toLowerCase().split(' ')[0])) {
            return {
              ...barber,
              clientsToday: barber.clientsToday + 1,
              earnedToday: barber.earnedToday + appointment.amount,
              status: 'available' as const,
            };
          }
          return barber;
        });

        // 4. Update store
        set({
          activeAppointments: state.activeAppointments.filter((a) => a.id !== appointmentId),
          completedAppointments: [completed, ...state.completedAppointments],
          todayGross: state.todayGross + appointment.amount,
          weeklyRun: state.weeklyRun + appointment.amount,
          chairs: updatedChairs,
          staff: updatedStaff,
        });
      },

      approveWalletTopup: (approvalId: string) => {
        const state = get();
        const approval = state.walletApprovals.find((a) => a.id === approvalId);
        if (!approval) return;

        set({
          walletApprovals: state.walletApprovals.filter((a) => a.id !== approvalId),
          todayGross: state.todayGross + approval.amount,
          weeklyRun: state.weeklyRun + approval.amount,
          reconciledTodayCount: state.reconciledTodayCount + 1,
          reconciledTodayAmount: state.reconciledTodayAmount + approval.amount,
        });
      },

      rejectWalletTopup: (approvalId: string) => {
        const state = get();
        set({
          walletApprovals: state.walletApprovals.filter((a) => a.id !== approvalId),
        });
      },

      addWalkIn: (data) => {
        const state = get();
        const selectedBarber = state.staff.find((s) => s.id === data.barberId);
        const barberName = selectedBarber ? selectedBarber.name : 'Master Stylist';

        const newAppointment: Appointment = {
          id: `appt-${Date.now()}`,
          clientName: data.clientName,
          isVip: !!data.isVip,
          vipTier: data.isVip ? 'VIP Tier 1' : undefined,
          barberId: data.barberId,
          barberName: barberName,
          chairId: data.chairId,
          service: data.serviceName,
          amount: data.amount,
          startTime: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false }),
          runningTimeMinutes: 1,
        };

        // Update chair status to Occupied
        const updatedChairs = state.chairs.map((chair) => {
          if (chair.id === data.chairId || chair.label === data.chairId) {
            return {
              ...chair,
              isOccupied: true,
              status: 'Occupied' as const,
              clientName: data.clientName,
              barberName: barberName,
              service: data.serviceName,
              elapsed: '1m',
            };
          }
          return chair;
        });

        // Set barber to active
        const updatedStaff = state.staff.map((barber) => {
          if (barber.id === data.barberId) {
            return { ...barber, status: 'active' as const };
          }
          return barber;
        });

        set({
          activeAppointments: [newAppointment, ...state.activeAppointments],
          chairs: updatedChairs,
          staff: updatedStaff,
        });
      },

      addStaffTip: (barberId: string, amount: number) => {
        const state = get();
        set({
          staff: state.staff.map((barber) => {
            if (barber.id === barberId) {
              return { ...barber, earnedToday: barber.earnedToday + amount };
            }
            return barber;
          }),
        });
      },

      addQuickBill: (amount: number) => {
        const state = get();
        set({
          todayGross: state.todayGross + amount,
          weeklyRun: state.weeklyRun + amount,
        });
      },

      addStaff: (barberData) => {
        const state = get();
        const newBarber: Barber = {
          ...barberData,
          id: `barber-${Date.now()}`,
          clientsToday: 0,
          earnedToday: 0,
          reviewsCount: 0,
        };
        set({
          staff: [...state.staff, newBarber],
        });
      },

      addService: (serviceData) => {
        const state = get();
        const newService: ServiceItem = {
          ...serviceData,
          id: `srv-${Date.now()}`,
          isActive: true,
        };
        set({
          services: [newService, ...state.services],
        });
      },

      toggleService: (serviceId: string) => {
        const state = get();
        set({
          services: state.services.map((srv) =>
            srv.id === serviceId ? { ...srv, isActive: !srv.isActive } : srv
          ),
        });
      },

      resetDemoData: () => {
        set({
          salonProfile: initialSalonProfile,
          activeTab: 'home',
          todayGross: 24850,
          weeklyRun: 142600,
          reconciledTodayCount: 18,
          reconciledTodayAmount: 24500,
          activeAppointments: initialAppointments,
          completedAppointments: initialCompleted,
          chairs: initialChairs,
          walletApprovals: initialApprovals,
          staff: initialStaff,
          services: initialServices,
          vips: initialVips,
          referrals: initialReferrals,
        });
      },
    }),
    {
      name: 'auraos-salon-store-v1',
    }
  )
);
