export interface FirmwareFile {
  name: string;
  language: string;
  path: string;
  githubUrl: string;
  description: string;
  content: string;
}

export const INO_FIRMWARE: FirmwareFile = {
  name: 'HUMID1_OS.ino',
  language: 'cpp',
  path: 'Source_Code/arduino/HUMID1_OS/HUMID1_OS.ino',
  githubUrl: 'https://github.com/Humiditron/HUMID1_OS/blob/main/Source_Code/arduino/HUMID1_OS/HUMID1_OS.ino',
  description: 'Production Arduino sketch for ESP32-S3-ePaper-1.54',
  content: `/*
 * HUMID1-OS :: Ultra-Low-Power IoT Humidor Hydrometer Firmware
 * Target: Waveshare ESP32-S3-ePaper-1.54 (Off-the-shelf kit)
 * SoC: ESP32-S3-PICO-1-N8R8 | Sensor: Sensirion SHTC3 (I2C) | Display: 1.54" e-Paper
 * Cloud: ThingsBoard IoT Telemetry & Attributes
 * Repository: https://github.com/Humiditron/HUMID1_OS
 * License: MIT (C) 2026 Humiditron
 */

void setup() {
  // put your setup code here, to run once:

}

void loop() {
  // put your main code here, to run repeatedly:

}

`
};

export const HARDWARE_SPECS = [
  {
    category: 'Hardware Platform',
    name: 'ESP32-S3-ePaper-1.54',
    detail: 'Off-the-shelf integrated development kit with built-in e-Paper display and battery management'
  },
  {
    category: 'Microcontroller / SoC',
    name: 'ESP32-S3-PICO-1-N8R8',
    detail: 'Dual-core 32-bit Xtensa LX7 @ 240 MHz, hardware crypto engine'
  },
  {
    category: 'Memory & Flash',
    name: '8MB Flash / 8MB PSRAM',
    detail: 'Custom partition scheme for dual OTA application slots and NVS persistence'
  },
  {
    category: 'Hydrometer Sensor',
    name: 'Sensirion SHTC3',
    detail: 'Factory-calibrated I2C digital humidity (±2% RH) & temperature sensor'
  },
  {
    category: 'Display Screen',
    name: '1.54" E-Paper Display',
    detail: 'No-touch, high-contrast static display with zero power consumption between wake refreshes'
  },
  {
    category: 'Power Subsystem',
    name: '400mAh LiPo Battery',
    detail: 'USB-C charging (~44 min charge time); aggressive deep-sleep current gating'
  },
  {
    category: 'Audio Subsystem',
    name: 'MicroSD Audio Catalog',
    detail: 'Optional voice/chime alert catalog on SD storage with --NOAUDIOSUPPORT build flag'
  },
  {
    category: 'User Interaction',
    name: 'Single Tactile Button',
    detail: 'Short press manual wake, 3-second hold for BLE provisioning, factory reset wipe'
  }
];
