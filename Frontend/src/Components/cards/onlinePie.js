import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Sidebar from '../Sidebar';
import Header from './header';
ChartJS.register(ArcElement, Tooltip, Legend);

const onlinePie = () => {
  const data = {
    labels: ['Online Devices', 'Offline Devices'],
    datasets: [
      {
        label: '# of Votes',
        data: [2,2],
        backgroundColor: [
        '#00C49F',
        '#0088FE',
          
        ],
        borderColor: [
        '#00C49F',
        '#0088FE',
         
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <>
        <Sidebar/>
        <Header 
        Title="Online Devices"
        breadcrumb="/Device Detail/Online Devices "/>
        <div className="pie-chart-container">
        <h2>Online Devices</h2>
        <div className="pie-chart">
            <Pie data={data} options={options} />
        </div>
        </div>
    </>
  );
};

export default onlinePie;
