export type BusinessArchetype = 'Unisex Luxury Salon' | 'Men Grooming Lounge' | 'Bridal Studio';

export interface SalonProfile {
  name: string;
  archetype: BusinessArchetype;
  address: string;
  phone: string;
  gstNumber?: string;
  upiId: string;
  upiQrImage?: string;
  isSetupDone: boolean;
}

export interface Appointment {
  id: string;
  clientName: string;
  isVip: boolean;
  vipTier?: string;
  barberId: string;
  barberName: string;
  chairId: string;
  service: string;
  amount: number;
  startTime: string;
  runningTimeMinutes: number;
  avatarUrl?: string;
}

export interface CompletedAppointment {
  id: string;
  invoiceNo: string;
  clientName: string;
  service: string;
  chairId: string;
  barberName: string;
  amount: number;
  completedAt: string;
  settlementMethod: string;
}

export interface WalletApproval {
  id: string;
  clientName: string;
  phone: string;
  tier: string;
  amount: number;
  type: 'upi' | 'cash';
  utr?: string;
  timeAgo: string;
  receiptImg?: string;
  deskStaff?: string;
  avatarUrl?: string;
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  rating: number;
  reviewsCount: number;
  chairId: string;
  status: 'active' | 'available' | 'in_treatment' | 'on_break';
  clientsToday: number;
  earnedToday: number;
  avatarUrl?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: 'Hair Rituals' | 'Skin & Facial' | 'Beard & Shave' | 'Combos';
  price: number;
  durationMinutes: number;
  commissionPercent: number;
  isBestseller: boolean;
  description: string;
  isActive: boolean;
  tag?: string;
  imageUrl?: string;
}

export interface VipCustomer {
  rank: number;
  name: string;
  tier: string;
  visits: number;
  favoriteService: string;
  lifetimeSpend: number;
  avatarUrl: string;
}

export interface ChairStatus {
  id: string;
  label: string;
  isOccupied: boolean;
  status: 'Occupied' | 'Color Processing' | 'VIP Suite Busy' | 'Available';
  clientName?: string;
  barberName?: string;
  service?: string;
  elapsed?: string;
}

export interface ReferralPartner {
  id: string;
  salonName: string;
  location: string;
  joinedDate: string;
  currentMonth: number;
  totalMonths: number;
  monthlyPayout: number;
  isCompleted: boolean;
  initials: string;
}

export type TabType = 'home' | 'queue' | 'approvals' | 'menu' | 'billing';
