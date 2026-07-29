# 🎓 CampusMesh

CampusMesh is an AI-powered campus safety and emergency communication platform designed to help students, faculty, and university staff stay connected during emergencies. The application combines emergency alerts, AI assistance, offline-aware navigation, and campus communication into one easy-to-use platform.

---

### 📶 Bluetooth Communication — Current Implementation vs. Long-Term Vision

CampusMesh includes a **working Bluetooth Direct Connect feature** built on the [Web Bluetooth API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API), which lets the app scan for, connect to, and exchange messages with a real nearby BLE peripheral device — no internet connection required for that link.

It's important to be transparent about what this does and doesn't do today, since "Bluetooth mesh" means something specific:

**✅ What's actually implemented and working:**
- Real BLE device discovery via the browser's native device picker
- Real GATT connection to a compatible peripheral (using the Nordic UART Service, a common BLE messaging standard)
- Real bidirectional message send/receive over that connection
- A clearly-labeled Simulated Peer mode for previewing the messaging UI without needing physical hardware

**⚠️ Known limitations (platform-level, not implementation bugs):**
- **Phone-to-phone connection is not possible through a web browser.** Web Bluetooth only allows a page to act as a *client* — it can connect to a peripheral device, but it can never *become* discoverable to another browser tab. Two phones both running CampusMesh in Chrome cannot Bluetooth-connect to each other directly; one side of any real connection must be dedicated BLE hardware (e.g. an ESP32 running compatible firmware — see `/hardware`).
- **No support in Safari or Firefox, and no support on iOS at all.** Web Bluetooth is Chrome/Edge/Opera only, on Android and Desktop.
- **This is a direct one-to-one link, not a multi-hop mesh.** True mesh relay (a message hopping from device A → B → C to reach someone out of A's radio range) is not implemented.

**🔭 What true campus-wide mesh would actually require:**
A genuine offline, multi-hop, campus-wide mesh — the kind that could route around outages the way this README originally described — is a hardware project, not a browser feature. The realistic path is dedicated LoRa-based mesh nodes (in the style of the open-source [Meshtastic](https://meshtastic.org/) project), where each active user carries a small ESP32 + LoRa radio node that talks to nearby nodes over long-range radio, with the phone connecting to its own node over Bluetooth as a gateway. This is tracked as a future hardware initiative — see **Future Improvements** below — and is intentionally out of scope for the current software-only build.

---

## 🚀 Live Demo

**Live Application:**
[campus-mesh-roan.vercel.app](https://campus-mesh-roan.vercel.app/)

**GitHub Repository:**
[github.com/alishbash537-bot/CampusMesh](https://github.com/alishbash537-bot/CampusMesh)

---

# 📖 Problem Statement

During emergencies such as fires, medical incidents, network outages, or campus lockdowns, students often struggle to obtain accurate information quickly.

CampusMesh addresses this problem by providing:

* AI-powered emergency assistance
* Emergency broadcasts
* Campus communication
* Campus navigation support
* Quick access to safety information
* Experimental direct Bluetooth device messaging (see Bluetooth section above for scope)

The goal is to improve communication and emergency preparedness within a university campus.

---

# ✨ Features

* 🏠 Modern campus dashboard
* 🤖 AI Emergency Assistant powered by Google Gemini
* 💬 Campus messaging interface
* 🚨 Emergency broadcast system
* 🗺️ Campus map
* 📶 Bluetooth Direct Connect (Web Bluetooth, single-device link — see limitations above)
* 👤 Student profile page
* 🔐 Login and registration pages
* 📱 Responsive mobile-friendly interface
* 🔥 Firebase integration
* ☁️ Live deployment on Vercel

---

# 🤖 AI Feature

CampusMesh includes an AI assistant built using Google's Gemini API.

The assistant helps users by answering emergency-related questions such as:

* Basic first aid
* CPR guidance
* Emergency procedures
* Campus safety information
* Emergency preparedness advice

The AI maintains conversation history and provides concise, easy-to-read responses optimized for mobile devices.

---

# 🧠 System Prompt

The Gemini AI is instructed using the following system prompt:

> You are CampusMesh AI, an intelligent emergency and campus support assistant. You provide concise, reliable first-aid guidance, campus navigation tips, emergency response protocols, and safety information. Keep responses calm, direct, and easy to read on mobile devices.

---

# 🛠 Technologies Used

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Web Bluetooth API

## Backend

* Express.js
* Node.js

## AI

* Google Gemini API
* @google/genai

## Database & Authentication

* Firebase
* Firebase Authentication
* Firestore Database

## Deployment

* Vercel
* GitHub

---

# 📸 Screenshots

## Home Screen

![Home](assets/home.png)

---

## AI Chat

![Chat](assets/chat.png)

---

## Emergency Broadcast

![Emergency](assets/emergency.png)

---

# 📦 Installation

## Clone the repository

```bash
git clone https://github.com/alishbash537-bot/CampusMesh.git
```

## Install dependencies

```bash
npm install
```

## Create environment variables

Create a `.env.local` file in the project root.

Example:

```env
GEMINI_API_KEY=your_gemini_api_key

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**Do not commit your API keys or secrets to GitHub.**

---

# ▶️ Run Locally

Start the development server:

```bash
npm run dev
```

Open:http://localhost:3000


---

# 📂 Project Structure

CampusMesh
│
├── assets
├── hardware
│ └── esp32-nus-firmware.ino
├── src
│ ├── components
│ ├── services
│ │ └── bluetoothService.ts
│ ├── views
│ ├── firebase.ts
│ └── App.tsx
│
├── server.ts
├── package.json
└── README.md


---

# 🔒 Security

* Sensitive credentials are stored using environment variables.
* API keys are excluded from version control.
* Firebase is used for authentication and secure data storage.

---

# 🌟 Future Improvements

* Real-time campus notifications
* GPS-based emergency routing
* Voice interaction with AI assistant
* Push notifications
* Multi-language support
* **Native mobile app (Capacitor)** to unlock phone-to-phone Bluetooth via Android's Nearby Connections API, closing the gap that Web Bluetooth can't
* **Dedicated hardware mesh layer** using LoRa radio nodes (Meshtastic-style architecture) for genuine long-range, multi-hop, off-grid campus messaging

---

# 👩‍💻 Developer

**Alishba Shahzadi**

Developed as part of an AI application project demonstrating the integration of modern web technologies, cloud services, Firebase, and Google Gemini AI to improve campus safety and communication.

---

# 📄 License

This project was developed for educational purposes.