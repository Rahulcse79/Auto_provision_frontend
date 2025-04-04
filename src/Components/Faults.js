import React, { useState } from "react";
import Navbar from "./Sidebar";
import Header from "./cards/header";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Faults({ springBootServerUrl, Token }) {

  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData2 = async () => {
    try {
      const response = await fetch(
        `${springBootServerUrl}/api/deviceManager/faultList`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + Token,
          },
        }
      );
      const data = await response.json();
      if (data.status === 0) {
        const parsedData = JSON.parse(data.data);
        setApiData(parsedData);
        console.log(parsedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchData2();

  return (
    <>
      <Navbar />
      <Header Title="Faults" breadcrumb="/faults" />
      <form
        className="history-list"
        style={{ marginLeft: "240px", marginRight: "40px" }}
      >
        <div className="form-group902232">
          <table className="styled-table2232">
            <thead>
              <tr>
                <th>Serial no.</th>
                <th>Device</th>
                <th>Channel</th>
                <th>Code</th>
                <th>Message</th>
                <th>Detail</th>
                <th>Retries</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {apiData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.device}</td>
                  <td>{item.channel}</td>
                  <td>{item.code}</td>
                  <td>{item.message}</td>
                  <td>
                    {item.detail.faultCode + ": " + item.detail.faultString}
                  </td>
                  <td>{item.retries}</td>
                  <td>{item.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginBottom: "50px" }}>
            {apiData.length === 0 && (
              <span style={{ color: "red" }}>
                No data present, the table will be empty.
              </span>
            )}
          </div>
        </div>
      </form>

      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div style={{ color: "white", fontSize: "30px", display: "flex", alignItems: "center" }}>
            <AiOutlineLoading3Quarters
              style={{
                animation: "spin 2s linear infinite",
                marginRight: "10px",
              }}
            />
            Please wait... while we are retrieving the data.
          </div>
        </div>
      )}
    </>
  );
}
