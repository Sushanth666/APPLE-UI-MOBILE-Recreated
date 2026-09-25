# Apple Mobile – Official Apple Store iOS Experience

An **Apple Human Interface Guidelines (HIG)**-inspired mobile application built with **React Native** and **Expo**, engineered specifically for tactile mobile ergonomics and native Apple Store app fidelity.

---

## 📖 Project Overview

**Apple Mobile** recreates the official **Apple Store iOS app** experience on mobile devices (iOS / Android) and desktop web browsers. It incorporates native iOS navigation patterns: a bottom tab bar with dynamic bag badges, dedicated screens for product discovery, lineup shopping, side-by-side spec comparison, and an interactive shopping bag with Apple Pay checkout.

---

## ✨ Key Native App Features

### 1. iOS Bottom Tab Bar (`BottomTabBar.js`)
- **4 Dedicated App Tabs**:
  - 🌟 **Discover**: Editorial feed featuring flagship device reveals, Dynamic Island demo, Trade-In estimator, Guided Tour, and services.
  - 📱 **iPhone**: Full shopping lineup with sub-segmented control (All iPhones / MagSafe Accessories), live finish selectors, and instant "Add to Bag".
  - ⚖️ **Compare**: Interactive dual-device comparison matrix (specs, camera, battery, biometrics).
  - 🛍️ **Bag**: Full shopping cart screen with live quantity counters and Apple Pay checkout.
- **Dynamic Badge Counter**: Live red badge displays the current item count on the Bag tab with native spring feedback.
- **Translucent Frosted Surface**: Styled with iOS safe-area insets and subtle boundary shadows.

### 2. Dedicated Apple Store Bag & Checkout Screen (`BagScreen.js`)
- **Item Management**: Product thumbnail, finish dot, storage badge, and real-time total calculation.
- **Quantity Stepper**: Tactile `−` and `+` buttons to adjust item count, plus quick "Remove" link.
- **Real-Time Trade-In Deduction**: Automatically applies device trade-in credit directly against the bag subtotal.
- **Order Summary**: Subtotal, Estimated Trade-In credit, Free Delivery badge, Tax, and Total Due.
- **Apple Pay Checkout**: Native-style black Apple Pay button with vector SVG Apple logo, plus alternative credit card checkout option.
- **Empty State**: Minimalist Apple Store empty state with custom bag illustration and a 1-tap "Shop iPhone" button.

### 3. Cupertino Header (`MobileHeader.js`)
- **Crisp Vector SVG Icons**: Resolution-independent vector paths (`MoonIcon`, `SunIcon`, `SearchIcon`, `BagIcon`).
- **Theme Toggle**: 180° rotation and scale morph animation switching between Apple Dark Mode and Light Mode.
- **Direct Bag Shortcut**: Tapping the top bag icon instantly opens the Bag tab.

### 4. Interactive Trade-In Calculator (`TradeInCalculator.js`)
- **Swipeable Device Chips**: Select your current iPhone (iPhone 11 through iPhone 13 Pro Max) with fluid mouse drag and touch swiping.
- **Live Savings Feedback**: Instantly discounts all models in real-time across the app.

### 5. Interactive Dynamic Island Widget (`DynamicIslandPreview.js`)
- **Live State Switcher**: Switch between **Music** (with animated audio spectrum bars), **Incoming Call**, and **Timer**.
- **Fluid Spring Morphing**: Dimensions and content smoothly interpolate using React Native `Animated.spring`.

### 6. Side-by-Side Dual Phone Comparison (`CompareView.js`)
- Dual-dropdown model selectors allowing users to compare any two iPhones side-by-side on mobile screens.
- Smooth image crossfades when changing models.
- Complete spec matrix: Display, Dynamic Island / Notch, Processor, Camera, Battery playback, Safety, and Biometrics.

### 7. Product Showcase Cards (`ProductHeroCard.js`)
- Flagship cards for iPhone 14 Pro, iPhone 14, iPhone 13, and iPhone SE.
- Interactive color swatches with instant phone finish crossfade and subtle zoom (`scale: 0.96 → 1.0`).
- Direct "Buy" button that adds items into the Bag state with confirmation toast.

### 8. Dark & Light Theme System (`theme.js`)
- Authentic Apple color palettes:
  - **Dark Mode**: Deep `#000000` / `#1c1c1e` backgrounds with `#f5f5f7` text and `#2c2c2e` borders.
  - **Light Mode**: Clean `#f5f5f7` / `#ffffff` surfaces with `#1d1d1f` typography.

---

## 🛠️ Tech Stack & Architecture

- **Core**: React Native 0.86, Expo 57, React Native Web
- **Icons & Graphics**: `react-native-svg` (crisp resolution-independent vector paths)
- **State Management**: React Hooks (`useState`, `useEffect`, `useRef`, `useMemo`)
- **Animations**: React Native `Animated` API with native-driven springs and timing curves
- **Project Structure**:
  ```text
  apple-mobile/
  ├── src/
  │   ├── components/
  │   │   ├── BottomTabBar.js         # Native iOS 4-tab bottom navigation bar
  │   │   ├── BagScreen.js            # Full shopping bag & Apple Pay checkout screen
  │   │   ├── MobileHeader.js         # Header, theme toggle, search, bag button
  │   │   ├── SegmentedControl.js     # Cupertino 2/4-tab segmented control
  │   │   ├── ProductHeroCard.js      # Hero device card with color swatches & Buy action
  │   │   ├── DynamicIslandPreview.js # Interactive Dynamic Island widget
  │   │   ├── TradeInCalculator.js    # Interactive trade-in estimator
  │   │   ├── CompareView.js          # Dual phone spec comparison
  │   │   ├── AccessoriesView.js      # MagSafe accessories showcase
  │   │   ├── GuidedTourCard.js       # Video tour banner
  │   │   ├── WhyAppleBento.js        # Why Apple benefits bento grid
  │   │   ├── MagSafeShowcaseMobile.js# MagSafe highlights card
  │   │   ├── ValuePropsMobile.js     # Delivery, pickup, specialist value props
  │   │   └── ServicesShowcaseMobile.js # Apple Services bundle card
  │   ├── theme.js                    # Dark/light color tokens
  │   └── productData.js              # Specs, pricing, and finish definitions
  ├── App.js                          # Main container & tab router
  ├── app.json                        # Expo configuration
  └── package.json
  ```

---

## 🚀 Running Locally

### Prerequisites
- Node.js (v18+)
- npm

### Launching the Application
```bash
npm install
npm start
```

### Modes of Execution
- **Desktop Web**: Press `w` in the terminal to open in your browser ([http://localhost:8081](http://localhost:8081)).
- **Mobile Device (iOS / Android)**:
  1. Install the **Expo Go** app from the App Store or Google Play.
  2. Scan the terminal QR code with your phone camera (iOS) or the Expo Go scanner (Android).
