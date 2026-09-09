# HUMID1_OS Landing Page & Operating Stack

`HUMID1_OS` is an ultra-low-power, cloud-integrated operating stack engineered for precision tobacco and cigar humidor climate monitoring. Powered by the off-the-shelf **ESP32-S3-ePaper-1.54** development kit, this system provides real-time ambient telemetry with minimal power consumption.

[![Donate to Humid1](https://custom-icon-badges.demolab.com/badge/Donate-Humid1.com-4A154B?style=plastic&logo=signupgenius&logoColor=white)](https://tools.signupgenius.com/c/support-humid1-project)  

### 🎞️ [Screen Captures (Beta Preview)](/SNAPSHOTS.md)

## 🌌 Platform Overview

This landing page serves as the global hub for the `HUMID1_OS` maker platform ecosystem operated by **Humidyne-Labs**. It hosts the client-side system documentation, live firmware code synchronization, and acts as the secure portal for device orchestration.

### 🔌 Network Services Directory
*   **Production Dashboard:** [dash.humid1.com](https://dash.humid1.com)
*   **SSO & Device Enrollment:** [auth.humid1.com](https://auth.humid1.com/if/flow/default-enrollment-flow/)
*   **Maker Support Community:** [chat.humid1.com](https://chat.humid1.com)
*   **Firmware Repository:** [github.com/Humidyne-Labs/humid1-os](https://github.com/Humidyne-Labs/humid1-os)

---

## 🛠️ Hardware Specifications

The target operating hardware relies entirely on high-efficiency, off-the-shelf development boards:

| Subsystem | Specification | Description |
| :--- | :--- | :--- |
| **SoC / MCU** | ESP32-S3-PICO-1-N8R8 | Dual-core 32-bit Xtensa LX7 @ 240 MHz with built-in Wi-Fi & BLE. |
| **Sensor** | Sensirion SHTC3 | Factory-calibrated high-precision digital humidity (±2% RH) and temperature sensor. |
| **Display** | 1.54" E-Paper Display | Zero-power consumption between wake cycles with crisp high-contrast readability. |
| **Power** | 400mAh LiPo Subsystem | USB-C charging with hardware battery management and deep-sleep gating. |

---

## 🔄 Zero-Touch Operational Loop

1.  **BLE Provisioning:** Hold down the boot tactile button for 3 seconds to trigger active BLE advertising. Claim the device securely inside your ThingsBoard account using the hardware token or randomly generated pin.
2.  **Sensirion Reading & e-Paper Refresh:** Wakes at configured duty cycles, powers up the I2C SHTC3 sensor rail, computes climate calculations, and flushes a complete e-paper display refresh.
3.  **Telemetry Stream:** Authenticates securely over MQTT, transmits payload streams to the dashboard, updates remote duty settings, and triggers ultra-low-power deep sleep.

---

## 💻 Local Development

Get the landing page dashboard running locally in your environment:

### Prerequisites
Make sure you have Node.js (v18+) installed.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Dev Server
Runs Vite dev mode bound on `localhost:3000`:
```bash
npm run dev
```

### 3. Build & Lint Checks
```bash
# Compile and output optimized static files to /dist
npm run build

# Run TypeScript type verification
npm run lint
```

---

## 🐋 Containerized Production Deploy

The landing page has been fully dockerized for seamless integration inside containerized environments (such as Kubernetes or Docker Compose server stacks).

### 1. Build the Docker Image
```bash
docker build -t humid1-landing-page .
```

### 2. Run the Container
Expose the server on port `8080` (mapped to internal Nginx container port `80`):
```bash
docker run -d -p 8080:80 --name humid1-website humid1-landing-page
```

### 3. Multi-container Compose integration
```yaml
version: '3.8'
services:
  landing-page:
    image: humid1-landing-page
    build: .
    ports:
      - "80:80"
    restart: always
```

---

## 🤖 GitHub Actions CI/CD Pipeline

A production-grade CI/CD pipeline is configured in `.github/workflows/build-dist.yml` which automates:
*   Static asset building and type-safety verification.
*   Automated packaging into a distributable release ZIP (`dist.zip`).
*   Automated creation of GitHub Releases when tags matching `v*` are pushed.
*   Building and publishing multi-platform Docker images directly to **GitHub Container Registry (GHCR)** at `ghcr.io/Humidyne-Labs/landingpage`.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## 👥 Contributors

[![none](https://wsrv.nl/?url=github.com/Humiditron.png&w=32&h=32&fit=cover&mask=circle&filt=greyscale "@Humiditron")](https://github.com/Humiditron/)
[![none](https://wsrv.nl/?url=github.com/google-gemini.png&w=32&h=32&fit=cover&mask=circle&filt=greyscale "@google-gemini")](https://github.com/google-gemini/)

© 2026 **Humidyne-Labs**
