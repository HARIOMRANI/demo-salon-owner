import React, { useState } from 'react';
import { useSalonStore } from './store/salonStore';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Toast } from './components/Toast';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { QueueScreen } from './screens/QueueScreen';
import { ApprovalsScreen } from './screens/ApprovalsScreen';
import { MenuStaffScreen } from './screens/MenuStaffScreen';
import { BillingAffiliateScreen } from './screens/BillingAffiliateScreen';

export function App() {
  const { salonProfile, activeTab, launchErp } = useSalonStore();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col font-sans relative selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      {/* Toast Notification Container */}
      <Toast message={toastMessage} />

      {!salonProfile.isSetupDone ? (
        <div className="flex flex-col min-h-screen">
          {/* Quick Bypass Banner for testing */}
          <div className="bg-secondary-fixed text-on-secondary-fixed px-3 py-1.5 text-center text-[11px] font-bold flex items-center justify-between border-b border-secondary/20 pt-safe">
            <span className="truncate">Bypass mode enabled • Preloaded with Sharma Luxury Salon</span>
            <button
              onClick={() => {
                launchErp();
                showToast('Bypassed to Dashboard Home!');
              }}
              className="px-2 py-0.5 rounded bg-primary text-on-primary text-[10px] font-bold hover:bg-inverse-surface transition-colors flex-shrink-0 ml-2"
            >
              Skip to Dashboard →
            </button>
          </div>
          <OnboardingScreen onSuccessToast={showToast} />
        </div>
      ) : (
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 w-full flex flex-col">
            {activeTab === 'home' && <DashboardScreen onSuccessToast={showToast} />}
            {activeTab === 'queue' && <QueueScreen onSuccessToast={showToast} />}
            {activeTab === 'approvals' && <ApprovalsScreen onSuccessToast={showToast} />}
            {activeTab === 'menu' && <MenuStaffScreen onSuccessToast={showToast} />}
            {activeTab === 'billing' && <BillingAffiliateScreen onSuccessToast={showToast} />}
          </main>
          <Navigation />
        </div>
      )}
    </div>
  );
}

export default App;
