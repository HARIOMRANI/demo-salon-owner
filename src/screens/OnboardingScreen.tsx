import React, { useState, useRef } from 'react';
import { useSalonStore } from '../store/salonStore';
import { BusinessArchetype } from '../types/salon';
import {
  Smartphone,
  CheckCircle,
  Shield,
  ArrowRight,
  Store,
  Sparkles,
  Diamond,
  Scissors,
  Brush,
  MapPin,
  QrCode,
  RefreshCw,
  Rocket,
  Lock,
  CreditCard,
  FileCheck,
} from 'lucide-react';

interface OnboardingScreenProps {
  onSuccessToast: (msg: string) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onSuccessToast }) => {
  const { salonProfile, updateSalonProfile, launchErp } = useSalonStore();

  const [activePhase, setActivePhase] = useState<'auth' | 'profile'>('profile');
  const [phone, setPhone] = useState(salonProfile.phone || '98450 82190');
  const [otp, setOtp] = useState(['7', '3', '9', '4', '2', '8']);
  const [salonName, setSalonName] = useState(salonProfile.name);
  const [archetype, setArchetype] = useState<BusinessArchetype>(salonProfile.archetype);
  const [address, setAddress] = useState(salonProfile.address);
  const [qrPreview, setQrPreview] = useState<string | null>(salonProfile.upiQrImage || null);
  const [countdown, setCountdown] = useState(24);
  const [isLaunching, setIsLaunching] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleQrUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrPreview(reader.result as string);
        updateSalonProfile({ upiQrImage: reader.result as string });
        onSuccessToast('Store UPI QR updated successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLaunch = () => {
    setIsLaunching(true);
    updateSalonProfile({
      name: salonName.trim() || 'Sharma Luxury Salon & Spa',
      archetype,
      address: address.trim() || 'Plot 42, 100ft Road, Indiranagar, Bengaluru - 560038',
      phone: `+91 ${phone}`,
    });

    setTimeout(() => {
      setIsLaunching(false);
      launchErp();
      onSuccessToast(`AuraOS Launched for ${salonName}!`);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-surface pb-16 pt-safe">
      {/* Brand & Mode Switcher Bar */}
      <div className="px-space-md pt-3 pb-2 flex items-center justify-between max-w-md mx-auto w-full">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-[18px] text-secondary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>
              spa
            </span>
          </div>
          <div>
            <p className="font-bold text-sm text-on-surface tracking-tight leading-none">AuraOS</p>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Luxury Salon ERP</p>
          </div>
        </div>

        {/* Phase Pill Toggle */}
        <div className="flex items-center bg-surface-container-high p-1 rounded-full space-x-1 shadow-xs">
          <button
            onClick={() => setActivePhase('auth')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              activePhase === 'auth'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            1. Fast Access
          </button>
          <button
            onClick={() => setActivePhase('profile')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              activePhase === 'profile'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            2. Salon Profile
          </button>
        </div>
      </div>

      {/* Decorative Context Banner */}
      <div className="px-space-md mb-3 mt-1 max-w-md mx-auto w-full">
        <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-4 shadow-xs border border-surface-container-high/60">
          <div className="relative z-10 flex items-start justify-between">
            <div className="pr-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-secondary-fixed text-on-secondary-fixed mb-1.5 font-bold">
                <Sparkles className="w-3 h-3 mr-1 text-secondary" />
                Concierge Setup
              </span>
              <h1 className="font-bold text-lg text-on-surface leading-tight">Digital Flagship Engine</h1>
              <p className="text-xs text-on-surface-variant mt-0.5">Empowering bespoke salon, aesthetic lounge & spa rituals.</p>
            </div>
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-xs flex-shrink-0 bg-surface-container">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=150&auto=format&fit=crop&q=80"
                alt="Salon Interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-secondary-container/10 blur-xl pointer-events-none" />
        </div>
      </div>

      <div className="max-w-md mx-auto w-full px-space-md">
        {/* PHASE 1: Fast Access Card */}
        {activePhase === 'auth' && (
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm space-y-4 border border-surface-container-high/50 animate-slide-up">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-secondary font-bold uppercase tracking-widest">Phase 01</span>
                <h2 className="font-bold text-base text-on-surface">Partner Verification</h2>
              </div>
              <CheckCircle className="w-6 h-6 text-secondary" />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-on-surface flex items-center justify-between">
                <span>Registered Partner Phone</span>
                <span className="text-[10px] text-secondary font-bold">Verified Merchant</span>
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 flex items-center space-x-1 text-on-surface-variant pointer-events-none">
                  <Smartphone className="w-4 h-4 text-outline" />
                  <span className="text-xs font-bold text-on-surface pl-1">+91</span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-20 pr-10 py-2.5 bg-surface-container-low text-on-surface font-bold text-sm rounded-lg outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/40"
                />
                <CheckCircle className="w-4 h-4 text-secondary absolute right-3" />
              </div>
            </div>

            {/* 6-Digit OTP */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-on-surface">6-Digit Access Token</label>
                <span className="text-[10px] text-on-surface-variant">Instant Bypass Ready</span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-full text-center py-2.5 bg-surface-container-low font-bold text-base text-on-surface rounded-lg outline-none focus:ring-2 focus:ring-secondary/40 focus:bg-surface-container-lowest"
                  />
                ))}
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-on-surface-variant">Token valid • {countdown}s remaining</span>
                <button
                  type="button"
                  onClick={() => {
                    setCountdown(30);
                    onSuccessToast('New access token dispatched via SMS!');
                  }}
                  className="text-xs text-secondary font-bold hover:underline"
                >
                  Resend Code
                </button>
              </div>
            </div>

            {/* Quick Session Badge */}
            <div className="rounded-xl bg-surface-container-low p-3 flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-on-surface truncate">Multi-factor Master Node</p>
                <p className="text-[11px] text-on-surface-variant truncate">Direct cryptographic binding with Salon POS terminals</p>
              </div>
            </div>

            {/* Advance to Phase 2 */}
            <button
              onClick={() => setActivePhase('profile')}
              className="w-full py-3.5 px-4 bg-primary text-on-primary rounded-xl font-bold text-sm flex items-center justify-center space-x-2 shadow-md hover:bg-inverse-surface transition-all active:scale-[0.98]"
            >
              <span>Verify & Continue Setup</span>
              <ArrowRight className="w-4 h-4 text-secondary-fixed" />
            </button>
          </div>
        )}

        {/* PHASE 2: Multi-step Onboarding Card */}
        {activePhase === 'profile' && (
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm space-y-4 border border-surface-container-high/50 animate-slide-up">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold tracking-wide uppercase">
                    Step 2 of 2
                  </span>
                  <span className="text-xs text-on-surface-variant font-medium">Salon Identity</span>
                </div>
                <h2 className="font-bold text-lg text-on-surface mt-1">Setup Your Salon Profile</h2>
              </div>
              <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                <Store className="w-4 h-4 text-secondary" />
              </div>
            </div>

            {/* Salon Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-on-surface flex items-center justify-between">
                <span>Salon / Spa Legal Brand</span>
                <Sparkles className="w-3.5 h-3.5 text-secondary" />
              </label>
              <input
                type="text"
                value={salonName}
                onChange={(e) => setSalonName(e.target.value)}
                placeholder="Enter salon brand name"
                className="w-full px-3.5 py-2.5 bg-surface-container-low text-on-surface font-bold text-sm rounded-lg outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/40 transition-all"
              />
            </div>

            {/* Archetype Selector */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-on-surface">Business Archetype</label>
                <span className="text-[10px] text-on-surface-variant font-medium">Sets service matrix</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setArchetype('Unisex Luxury Salon')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    archetype === 'Unisex Luxury Salon'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <Diamond className="w-3.5 h-3.5 text-secondary-fixed" />
                  <span>Unisex Luxury Salon</span>
                </button>

                <button
                  type="button"
                  onClick={() => setArchetype('Men Grooming Lounge')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    archetype === 'Men Grooming Lounge'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <Scissors className="w-3.5 h-3.5 text-secondary-fixed" />
                  <span>Men Grooming Lounge</span>
                </button>

                <button
                  type="button"
                  onClick={() => setArchetype('Bridal Studio')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    archetype === 'Bridal Studio'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <Brush className="w-3.5 h-3.5 text-secondary-fixed" />
                  <span>Bridal Studio</span>
                </button>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-on-surface flex items-center justify-between">
                <span>Registered Premises Address</span>
                <span className="text-[10px] text-secondary font-bold">Geo-validated</span>
              </label>
              <div className="relative">
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full pl-3.5 pr-8 py-2 bg-surface-container-low text-on-surface font-medium text-xs rounded-lg outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/40 resize-none leading-relaxed"
                />
                <MapPin className="w-4 h-4 text-on-surface-variant absolute right-3 top-2.5" />
              </div>
            </div>

            {/* UPI QR Code Visual Upload Box */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-secondary" />
                  <span>Store UPI QR Code</span>
                </label>
                <span className="text-[10px] text-secondary font-bold">Instant Settlements</span>
              </div>

              <div className="rounded-xl bg-gradient-to-br from-surface-container-lowest to-surface-container-low p-3.5 shadow-xs border border-surface-container-high flex flex-col sm:flex-row items-center gap-3">
                {/* QR Graphic Frame */}
                <div className="relative w-24 h-24 rounded-xl bg-surface-container-lowest p-2 shadow-xs shrink-0 flex items-center justify-center border border-surface-container-high overflow-hidden">
                  {qrPreview ? (
                    <img src={qrPreview} alt="Store UPI QR" className="w-full h-full object-contain" />
                  ) : (
                    <svg className="w-full h-full text-primary" fill="currentColor" viewBox="0 0 100 100">
                      <rect fill="currentColor" height="28" rx="4" width="28" x="5" y="5" />
                      <rect fill="white" height="20" rx="2" width="20" x="9" y="9" />
                      <rect fill="currentColor" height="12" rx="1" width="12" x="13" y="13" />
                      <rect fill="currentColor" height="28" rx="4" width="28" x="67" y="5" />
                      <rect fill="white" height="20" rx="2" width="20" x="71" y="9" />
                      <rect fill="currentColor" height="12" rx="1" width="12" x="75" y="13" />
                      <rect fill="currentColor" height="28" rx="4" width="28" x="5" y="67" />
                      <rect fill="white" height="20" rx="2" width="20" x="9" y="71" />
                      <rect fill="currentColor" height="12" rx="1" width="12" x="13" y="75" />
                      <rect fill="#d97706" height="18" rx="2" width="18" x="41" y="41" />
                      <rect fill="currentColor" height="6" rx="1" width="6" x="42" y="8" />
                      <rect fill="currentColor" height="14" rx="1" width="6" x="52" y="8" />
                      <rect fill="currentColor" height="6" rx="1" width="14" x="42" y="24" />
                      <rect fill="currentColor" height="14" rx="1" width="6" x="8" y="42" />
                      <rect fill="currentColor" height="8" rx="1" width="10" x="68" y="42" />
                      <rect fill="currentColor" height="18" rx="1" width="8" x="82" y="42" />
                      <rect fill="currentColor" height="18" rx="1" width="8" x="42" y="68" />
                      <rect fill="currentColor" height="8" rx="1" width="18" x="74" y="74" />
                    </svg>
                  )}
                  <span className="absolute bottom-1 bg-surface-container-high px-1 py-0.2 rounded text-[7px] font-bold text-on-surface">
                    AUTO-PAY
                  </span>
                </div>

                <div className="flex-1 text-center sm:text-left space-y-1">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[9px] font-bold">
                    <CheckCircle className="w-3 h-3 text-secondary" />
                    <span>QR Verified for Direct Customer Top-ups</span>
                  </div>
                  <p className="font-bold text-xs text-on-surface">Accept Instant Payments</p>
                  <p className="text-[11px] text-on-surface-variant leading-tight">
                    Direct routing to HDFC Current Account (••4092) via PhonePe/GPay merchant rails.
                  </p>

                  <div className="pt-1 flex items-center justify-center sm:justify-start gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleQrUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-[11px] font-bold flex items-center gap-1 transition-colors"
                    >
                      <RefreshCw className="w-3 h-3 text-secondary" />
                      <span>{qrPreview ? 'Change QR' : 'Upload Gallery QR'}</span>
                    </button>
                    <span className="text-[10px] text-green-700 font-bold">✓ Live Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Launch ERP Master CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleLaunch}
                disabled={isLaunching}
                className="w-full py-4 px-4 bg-primary text-on-primary rounded-xl font-bold text-sm flex items-center justify-between shadow-lg hover:bg-inverse-surface transition-all active:scale-[0.98]"
              >
                <div className="flex items-center space-x-2">
                  <Rocket className="w-5 h-5 text-secondary-fixed" />
                  <span className="tracking-wide">{isLaunching ? 'Provisioning Salon Floor...' : 'Save Salon Profile & Launch ERP'}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-surface-container-lowest/15 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-secondary-fixed" />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Security & Trust Micro-Footer */}
        <div className="flex items-center justify-center space-x-3 py-4 text-on-surface-variant text-[11px] font-medium">
          <span className="flex items-center space-x-1">
            <Lock className="w-3.5 h-3.5 text-secondary" />
            <span>256-Bit Vault Storage</span>
          </span>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <CreditCard className="w-3.5 h-3.5 text-secondary" />
            <span>Zero MDR Routing</span>
          </span>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <FileCheck className="w-3.5 h-3.5 text-secondary" />
            <span>GST Validated</span>
          </span>
        </div>
      </div>
    </div>
  );
};
