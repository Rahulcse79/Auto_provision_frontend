import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Sidebar from "../Sidebar";
import Header from "./header";

ChartJS.register(ArcElement, Tooltip, Legend);

const OnlinePie = ({springBootServerUrl, Token}) => {

  const [apiData, setApiData] = useState(0);
  const [onlineDevices, setOnlineDevices] = useState(0);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        let response = await fetch(
          `${springBootServerUrl}/api/deviceManagerInfo/allData`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + Token
            },
          }
        );
        response = await response.json();
        if (response) {
          let count = 0,
            total = 0;
          response.forEach((item) => {
            if (item.active) {
              count++;
            }
            if (item) total++;
          });
          setApiData(total - count);
          setOnlineDevices(count);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDevices();
  }, [
    Token,
    springBootServerUrl,
    setOnlineDevices,
  ]);

  const data = {
    labels: ["Online Devices", "Offline Devices"],
    datasets: [
      {
        label: "# of Devices",
        data: [onlineDevices, apiData],
        backgroundColor: ["#31a354", "#0098c8 "],
        borderColor: ["#31a354", "#0058c8"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = tooltipItem.label || "";
            const value = tooltipItem.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <>
      <Sidebar />
      <Header
        Title="Online Devices"
        breadcrumb="/Device Detail/Online Devices "
      />
      <div className="pie-chart-container">
        <h2>Online Devices</h2>
        <div className="pie-chart">
          <Pie data={data} options={options} />
        </div>
        <div>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "normal",
              color: "green",
              margin: "5px 0",
            }}
          >
            Online devices: {onlineDevices}
          </h2>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "normal",
              color: "#dc3545",
              margin: "5px 0",
            }}
          >
            Offline devices: {apiData}
          </h2>
        </div>
        <div style={{ marginTop: "50px" }}>
            {!apiData && (
              <span style={{ color: "red" }}>
                No devices are present.
              </span>
            )}
      </div>
      </div>
    </>
  );
};

export default OnlinePie;
