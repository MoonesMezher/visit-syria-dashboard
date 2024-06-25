import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    CategoryScale,
    Chart,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip,
  } from "chart.js";
import './MainChart.css'

Chart.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
  );

const MainChart = ({ chart_title,x_labels,array, unit,y_steps }) => {
    const data = {
        labels: x_labels,
        datasets: [
            {
                data: array,
                fill: false,
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderColor: '#938E8E',
                pointRadius: [5, 0, 0, 0, 0],
                pointBackgroundColor: 'white',
                borderWidth: 2,
                tension: 0.4,
                color:"red"
            },
        ],
    };

    const options = {
        maintainAspectRatio: false, 
        scales: {
            y: {
                position: "right",
                ticks: {
                    beginAtZero: true,
                    callback: function (value) {
                        return value + unit;
                    },
                    stepSize: y_steps,
                    color: '#112211', 

                },
                border:{
                    display:false,
                },
                color: '#red', 

            },
            x: {
                grid: {
                  display: false,
                },
                ticks:{
                    color: '#112211', 
                }
              },
        },
        plugins: {
            legend: {
                display: false,
            },
        },

    };


    return (
        <div className="mainchart">
            <div className="chart-container">
                <label>{chart_title}</label>
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default MainChart;
