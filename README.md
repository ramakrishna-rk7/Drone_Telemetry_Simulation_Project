
# 🚁 Drone Telemetry Simulation Project

This project consists of **two independent versions** of a Drone Telemetry System:

* 🐍 **Version 1: Python Console Program**
* 🌐 **Version 2: Web Interface Dashboard**

Both versions simulate drone flight data such as altitude, speed, battery level, and GPS coordinates for 30 seconds.

---

# 🐍 Version 1: Python Program (Console-Based Simulation)

## 📌 Description

This version is a Python-based telemetry simulation that runs in the terminal.
It generates real-time drone flight data and displays it in a structured format every second.

---

## ⚙️ How It Works

1. The program initializes starting values:

   * Altitude = 100 meters
   * Speed = 10 m/s
   * Battery = 100%
   * Latitude = 17.3850
   * Longitude = 78.4867

2. A loop runs for **30 seconds**.

3. Every second:

   * Altitude changes randomly
   * Speed changes randomly
   * Battery decreases gradually
   * GPS coordinates shift slightly
   * Data is printed to the console
   * The program waits 1 second (`time.sleep(1)`)

4. After 30 seconds, the simulation stops.

---

## 🛠 Technologies Used

* Python 3
* Built-in Libraries:

  * `random`
  * `time`

No external libraries required.

---

## ▶️ How to Run

Save the file as:

```
drone_simulation.py
```

Run using:

```bash
python drone_simulation.py
```

---

## 📊 Sample Output

```
Time: 10 sec
Altitude: 112.00 meters
Speed: 13.00 m/s
Battery: 90.25%
GPS: 17.38542 N, 78.48691 E
```

---

## ✨ Features

* Real-time simulation (1-second updates)
* Randomized drone behavior
* Battery drain modeling
* GPS movement simulation
* Safe battery limit handling

---

# 🌐 Version 2: Web Interface (Drone Telemetry Dashboard)

## 📌 Description

This version is a **modern web-based dashboard** that visually displays drone telemetry data using charts and animated UI components.

It simulates telemetry data updates every second for 30 seconds.

---

## 🎨 Features

* 📊 Dual-axis real-time chart (Chart.js)

  * Blue solid line → Altitude
  * Red dashed line → Speed
* 🔋 Animated battery indicator
* 📍 Live GPS coordinate display
* 🎨 Professional dark-themed UI
* 📱 Responsive layout
* ⏱ Automatic stop after 30 seconds

---

## 🛠 Technologies Used

* HTML5
* CSS3 (Modern UI styling)
* JavaScript (Simulation logic)
* Chart.js (Data visualization)

No backend required.

---

## ▶️ How to Run

1. Save the file as:

```
index.html
```

2. Open it in any modern browser:

```
Double-click index.html
```

The simulation will start automatically.

---

# 📂 Project Structure

```
drone-telemetry-project/
│
├── drone_simulation.py    # Version 1 – Python console simulation
├── index.html             # Version 2 – Web dashboard interface
└── README.md
```

---

# 🎯 Learning Outcomes

This project demonstrates:

* Real-time data simulation
* Telemetry system modeling
* Random data generation
* Console-based monitoring
* Web-based data visualization
* Frontend dashboard design
* Chart integration using Chart.js

---

# 🚀 Future Improvements

* Connect Python backend to Web UI using WebSocket
* Store telemetry data in CSV or database
* Add emergency alerts
* Integrate live GPS map
* Deploy dashboard online
* Connect to real drone hardware

