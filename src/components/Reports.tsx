import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import './Reports.css';

ChartJS.register(...registerables);

const Reports: React.FC = () => {
  const runTimeRef = useRef<HTMLCanvasElement>(null);
  const currentRef = useRef<HTMLCanvasElement>(null);
  const arraysCleanedRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const charts: ChartJS[] = [];

    // Run Time Record Chart
    if (runTimeRef.current) {
      const runTimeChart = new ChartJS(runTimeRef.current, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{
            label: 'Run Time (hours)',
            data: [120, 130, 115, 140, 150, 160],
            backgroundColor: 'rgba(52, 152, 219, 0.8)',
            borderColor: '#3498db',
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false
          }, {
            label: 'Panels Cleaned',
            data: [300, 320, 310, 330, 340, 350],
            backgroundColor: 'rgba(39, 174, 96, 0.8)',
            borderColor: '#27ae60',
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top' as const,
              labels: {
                usePointStyle: true,
                font: {
                  weight: 600
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            },
            x: {
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            }
          }
        }
      });
      charts.push(runTimeChart);
    }

    // Charging & Running Current Chart
    if (currentRef.current) {
      const currentChart = new ChartJS(currentRef.current, {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
          datasets: [{
            label: 'Charging Current (A)',
            data: [5, 6, 5.5, 6.2, 5.8, 6.5],
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: '#3498db',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
          }, {
            label: 'Running Current (A)',
            data: [4.2, 4.8, 4.5, 5.1, 4.7, 5.3],
            borderColor: '#e74c3c',
            backgroundColor: 'rgba(231, 76, 60, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: '#e74c3c',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top' as const,
              labels: {
                usePointStyle: true,
                font: {
                  weight: 600
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            },
            x: {
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            }
          }
        }
      });
      charts.push(currentChart);
    }

    // Arrays Cleaned Chart
    if (arraysCleanedRef.current) {
      const arraysChart = new ChartJS(arraysCleanedRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Cleaned Arrays', 'Uncleaned Arrays', 'In Progress'],
          datasets: [{
            data: [250, 80, 20],
            backgroundColor: [
              'rgba(39, 174, 96, 0.8)',
              'rgba(231, 76, 60, 0.8)',
              'rgba(241, 196, 15, 0.8)'
            ],
            borderColor: [
              '#27ae60',
              '#e74c3c',
              '#f1c40f'
            ],
            borderWidth: 3,
            hoverOffset: 10
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'right' as const,
              labels: {
                usePointStyle: true,
                font: {
                  weight: 600
                },
                padding: 20
              }
            }
          }
        }
      });
      charts.push(arraysChart);
    }

    return () => {
      charts.forEach(chart => chart.destroy());
    };
  }, []);

  return (
    <div className="reports fade-in">
      <h2>Reports</h2>
      <p>Comprehensive analysis and operational reports for your plant systems.</p>

      <div className="reports-grid">
        <div className="report-section">
          <h3>Runtime & Cleaning Performance</h3>
          <div className="chart-container">
            <canvas ref={runTimeRef} height="300"></canvas>
          </div>
        </div>

        <div className="report-section">
          <h3>Current Analysis</h3>
          <div className="chart-container">
            <canvas ref={currentRef} height="300"></canvas>
          </div>
        </div>

        <div className="report-section">
          <h3>Array Status Distribution</h3>
          <div className="chart-container">
            <canvas ref={arraysCleanedRef} height="300"></canvas>
          </div>
        </div>

        <div className="report-section">
          <h3>System Reports</h3>
          <div className="reports-list">
            <div className="report-item">
              <h4>Email Reports</h4>
              <p>Automated daily and weekly reports sent to stakeholders</p>
              <button className="btn btn-primary">Generate Report</button>
            </div>
            <div className="report-item">
              <h4>Error Report</h4>
              <p>Detailed analysis of system errors and maintenance needs</p>
              <button className="btn btn-primary">View Errors</button>
            </div>
            <div className="report-item">
              <h4>Service Cycle</h4>
              <p>Maintenance schedule and service cycle tracking</p>
              <button className="btn btn-primary">View Schedule</button>
            </div>
          </div>
        </div>

        <div className="report-section full-width">
          <h3>Performance Metrics</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Current Month</th>
                <th>Previous Month</th>
                <th>Change</th>
                <th>Target</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Runtime (hours)</td>
                <td>160</td>
                <td>150</td>
                <td><span className="positive">+6.7%</span></td>
                <td>165</td>
              </tr>
              <tr>
                <td>Panels Cleaned</td>
                <td>350</td>
                <td>340</td>
                <td><span className="positive">+2.9%</span></td>
                <td>360</td>
              </tr>
              <tr>
                <td>Average Efficiency</td>
                <td>87%</td>
                <td>85%</td>
                <td><span className="positive">+2.4%</span></td>
                <td>90%</td>
              </tr>
              <tr>
                <td>Energy Saved (kWh)</td>
                <td>2,340</td>
                <td>2,180</td>
                <td><span className="positive">+7.3%</span></td>
                <td>2,500</td>
              </tr>
              <tr>
                <td>Maintenance Hours</td>
                <td>12</td>
                <td>18</td>
                <td><span className="positive">-33.3%</span></td>
                <td>10</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;