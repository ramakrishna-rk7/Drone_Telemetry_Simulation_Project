const socket = io();

// --- 1. Initialization ---

// Data buffers
const MAX_POINTS = 50;
let altitudeData = Array(MAX_POINTS).fill(null);
let labels = Array(MAX_POINTS).fill('');

// Mission Timer
let secondsElapsed = 0;
const missionTimeEl = document.getElementById('missionTime');
let timerInterval = null;

function startTimer() {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
        secondsElapsed++;
        const m = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
        const s = (secondsElapsed % 60).toString().padStart(2, '0');
        missionTimeEl.innerText = `${m}:${s}`;
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// Start immediately
startTimer();


// --- 2. Visualizations ---

// A) Altitude Sparkline Chart
const altCtx = document.getElementById('altitudeChart').getContext('2d');
const altitudeChart = new Chart(altCtx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            data: altitudeData,
            borderColor: '#06b6d4', // cyan
            borderWidth: 2,
            pointRadius: 0,
            fill: true,
            backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 100);
                gradient.addColorStop(0, 'rgba(6, 182, 212, 0.3)');
                gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
                return gradient;
            },
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
            x: { display: false },
            y: { display: false, min: 0 } // Adjust min/max dynamically if needed
        },
        animation: false
    }
});

// B) Speed Gauge (Doughnut)
const speedCtx = document.getElementById('speedGauge').getContext('2d');
const speedGauge = new Chart(speedCtx, {
    type: 'doughnut',
    data: {
        labels: ['Speed', 'Remaining'],
        datasets: [{
            data: [0, 100],
            backgroundColor: ['#ef4444', '#1e293b'], // Red for speed, dark for bg
            borderWidth: 0,
            cutout: '85%',
            circumference: 180,
            rotation: 270,
            borderRadius: 10
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        animation: { animateRotate: false, animateScale: false }
    }
});

// C) Flight Map (Leaflet)
// Initialize map centered on default coordinates
const map = L.map('flightMap', {
    zoomControl: false,
    attributionControl: false
}).setView([17.3850, 78.4867], 16);

// Dark/Satellite Tile Layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 20
}).addTo(map);

// Drone Icon
const droneIcon = L.divIcon({
    className: 'drone-marker',
    html: '<i class="fa-solid fa-location-crosshairs" style="color:#06b6d4; font-size: 20px;"></i>',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

const marker = L.marker([17.3850, 78.4867], { icon: droneIcon }).addTo(map);
const flightPath = L.polyline([], { color: '#06b6d4', weight: 2 }).addTo(map);


socket.on("simulation_end", function(data) {
    stopTimer();
    alert(data.message); // Or update UI status to "Finished"
    document.querySelector('.status-indicator').innerHTML = '<span class="dot" style="background:gray; box-shadow:none;"></span> Completed';
});

socket.on("telemetry", function(data) {
    
    // 1. Update Text Values
    document.getElementById("altitudeValue").innerText = data.altitude.toFixed(1);
    document.getElementById("speedValue").innerText = data.speed.toFixed(1);
    document.getElementById("batteryValue").innerText = data.battery.toFixed(0);
    
    document.getElementById("latValue").innerText = data.lat.toFixed(6);
    document.getElementById("lonValue").innerText = data.lon.toFixed(6);
    
    document.getElementById("vsValue").innerText = (data.vertical_speed > 0 ? '+' : '') + data.vertical_speed.toFixed(1);
    document.getElementById("headingValue").innerText = data.heading;
    document.getElementById("signalValue").innerText = data.signal;
    document.getElementById("satValue").innerText = data.satellites;

    // 2. Update Battery Bar
    const batBar = document.getElementById("batteryBar");
    batBar.style.width = `${data.battery}%`;
    
    // Color logic
    if (data.battery > 50) batBar.style.backgroundColor = '#10b981'; // Green
    else if (data.battery > 20) batBar.style.backgroundColor = '#f59e0b'; // Yellow
    else batBar.style.backgroundColor = '#ef4444'; // Red

    // 3. Update Altitude Chart
    altitudeData.push(data.altitude);
    altitudeData.shift(); // Remove oldest
    altitudeChart.update();

    // 4. Update Speed Gauge
    // Assume max speed 50 for gauge scaling
    const maxSpeed = 50; 
    const clampedSpeed = Math.min(data.speed, maxSpeed);
    speedGauge.data.datasets[0].data = [clampedSpeed, maxSpeed - clampedSpeed];
    
    // Dynamic color for speed
    let speedColor = '#06b6d4'; // Cyan
    if (data.speed > 30) speedColor = '#f59e0b'; // Orange
    if (data.speed > 45) speedColor = '#ef4444'; // Red
    speedGauge.data.datasets[0].backgroundColor = [speedColor, '#1e293b'];
    speedGauge.update();

    // 5. Update Map
    const newLatLng = [data.lat, data.lon];
    marker.setLatLng(newLatLng);
    flightPath.addLatLng(newLatLng);
    map.panTo(newLatLng); // Keep drone centered

});
