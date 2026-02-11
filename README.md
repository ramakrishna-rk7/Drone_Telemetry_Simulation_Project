# 🚁 Real-Time Drone Telemetry Monitoring System

A real-time UAV (drone) telemetry monitoring dashboard built using **Python, Flask, and WebSockets**.
The system simulates a flying drone and streams live flight data to a browser-based Ground Control Station (GCS) interface.

This project demonstrates how real drones, IoT devices, and autonomous vehicles continuously transmit sensor data to a monitoring application.

---

## 📌 Project Overview

This application simulates a drone in flight and sends telemetry data every second to a live web dashboard.

The dashboard behaves like a **drone ground control station**, showing live flight information such as:

* Altitude
* Speed
* Battery level
* GPS position
* Heading direction
* Signal strength
* Satellite count
* Flight path visualization

The UI updates instantly without refreshing the page using WebSocket communication.

---

## 🧠 How It Works

1. Python generates simulated drone flight data
2. Flask server hosts a web dashboard
3. Flask-SocketIO streams real-time telemetry
4. JavaScript receives live data in the browser
5. Dashboard updates instantly with charts and flight path tracking

Architecture:

Drone Simulation (Python) → Flask Server → WebSocket → Browser Dashboard

---

## 🖥️ Dashboard Features

* Live telemetry monitoring
* Real-time altitude graph
* Dynamic battery indicator
* GPS coordinate tracking
* Heading and vertical speed display
* Signal strength & satellite status
* Flight path radar visualization
* Auto-updating UI (no page refresh)

---

## 🛠️ Tech Stack

**Backend**

* Python
* Flask
* Flask-SocketIO
* Eventlet

**Frontend**

* HTML5
* CSS3 (Grid Layout UI)
* JavaScript
* Chart.js

**Concepts Used**

* Real-time data streaming
* WebSocket communication
* Telemetry simulation
* Client-server architecture
* Live data visualization

---

## 📂 Project Structure

```
Drone_Telemetry_Simulation_Project
│
├── server.py
├── templates/
│   └── index.html
├── static/
│   ├── style.css
│   └── script.js
└── README.md
```

---

## ▶️ How to Run Locally

### 1. Clone the repository

```
git clone https://github.com/ramakrishna-rk7/Drone_Telemetry_Simulation_Project.git
cd Drone_Telemetry_Simulation_Project
```

### 2. Install dependencies

```
pip install flask flask-socketio eventlet
```

### 3. Run the server

```
python server.py
```

### 4. Open in browser

```
http://127.0.0.1:5000
```

---

## 📊 What This Project Demonstrates

This project shows practical understanding of:

* Real-time systems
* WebSocket communication
* Backend–frontend integration
* Data visualization
* Simulation of IoT telemetry devices

The same architecture is used in:

* drones/UAV monitoring
* vehicle tracking systems
* industrial IoT sensors
* smart devices monitoring dashboards

---

## 🚀 Future Improvements

* Live map tracking (Leaflet / Google Maps)
* Data logging to CSV/Database
* Multiple drone monitoring
* Cloud deployment (AWS / Render)
* Mobile responsive UI

---

