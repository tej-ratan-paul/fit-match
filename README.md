# 🏋️ Fitmatch

A cross-platform mobile application built with **React Native** and **Expo** that helps users find workout partners, schedule fitness sessions, and connect with nearby gym-goers.

---


## 🚀 Features

- 🔐 User authentication
- 📍 Location-based partner discovery
- 🗺️ Interactive map to find nearby users
- 📅 Calendar-based session scheduling
- 🔔 Push notifications for match alerts
- 🧭 Stack & tab-based navigation

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React Native](https://reactnative.dev/) `0.83.2` |
| Platform | [Expo](https://expo.dev/) `~55.0.5` |
| Language | TypeScript |
| Navigation | React Navigation (Stack + Bottom Tabs) |
| Maps | `react-native-maps` |
| Calendar | `react-native-calendars` |
| Location | `expo-location` |
| Notifications | `expo-notifications` |
| Storage | `@react-native-async-storage/async-storage` |
| Gestures | `react-native-gesture-handler` |

---

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) >= 20.x
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/go) app on your device (for testing), or an Android/iOS emulator

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/your-username/fitmatch.git
cd fitmatch

# Install dependencies
npm install

# Start the development server
npm start
```

---

## ▶️ Running the App

```bash
# Start Expo dev server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web
```

---

## 📁 Project Structure

```
fitmatch/
├── App.tsx                  # Root component
├── index.ts                 # Entry point
├── app.json                 # Expo config
├── tsconfig.json            # TypeScript config
└── src/
    ├── context/
    │   └── AuthContext.tsx  # Authentication context
    └── navigation/
        └── AppNavigator.tsx # Navigation setup
```

---

## 🔧 Environment Variables

Create a `.env.local` file in the root directory if needed:

```env
# Add any required API keys here
```

> ⚠️ Never commit `.env*.local` files — they are already gitignored.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is private. All rights reserved.

---

## 👤 Author

Kagitha Tej Ratan Paul
