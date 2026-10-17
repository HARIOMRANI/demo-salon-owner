# AuraOS — Royal Salon ERP (Android Mobile Application)

Production-grade, mobile-first Android application designed for luxury salon and spa owners. Faithfully built to 100% replicate the Google Stitch **"Salon owner"** workspace with live reactive state management, persistent local storage, and preloaded demo data.

---

## 📱 Features & Implemented Stitch Screens

### 1. Auth & Salon Onboarding (`OnboardingScreen`)
* **Phase 1: Fast Access / Partner Verification:**
  * Phone number input (+91 pre-fill) with verified merchant status.
  * 6-digit OTP code inputs with auto-focus and 30-second resend countdown.
  * Multi-factor Master Node security badge.
  * **Testing Bypass Mode:** Type any dummy text (or leave defaults) to test immediately without strict backend locks.
* **Phase 2: Salon Profile ("Setup Your Salon Profile"):**
  * Brand legal name input (*"Sharma Luxury Salon & Spa"* by default).
  * Business Archetype pill selectors (*Unisex Luxury Salon*, *Men Grooming Lounge*, *Bridal Studio*).
  * Geo-validated registered premises address.
  * **Interactive Store UPI QR Box:** Displays live vector QR with *"QR Verified for Direct Customer Top-ups"* and a functional *"Replace QR / Upload Gallery QR"* file picker.
  * **"Save Salon Profile & Launch ERP"** primary CTA button. Updates salon brand name dynamically across the entire app.

### 2. Dashboard Home (`DashboardScreen`)
* **Header & Salon Identity:** Dynamically displays salon name, flagship live indicator, pending notifications counter, and 1-click **Reset Demo Data** action.
* **Pro Trial Active Banner:** Day 8 of 14 timeline, early bird ₹1,000/mo rate lock, and upgrade modal trigger.
* **Dynamic KPI Counters:**
  * `TODAY'S GROSS` (preloaded: ₹24,850) — increments automatically upon completing queue appointments, approving wallet top-ups, or recording quick bills.
  * `WEEKLY RUN` (preloaded: ₹1,42,600) — includes 7-day SVG trend sparkline.
  * `Pending Approvals Badge` (4 Waiting, ₹4,800) — clicking navigates directly to Approvals tab.
* **Direct Actions (Instant Desk):**
  * `Walk-in Client`: Modal to enter client name, pick service, assign barber, and allocate chair (`C-1` to `C-5` or `SPA`). Automatically occupies chair and dispatches to queue!
  * `Staff Tip`: Modal to select stylist and tip amount, instantly crediting their daily earnings.
  * `Quick Bill`: Instant desk invoice adding amount straight to today's gross revenue.
* **Live Chair Dynamics (C1–C5 & SPA Suite):**
  * Real-time occupancy status indicators.
  * Clicking any chair opens the station modal showing seated patron, barber, service, elapsed time, and quick actions.
* **Top VIP Customers (Loyalty Leaderboard):**
  * Ranked leaderboard (*Rajesh Khanna*, *Vikramaditya Roy*, *Kabir Mehta*, *Ananya Sen*, *Rohan Gupta*) with spend, tier badges, and favorite services.

### 3. Live Queue & Wallet Completion (`QueueScreen`)
* **Active Appointments:** Preloaded with running clients:
  * *Aarav Malhotra* (VIP Tier 1) — Chair #3, Raju (Master Stylist), ₹1,850, 35m running.
  * *Devendra Joshi* — Chair #1, Suresh, ₹1,200, 18m running.
  * *Karan Singhania* — Chair #4, Kabir Sen, ₹650, 11m running.
* **"Mark as Completed" Flow:**
  * Opens the **Irrevocable Action** modal.
  * Displays bill amount and cryptographic wallet deduction notice.
  * Security check: requires typing `DEDUCT` to unlock.
  * 1.5-second interactive hold button with progress bar (*"Hold to Deduct & Close Ticket"*).
  * Confetti celebration and instant state transition: removes client from active queue, adds to locked receipts, updates Today's Gross, increments barber commission, and frees the assigned chair.
* **Recently Completed & Locked Receipts:**
  * Invoices *INV-9821*, *INV-9820*, and *INV-9819* with locked stamps.

### 4. Wallet Approvals System (`ApprovalsScreen`)
* **Filter Tabs:** `All (4)`, `UPI Direct (3)`, and `Cash Counter (1)`.
* **Preloaded Top-up Requests:**
  * *Priya Sundaram* (₹2,000, UPI Direct) with expandable UPI screenshot proof.
  * *Sameer Varma* (₹1,500, Cash Counter Handover).
  * *Aditya Birla* (₹800, Paid via UPI).
  * *Neha Kapoor* (₹500, QR Code Scan).
* **Interactive Actions:**
  * `Approve (Credit ₹X)`: Credits client wallet, removes from pending, updates Today's Gross, and increments Central Ledger.
  * `Reject`: Removes request with cancellation feedback.
  * Dynamic `Queue Cleared!` zero-state card.
* **Central Ledger Reconciliation:** Shows cleared count and total amount credited today.

### 5. Menu & Staff Manager (`MenuStaffScreen`)
* **Dual View Switcher:** `Services Catalog` (14 items) vs `Staff & Barbers` (6 members).
* **Services Catalog:**
  * Search filter & category pills (*Hair Rituals, Skin & Facial, Beard & Shave, Combos*).
  * Toggle switches to enable/disable rituals on the live POS register.
  * `+ Add New Service` modal.
* **Staff & Barbers Duty Tracker:**
  * Real-time duty status (*Raju Sharma, Suresh Patil, Deepika Rao, Vikram Chauhan, Ananya Roy, Kabir Sen*).
  * Filter pills (*All Staff, On Floor, In Treatment, On Break*).
  * Today's client count & earned commissions.
  * Floating `+ Add Staff` button to onboard stylists with custom chair assignments.

### 6. SaaS Billing & Affiliate Program (`BillingAffiliateScreen`)
* **Dual View Switcher:** `SaaS Plans & Sub` vs `Refer & Earn (Affiliate)`.
* **SaaS Plans:** 14-day trial timeline, Annual Early Bird tier (₹1,000/mo billed ₹12,000), Bi-Annual, Monthly, and NPCI e-Mandate auto-pay authorization sheet.
* **Refer & Earn (Affiliate):**
  * Earning model: ₹200/mo for 5 months (₹1,000 total per referred salon).
  * Unique code `SHARMA-ROYAL-99` with 1-click clipboard copy.
  * Green **"Share via WhatsApp"** button triggering native WhatsApp share with pre-filled invitation.
  * Payout metrics (Total Earned ₹4,800, 6 Active Salons, Next Payout ₹1,200).
  * Active Referrals Ledger (4 recorded salons).

---

## 🛠️ Tech Stack
* **UI & Core:** React 19 + TypeScript + Vite + Tailwind CSS.
* **Mobile Runtime:** Capacitor 8 (`@capacitor/android`, `@capacitor/core`).
* **State Management:** Zustand with `persist` (`localStorage`).
* **Icons & Fonts:** Plus Jakarta Sans + Material Symbols Outlined + Lucide Icons.

---

## 📦 How to Run & Build Android APK

### 1. Run in Browser / Local Mobile Emulator
```bash
npm install
npm run dev
```

### 2. Build Android Project Locally
```bash
# Build web dist and sync to native Android
npm run build:android

# Open in Android Studio to run on physical device or emulator
npx cap open android
```

### 3. Generate Android APK via CLI (requires local Android SDK & JDK 17)
```bash
cd android
./gradlew assembleDebug
# Generated APK will be located at:
# android/app/build/outputs/apk/debug/app-debug.apk
```

### 4. Automated Cloud APK Build (GitHub Actions)
The repository includes a ready-to-run GitHub Actions workflow at [`.github/workflows/build-apk.yml`](.github/workflows/build-apk.yml).
Simply push to GitHub:
```bash
git push origin main
```
GitHub Actions will automatically compile the Android APK and make `demo-salon-owner.apk` available for 1-click download under the workflow run's **Artifacts** tab!
