import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import './LiveStatus.css';

ChartJS.register(...registerables);

interface LiveStatusProps {
  cityZone: {
    city: string | null;
    zone: string | null;
  };
}

const LiveStatus: React.FC<LiveStatusProps> = ({ cityZone }) => {
  const chargingCurrentRef = useRef<HTMLCanvasElement>(null);
  const batteryVoltageRef = useRef<HTMLCanvasElement>(null);
  const loRaStrengthRef = useRef<HTMLCanvasElement>(null);
  const speedRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const charts: ChartJS[] = [];

    // Charging Current Chart
    if (chargingCurrentRef.current) {
      const chargingCurrentChart = new ChartJS(chargingCurrentRef.current, {
        type: 'line',
        data: {
          labels: ['0s', '10s', '20s', '30s', '40s', '50s', '60s'],
          datasets: [{
            label: 'Charging Current (A)',
            data: [0, 2, 4, 3, 5, 6, 7],
            borderColor: '#27ae60',
            backgroundColor: 'rgba(39, 174, 96, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointBackgroundColor: '#27ae60',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
      charts.push(chargingCurrentChart);
    }

    // Battery Voltage Chart
    if (batteryVoltageRef.current) {
      const batteryVoltageValue = 75;
      const batteryVoltageChart = new ChartJS(batteryVoltageRef.current, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [batteryVoltageValue, 100 - batteryVoltageValue],
            backgroundColor: ['#3498db', '#ecf0f1'],
            borderWidth: 0,
            cutout: '75%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
          }
        },
        plugins: [{
          id: 'textCenter',
          beforeDraw: (chart) => {
            const { ctx, width, height } = chart;
            ctx.save();
            ctx.font = 'bold 20px Arial';
            ctx.fillStyle = '#3498db';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(batteryVoltageValue + '%', width / 2, height / 2);
            ctx.restore();
          }
        }]
      });
      charts.push(batteryVoltageChart);
    }

    // LoRa Signal Strength Chart
    if (loRaStrengthRef.current) {
      const loRaStrengthChart = new ChartJS(loRaStrengthRef.current, {
        type: 'bar',
        data: {
          labels: ['Device 1', 'Device 2', 'Device 3', 'Device 4'],
          datasets: [{
            label: 'LoRa Strength (dBm)',
            data: [-80, -70, -60, -75],
            backgroundColor: [
              'rgba(142, 68, 173, 0.8)',
              'rgba(142, 68, 173, 0.6)',
              'rgba(142, 68, 173, 0.4)',
              'rgba(142, 68, 173, 0.7)'
            ],
            borderColor: '#8e44ad',
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
      charts.push(loRaStrengthChart);
    }

    // Speed Line Chart
    if (speedRef.current) {
      const speedChart = new ChartJS(speedRef.current, {
        type: 'line',
        data: {
          labels: ['0s', '10s', '20s', '30s', '40s', '50s', '60s'],
          datasets: [{
            label: 'Speed (panels/min)',
            data: [5, 6, 7, 5, 8, 9, 10],
            borderColor: '#e67e22',
            backgroundColor: 'rgba(230, 126, 34, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointBackgroundColor: '#e67e22',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
      charts.push(speedChart);
    }

    return () => {
      charts.forEach(chart => chart.destroy());
    };
  }, []);

  return (
    <div className="live-status fade-in">
      <h2>Live Status</h2>
      <p>Real-time monitoring of system parameters and performance metrics.</p>

      <div className="charts-grid">
        <div className="chart-container">
          <div className="chart-title" id="charging-current">Charging Current</div>
          <canvas ref={chargingCurrentRef}></canvas>
        </div>

        <div className="chart-container">
          <div className="chart-title" id="battery-voltage">Battery Voltage</div>
          <canvas ref={batteryVoltageRef}></canvas>
        </div>

        <div className="chart-container">
          <div className="chart-title" id="lora-signal-strength">LoRa Signal Strength</div>
          <canvas ref={loRaStrengthRef}></canvas>
        </div>

        <div className="chart-container">
          <div className="chart-title" id="cleaning-speed">Cleaning Speed</div>
          <canvas ref={speedRef}></canvas>
        </div>
      </div>

      <div className="data-section">
        <h3 id="system-parameters">System Parameters</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Value</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr id="temperature">
              <td>Temperature</td>
              <td>35 °C</td>
              <td><span className="status-normal">Normal</span></td>
            </tr>
            <tr id="solar-panel-voltage">
              <td>Solar Panel Voltage</td>
              <td>12 V</td>
              <td><span className="status-normal">Normal</span></td>
            </tr>
            <tr id="average-current">
              <td>Average Current</td>
              <td>5.5 A</td>
              <td><span className="status-normal">Normal</span></td>
            </tr>
            <tr id="battery-charge">
              <td>Battery Charge</td>
              <td>80 %</td>
              <td><span className="status-good">Good</span></td>
            </tr>
             <tr>
    <td>Temperature</td>
    <td>35 °C</td>
    <td><span className="status-normal">Normal</span></td>
  </tr>
  <tr>
    <td>Solar Panel Voltage</td>
    <td>12 V</td>
    <td><span className="status-normal">Normal</span></td>
  </tr>
  <tr>
    <td>Average Current</td>
    <td>5.5 A</td>
    <td><span className="status-normal">Normal</span></td>
  </tr>
  <tr>
    <td>Battery Charge</td>
    <td>80 %</td>
    <td><span className="status-good">Good</span></td>
  </tr>
  <tr>
    <td>Running Current</td>
    <td>6.2 A</td>
    <td><span className="status-normal">Normal</span></td>
  </tr>
  <tr>
    <td>Current Threshold</td>
    <td>7 A</td>
    <td><span className="status-normal">Normal</span></td>
  </tr>
  <tr>
    <td>Voltage Threshold</td>
    <td>50 V</td>
    <td><span className="status-normal">Normal</span></td>
  </tr>
  <tr>
    <td>Self-Charging Voltage</td>
    <td>1.5 V</td>
    <td><span className="status-normal">Normal</span></td>
  </tr>
  <tr>
    <td>Connectivity (LoRa Strength)</td>
    <td>Good</td>
    <td><span className="status-good">Connected</span></td>
  </tr>
  <tr>
    <td>Wind Speed</td>
    <td>12 km/h</td>
    <td><span className="status-normal">Normal</span></td>
  </tr>
  <tr>
    <td>Rain Sensor Status</td>
    <td>No Rain</td>
    <td><span className="status-normal">Normal</span></td>
  </tr>
  <tr>
    <td>Error Code</td>
    <td>0x00</td>
    <td><span className="status-normal">Normal</span></td>
    </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LiveStatus;
