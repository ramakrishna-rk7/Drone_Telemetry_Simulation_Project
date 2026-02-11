from flask import Flask, render_template
from flask_socketio import SocketIO
import random
import time
import threading

app = Flask(__name__)
socketio = SocketIO(app)

# starting values
altitude = 100
speed = 10
battery = 100
latitude = 17.3850
longitude = 78.4867
heading = 0
vertical_speed = 0
satellites = 12
signal = 95

def drone_simulation():
    global altitude, speed, battery, latitude, longitude, heading, vertical_speed, satellites, signal

    simulation_duration = 30
    elapsed_time = 0

    while elapsed_time < simulation_duration:
        # Simulate changes
        vs_change = random.uniform(-0.5, 0.5)
        vertical_speed += vs_change
        vertical_speed = max(-5, min(5, vertical_speed)) # Clamp V/S

        altitude += vertical_speed
        speed += random.randint(-1, 2)
        speed = max(0, speed)
        
        battery -= random.uniform(0.05, 0.2)
        battery = max(battery, 0)

        latitude += random.uniform(-0.0001, 0.0001)
        longitude += random.uniform(-0.0001, 0.0001)
        
        heading += random.randint(-5, 5)
        heading = heading % 360
        
        # Random signal fluctuation
        signal = max(0, min(100, signal + random.randint(-2, 2)))
        
        # Random satellite count fluctuation
        if random.random() > 0.95:
            satellites = max(5, min(15, satellites + random.randint(-1, 1)))

        data = {
            "altitude": round(altitude, 2),
            "speed": round(speed, 2),
            "battery": round(battery, 1),
            "lat": round(latitude, 6),
            "lon": round(longitude, 6),
            "heading": int(heading),
            "vertical_speed": round(vertical_speed, 1),
            "satellites": satellites,
            "signal": signal
        }

        socketio.emit("telemetry", data)
        time.sleep(1)
        elapsed_time += 1

    socketio.emit("simulation_end", {"message": "Simulation Complete"})

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    thread = threading.Thread(target=drone_simulation)
    thread.daemon = True
    thread.start()
    socketio.run(app, debug=True)
