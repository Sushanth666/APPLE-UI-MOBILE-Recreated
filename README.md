#  Apple Mobile — Apple — iPhone Hub

> **Brief Project Summary**:  
> `apple-mobile` is an authentic **Apple Human Interface Guidelines (HIG)**-inspired mobile application built with **React Native** and **Expo**. It recreates the tactile ergonomics, navigation flow, and visual polish of the native **Apple Store iOS App** on iOS, Android, and mobile web browsers—complete with a bottom tab bar, interactive shopping bag, and Apple Pay checkout.

---

## 📌 About This Project

While `apple-web` recreates the desktop marketing website, `apple-mobile` specifically replicates the **native mobile app experience**:

* **What it does**: Provides a mobile-first shopping and product exploration experience with 4 dedicated tabs: **Discover** (editorial feed & highlights), **iPhone** (complete lineup & MagSafe shopping), **Compare** (side-by-side phone comparison), and **Bag** (interactive cart with Apple Pay checkout).
* **Native Ergonomics**: Engineered with safe-area insets, tactile touch response, swipeable carousels, segmented controls, and spring-driven micro-interactions.
* **Universal Deployment**: Runs natively on iOS and Android devices via **Expo Go** as well as on desktop and mobile web as a progressive web app (PWA) with the title **`Apple — iPhone Hub`**.
* **Theme Support**: Features Apple Store Light Mode by default, with an instant toggle for authentic Apple OLED Dark Mode.

---

## ✨ Key Native App Features

1. **iOS Bottom Tab Bar (`BottomTabBar.js`)**:
   * 4 dedicated Cupertino tabs:
     * 🌟 **Discover**: Editorial highlights, hero devices, trade-in calculator, and Apple Services.
     * 📱 **iPhone**: Full device lineup with segmented sub-tabs for iPhones and MagSafe accessories.
     * ⚖️ **Compare**: Side-by-side comparative matrix.
     * 🛍️ **Bag**: Live cart screen with persistent badge counter.
   * Dynamic red badge counter with spring bounce animation when items are added.
   * Translucent frosted glass effect styled for mobile viewports.

2. **Apple Store Bag & Apple Pay Checkout (`BagScreen.js`)**:
   * Interactive cart with product thumbnails, finish details, and real-time total updates.
   * Tactile `−` and `+` steppers to modify quantities or remove items.
   * Real-time trade-in deduction automatically applied to cart subtotals.
   * Native-styled **Apple Pay** button with vector Apple logo, plus credit card fallback.
   * Minimalist empty-state view with 1-tap "Shop iPhone" button.

3. **Cupertino Navigation Header (`MobileHeader.js`)**:
   * Crisp vector SVG icons (`MoonIcon`, `SunIcon`, `SearchIcon`, `BagIcon`).
   * One-tap Dark / Light mode toggle with smooth icon morph animation.
   * Quick-access shopping bag button.

4. **Interactive Trade-In Estimator (`TradeInCalculator.js`)**:
   * Swipeable device chips (iPhone 11 through iPhone 13 Pro Max) with fluid touch and drag interactions.
   * Live savings feedback dynamically updates product prices throughout the app.

5. **Interactive Dynamic Island Simulator (`DynamicIslandPreview.js`)**:
   * Interactive widget demonstrating **Now Playing Music** (with animated spectrum bars), **Incoming Call**, and **Timer** states.
   * Spring physics animation driven by React Native's `Animated` API.

6. **Dual-Phone Side-by-Side Comparison (`CompareView.js`)**:
   * Two independent model dropdowns allowing users to compare any two iPhones side-by-side on mobile screens.
   * Complete spec breakdown: Display, Dynamic Island / Notch, Processor, Camera, Battery playback, Safety, and Biometrics.

7. **Product Showcase & Lineup (`ProductHeroCard.js` & `SegmentedControl.js`)**:
   * Interactive finish color swatches with instant phone crossfades.
   * Direct "Buy" action with immediate bag updates and visual confirmation.

---

## 📂 Folder Structure

```text
apple-mobile/
├── assets/                     # App icons, favicons, adaptive Android icons, splash
├── public/                     # Web public directory with index.html & favicons
├── src/
│   ├── components/             # Native mobile UI components
│   │   ├── BottomTabBar.js     # Cupertino 4-tab bottom navigation with badge
│   │   ├── BagScreen.js        # Full cart management & Apple Pay checkout
│   │   ├── MobileHeader.js     # Top bar with vector icons & theme toggle
│   │   ├── SegmentedControl.js # Cupertino multi-segment control switch
│   │   ├── ProductHeroCard.js  # Product card with color dots & Buy action
│   │   ├── DynamicIslandPreview.js # Interactive Dynamic Island morphing widget
│   │   ├── TradeInCalculator.js# Swipeable trade-in estimator with price discounts
│   │   ├── CompareView.js      # Mobile dual-phone side-by-side comparison
│   │   ├── AccessoriesView.js  # MagSafe accessories catalog
│   │   ├── GuidedTourCard.js   # Video tour banner card
│   │   ├── WhyAppleBento.js    # Value propositions bento grid
│   │   ├── MagSafeShowcaseMobile.js # MagSafe highlights card
│   │   ├── ValuePropsMobile.js # Free delivery, pickup, & support propositions
│   │   └── ServicesShowcaseMobile.js# Apple One services showcase
│   ├── theme.js                # Apple Dark & Light mode color definitions
│   └── productData.js          # Device specifications, finishes, and pricing
├── App.js                      # Root component, tab state, and title management
├── app.json                    # Expo configuration (App name: Apple — iPhone Hub)
└── package.json                # React Native & Expo dependencies
```

---

## 🛠️ Tech Stack

* **Framework**: React Native 0.86 with Expo 57
* **Web Runtime**: React Native Web 0.21
* **Vector Graphics**: `react-native-svg` (sharp, resolution-independent vector icons)
* **Safe Area Handling**: `react-native-safe-area-context`
* **Animations**: React Native native-driven `Animated` timing and spring engines

---

## 🚀 Getting Started

### 1. Installation
```bash
cd apple-mobile
npm install
```

### 2. Launch Development Server
```bash
npm start
```

### 3. Choose Your Platform:
* **Web Browser**: Press `w` in the terminal to view in your browser ([http://localhost:8081](http://localhost:8081)).
* **Physical iOS / Android Device**:
  1. Download **Expo Go** from the iOS App Store or Google Play Store.
  2. Scan the QR code displayed in your terminal using your phone camera (iOS) or the Expo Go app (Android).

---

## 🌐 Deployment
This project is continuously deployed to **Vercel** via GitHub:  
[https://github.com/Sushanth666/APPLE-UI-MOBILE-Recreated](https://github.com/Sushanth666/APPLE-UI-MOBILE-Recreated)
