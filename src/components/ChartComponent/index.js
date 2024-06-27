import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns'; // Import the date adapter
import { format } from 'date-fns';
import axios from 'axios';


const ChartComponent = ({ timeframe }) => {
  const chartRef = useRef();
  const [chart, setChart] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/data.json'); // Adjust the path if necessary
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const exportAsImage = () => {
    // Use html2canvas to capture the chart canvas element
    html2canvas(chartRef.current).then((canvas) => {
      // Convert canvas to PNG image data
      const imageData = canvas.toDataURL('image/png');

      // Create a download link and click it programmatically
      const link = document.createElement('a');
      link.href = imageData;
      link.download = 'chart.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const aggregateData = (data, timeframe) => {
    if (timeframe === 'weekly') {
      const aggregatedData = [];
      let currentWeekData = [];
      let currentWeekStartDate = null;

      data.forEach((entry) => {
        const date = new Date(entry.timestamp);
        const weekStartDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());

        if (!currentWeekStartDate || currentWeekStartDate.getTime() !== weekStartDate.getTime()) {
          if (currentWeekData.length > 0) {
            aggregatedData.push({
              timestamp: currentWeekStartDate.toISOString(),
              value: currentWeekData.reduce((acc, cur) => acc + cur.value, 0) / currentWeekData.length,
            });
          }

          currentWeekStartDate = weekStartDate;
          currentWeekData = [entry];
        } else {
          currentWeekData.push(entry);
        }
      });

      if (currentWeekData.length > 0) {
        aggregatedData.push({
          timestamp: currentWeekStartDate.toISOString(),
          value: currentWeekData.reduce((acc, cur) => acc + cur.value, 0) / currentWeekData.length,
        });
      }

      return aggregatedData;
    } else if (timeframe === 'monthly') {
      const aggregatedData = [];
      let currentMonthData = [];
      let currentMonthStartDate = null;

      data.forEach((entry) => {
        const date = new Date(entry.timestamp);
        const monthStartDate = new Date(date.getFullYear(), date.getMonth(), 1);

        if (!currentMonthStartDate || currentMonthStartDate.getTime() !== monthStartDate.getTime()) {
          if (currentMonthData.length > 0) {
            aggregatedData.push({
              timestamp: currentMonthStartDate.toISOString(),
              value: currentMonthData.reduce((acc, cur) => acc + cur.value, 0) / currentMonthData.length,
            });
          }

          currentMonthStartDate = monthStartDate;
          currentMonthData = [entry];
        } else {
          currentMonthData.push(entry);
        }
      });

      if (currentMonthData.length > 0) {
        aggregatedData.push({
          timestamp: currentMonthStartDate.toISOString(),
          value: currentMonthData.reduce((acc, cur) => acc + cur.value, 0) / currentMonthData.length,
        });
      }

      return aggregatedData;
    }

    return data;
  };

  useEffect(() => {
    if (!data.length) return;

    const ctx = chartRef.current.getContext('2d');
    const filteredData = aggregateData(data, timeframe);

    if (chart) {
      chart.destroy();
    }

    const chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: filteredData.map((entry) => entry.timestamp),
        datasets: [
          {
            label: 'Value',
            data: filteredData.map((entry) => entry.value),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1,
            pointRadius: 3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                return `Value: ${context.raw}`;
              },
            },
          },
          zoom: {
            pan: {
              enabled: true,
              mode: 'x',
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: 'x',
            },
          },
        },
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            type: 'time',
            time: {
              tooltipFormat: 'PPP p',
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    setChart(chartInstance);

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [timeframe, data]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;
