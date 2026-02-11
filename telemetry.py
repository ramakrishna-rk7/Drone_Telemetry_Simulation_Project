import random
import time

# Starting values
altitude = 100        # meters
speed = 10            # m/s
battery = 100         # percentage
latitude = 17.3850
longitude = 78.4867

print("DRONE TELEMETRY SIMULATION STARTED\n")

for second in range(1, 31):

    # Simulate altitude change
    altitude += random.randint(-2, 5)

    # Simulate speed change
    speed += random.randint(-1, 2)

    # Battery drain
    battery -= random.uniform(0.5, 1.5)
    if battery < 0:
        battery = 0

    # Simulate GPS movement
    latitude += random.uniform(-0.0005, 0.0005)
    longitude += random.uniform(-0.0005, 0.0005)

    print(f"Time: {second} sec")
    print(f"Altitude: {altitude:.2f} meters")
    print(f"Speed: {speed:.2f} m/s")
    print(f"Battery: {battery:.2f}%")
    print(f"GPS: {latitude:.5f} N, {longitude:.5f} E")
    print("----------------------------")

    time.sleep(1)

print("\nSimulation Completed")
