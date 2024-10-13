# Raspberry Pi IoT System
This project involves the development of a fully functional IoT system based on a Raspberry Pi 4b microcontroller. It utilizes MQTT for communication between the Raspberry Pi and various smart devices, enabling control through a cross-platform mobile application built using React Native with Expo. The backend facilitates seamless communication between the mobile app and the Raspberry Pi through Node.js.

## Key Features:
1) Raspberry Pi as MQTT Broker:
   - Hosts the local MQTT broker for communication with devices on the network.
   - Publishes and receives MQTT messages to and from smart plugs.
2) Smart Plug Control:
   - Smart plugs flashed with Tasmota firmware are integrated into the system.
   - Full control of smart plugs via the mobile app, including turning devices on/off remotely.
3) Cross Platform Mobile Applications:
   - Built using React Native and Expo.
   - Provides an intuitive UI for controlling devices connected to the Raspberry Pi.
   - Requires the mobile device to be connected to the local Wi-Fi network.
4) Backend Communication:
   - Node.js server facilitates communication between the frontend and the Raspberry Pi.
   - Handles HTTP POST requests from the mobile app and publishes specific MQTT messages based on the requests.

## Usage
  - Launch the mobile application on a device connected to the same Wi-Fi network as the Raspberry Pi.
  - Use the app interface to control smart plugs and other IoT devices connected to the Raspberry Pi through MQTT.

## Technologies Used
- **Microcontroller:** Raspberry Pi 4b
- **Communication Protocol:** MQTT with Mosquitto Broker
- **Smart Plugs:** Flashed with Tasmota Firmware
- **Frontend:** React Native (Expo)
- **Backend:** Node.js
- **Programming Languages:** JavaScript, Python

## Future Improvements
  - **Remote Access:** Explore creating a local cloud-based VPN server or enabling port forwarding to control the system remotely.
  - **Cloud-Based MQTT:** Implement a cloud-based MQTT bridge for enhanced system scalability.

## License
This project is currently closed for external contributions and is not available for redistribution. Future updates and improvements are planned.
