# 🛡️ SCAMSHIELD

> **AI-Powered Multilingual UPI & Scam Message Protection**  
> *"Don't get scammed. Know before you pay."*

[![Hackathon](https://img.shields.io/badge/Hackatopia%202026-Problem%20FT--01-0ea5e9?style=for-the-badge)](https://github.com/zer0neo/SCAMSHIELD)
[![Stack](https://img.shields.io/badge/Stack-React%2018%20%7C%20Vite%20%7C%20TypeScript%20%7C%20Tailwind-38bdf8?style=for-the-badge)](https://vitejs.dev/)
[![Languages](https://img.shields.io/badge/Languages-English%20%7C%20ಕನ್ನಡ%20%7C%20हिन्दी-10b981?style=for-the-badge)](#-multilingual-support)
[![Branch](https://img.shields.io/badge/Git%20Branch-Frontend-f59e0b?style=for-the-badge)](https://github.com/zer0neo/SCAMSHIELD/tree/Frontend)

---

## 📌 Problem Statement: FT-01

**Vernacular Scam and UPI Fraud Message Shield**

### Context & Challenge
First-time and elderly digital payment users in India are disproportionately targeted by cybercriminals using:
- **Fake KYC Update SMS:** Falsely threatening net-banking suspension or SIM deactivation to steal login credentials and OTPs.
- **Reverse UPI Collect Fraud:** Disguising collect requests as "refunds" or "lottery cashbacks", tricking users into entering their UPI PIN under the false assumption that PIN entry is required to receive funds.
- **Logistics & Redelivery Traps:** Small ₹5–₹10 fee requests on shortened links (`bit.ly`) that capture card CVVs.
- **Language Barriers:** Most fraud warning tools operate strictly in English with technical jargon that vernacular speakers and senior citizens cannot easily comprehend.

### Objective
Build a lightweight, highly accessible security tool that takes an incoming message, screenshot, or simulated UPI collect request, classifies it as **SAFE**, **SUSPICIOUS**, or **SCAM**, and explains **WHY** with actionable instructions in the user's native language (**English**, **Kannada**, and **Hindi** at minimum).

---

## ✨ Key Features

### 1. 🔍 Multi-Modal Threat Analyzer
- **Message Analyzer:** Paste SMS, WhatsApp alerts, emails, or payment remarks with character count, instant sample loading, and real-time validation.
- **Screenshot OCR Analyzer:** Drag-and-drop image upload supporting PNG, JPG, JPEG, and WEBP (up to 10 MB) with OCR explanation and instant sample generation.
- **Simulated UPI Collect Request:** Educational simulator modeling incoming collect requests (e.g. ₹4,999 from `rahul@xyzbank`) to demonstrate UPI reverse-debit fraud detection.

### 2. 📊 Transparent, Explainable Risk Scoring (0–100)
- **High-Impact Visual Indicator:** Animated circular risk ring transitioning smoothly from 0 to the final threat score with glowing color-coded borders.
- **Signal Weight Breakdown:** Demonstrates explainability rather than a black-box AI verdict. Breaks down individual risk contributions:
  - 🚩 **Urgency & Fear Tactics** (`+25 risk`)
  - 🔗 **Deceptive Phishing Domain** (`+30 risk`)
  - 🏦 **Bank Official Impersonation** (`+20 risk`)
  - 🔐 **Credential Harvesting Intent** (`+19 risk`)

### 3. 🌐 Deep Vernacular Localization (English • ಕನ್ನಡ • हिन्दी)
- Full static and dynamic localization across:
  - Immediate high-contrast threat verdicts:
    - 🔴 **SCAM:** `CRITICAL WARNING: FRAUD DETECTED!` / `ಅಪಾಯ: ಇದು ಮೋಸದ ಸಂದೇಶ! ಹಣ ಕಳುಹಿಸಬೇಡಿ!` / `ख़तरा: यह धोखाधड़ी वाला संदेश है! पैसे न भेजें!`
    - 🟡 **SUSPICIOUS:** `CAUTION: SUSPICIOUS SIGNALS DETECTED!` / `ಎಚ್ಚರಿಕೆ: ಸಂಶಯಾಸ್ಪದ ಸಂದೇಶ!` / `सावधानी: यह संदिग्ध संदेश है!`
    - 🟢 **SAFE:** `VERIFIED: NO IMMEDIATE RISK DETECTED.` / `ಸುರಕ್ಷಿತ: ಯಾವುದೇ ತಕ್ಷಣದ ಅಪಾಯ ಕಂಡುಬಂದಿಲ್ಲ.` / `सुरक्षित: कोई तात्कालिक खतरा नहीं मिला।`
  - Threat summaries and AI explanations.
  - Actionable Do's and Don'ts.
- **One-Click Instant Switching:** Toggling languages in the navigation bar or explanation card switches the entire interface instantaneously without extra API calls.

### 4. 🔊 Native Voice Assistant (TTS for Elderly Users)
- Integrated browser-native Speech Synthesis (`window.speechSynthesis`) that reads out safety advice aloud in the selected language (`en-IN`, `kn-IN`, `hi-IN`).
- Designed specifically for senior citizens and users with visual or literacy barriers.

### 5. 🛡️ Actionable Protection Guides
- **What You MUST NOT Do:** Prominent crimson warning cards advising users never to click suspicious links, share bank OTPs, or enter UPI PINs.
- **What You SHOULD Do:** Clear verification steps (contact bank via official app, verify independently).
- **Safe URL Inspection:** Displays identified domains as plain text with a **"Click Disabled for Safety"** shield to eliminate accidental clicks, plus a safe copy button.
- **Emergency Helpline (1930):** One-tap dialer for the National Cyber Crime Reporting Portal (1930 toll-free) and a direct link to `cybercrime.gov.in`.

---

## 🏗️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) + Custom Dark Fintech Theme |
| **Typography** | Inter, Noto Sans Devanagari (Hindi), Noto Sans Kannada |
| **Animations** | [Framer Motion 11](https://www.framer.com/motion/) + [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **API Client** | Decoupled REST Service with Mock Fallback (`src/services/api.ts`) |

---

## 📁 Repository Structure

```text
SCAMSHIELD/
├── .env.example              # Sample environment configuration
├── .gitignore                # Ignored paths (node_modules, dist, etc.)
├── index.html                # Entry HTML with Google Fonts & Meta tags
├── package.json              # Project dependencies and scripts
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Custom fintech color palette & animations
├── tsconfig.json             # TypeScript compiler settings
├── vite.config.ts            # Vite bundler configuration & proxy
│
├── backend/                  # FastAPI backend service (managed separately)
│   └── app/
│       ├── api/
│       └── schemas/
│
└── src/
    ├── main.tsx              # Application mount point
    ├── App.tsx               # Root view orchestrator & navigation
    ├── index.css             # Base styles, cyber grid, & scrollbars
    ├── vite-env.d.ts         # Environment type definitions
    │
    ├── components/
    │   ├── Navbar.tsx             # Sticky navigation with mobile drawer & helpline
    │   ├── Hero.tsx               # Hero banner with floating simulation cards
    │   ├── FeatureCards.tsx       # Detect, Explain, Protect, Vernacular cards
    │   ├── Analyzer.tsx           # Analyzer tabbed container
    │   ├── AnalyzerTabs.tsx       # Message / Screenshot / UPI tabs
    │   ├── MessageInput.tsx       # Textarea with 1-click sample demo presets
    │   ├── ScreenshotUpload.tsx   # Drag-and-drop OCR upload with demo generator
    │   ├── UPISimulator.tsx       # Educational UPI collect fraud simulator
    │   ├── AnalysisLoader.tsx     # 5-step intelligent scanning progress bar
    │   ├── ResultsView.tsx        # Comprehensive threat results dashboard
    │   ├── RiskScore.tsx          # Circular animated SVG 0-100 score ring
    │   ├── RiskBadge.tsx          # SAFE / SUSPICIOUS / SCAM badges
    │   ├── RiskFactorCard.tsx     # Individual threat signal cards (+pts)
    │   ├── RiskBreakdown.tsx      # Explainable signal contribution bars
    │   ├── URLAnalysis.tsx        # Non-clickable link inspector with copy action
    │   ├── AIExplanation.tsx      # Instant vernacular 3-language switcher
    │   ├── SafetyActions.tsx      # Do and Do NOT action checklists
    │   ├── SafetySection.tsx      # Universal citizen UPI & banking rules
    │   ├── EmergencyHelpline.tsx  # National Cyber Crime 1930 banner
    │   ├── EmergencyModal.tsx     # Urgent incident response modal
    │   ├── SafetyDisclaimer.tsx   # Legal screening disclaimer
    │   ├── LanguageSelector.tsx   # Global language selector dropdown/pills
    │   └── Footer.tsx             # Brand footer & Hackatopia 2026 attribution
    │
    ├── data/
    │   └── mockResults.ts         # Realistic mock dataset (Scam, Suspicious, Safe, UPI)
    │
    ├── hooks/
    │   └── useAnalysis.ts         # Central analysis hook & state machine
    │
    ├── services/
    │   └── api.ts                 # Dual-mode API client (FastAPI + local heuristic engine)
    │
    ├── translations/
    │   └── uiTranslations.ts      # Vernacular dictionary (EN, KN, HI)
    │
    └── types/
        └── analysis.ts            # Type definitions matching FastAPI schema
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js:** v18+ (tested on v24.21.0)
- **npm:** v9+ (tested on v11.19.0)

### 1. Installation
Clone the repository and install dependencies in the root directory:

```bash
git clone -b Frontend https://github.com/zer0neo/SCAMSHIELD.git
cd SCAMSHIELD
npm install
```

### 2. Environment Configuration
Copy the sample environment file:

```bash
cp .env.example .env
```

Environment options in `.env`:

```env
# Backend FastAPI endpoint URL:
VITE_API_URL=http://localhost:8000

# Set 'true' for standalone hackathon demos / mock data mode,
# or 'false' to route calls directly to the FastAPI service:
VITE_USE_MOCK_API=true
```

### 3. Run Development Server
Start the local Vite development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### 4. Build for Production
To typecheck and build optimized static assets:

```bash
npm run build
```

To preview the production bundle locally:

```bash
npm run preview
```

---

## 🎯 3-Minute Live Hackathon Demo Walkthrough

When presenting to judges, follow this sequence:

1. **The Context (0:00 - 0:45):**
   - Open ScamShield. Point to the headline: *"Don't get scammed. Know before you pay."*
   - Mention the core problem: Elderly and vernacular payment users in India are being targeted by fake KYC SMS and UPI collect requests.
2. **1-Click Live Analysis (0:45 - 1:45):**
   - Click the **"⭐ Target Demo (Fake SBI KYC SMS)"** button in the Analyzer.
   - Click **"Analyze Message"**.
   - Watch the **5-step intelligent scanning progress bar** evaluate urgency, phishing domains, and banking impersonation.
   - **Reveal:** Score `94/100 HIGH RISK` with the bold crimson banner: `CRITICAL WARNING: FRAUD DETECTED! DO NOT PAY!`.
3. **Explainability & Non-Clickable URL (1:45 - 2:15):**
   - Show the **Signal Weight Breakdown**: Explain that ScamShield is not a black-box AI (`+30` fake domain, `+25` urgency, `+20` impersonation).
   - Point to the **Detected Links** section: Show that the phishing link `sbi-kyc-update.xyz` is safely non-clickable to prevent accidental visits.
   - Show **What You MUST NOT Do**: High-visibility danger cards advising against clicking or sharing OTPs.
4. **Vernacular & Accessibility (2:15 - 3:00):**
   - Click **"ಕನ್ನಡ" (Kannada)** or **"हिन्दी" (Hindi)**: The explanation, verdict, and actions change instantly.
   - Click **"🔊 ವಿವರಣೆ ಕೇಳಿ"** to play the voice explanation aloud.
   - Switch to the **"UPI Request"** simulator to show the Golden Rule of UPI: *PIN is never required to receive money*.
   - Point to the **1930 Cyber Crime Helpline** integration.

---

## 🔒 Security & Privacy Principles

- **Zero Sensitive Storage:** ScamShield never logs, stores, or transmits UPI PINs, OTPs, or net-banking passwords.
- **Safe Link Handling:** Identified phishing domains are rendered as non-clickable plain text with warning badges.
- **Untrusted Input Sanitation:** All messages and extracted OCR texts are treated as untrusted strings. Zero `dangerouslySetInnerHTML` usage.
- **Assistive Scope:** ScamShield includes transparent disclaimers encouraging verification via official bank channels.

---

## 👥 Authors & Attribution

Built for **Hackatopia 2026**  
**Problem Statement:** FT-01 — Vernacular Scam and UPI Fraud Message Shield  
**License:** MIT
