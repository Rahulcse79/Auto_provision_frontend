import React, { useState, useEffect } from "react";
import Navbar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import Header from "./cards/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MdOnlinePrediction } from "react-icons/md";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Fault({ springBootServerUrl, Token }) {

  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

    // Function to fetch data at intervals
    const fetchData2 = async () => {
      try {

        const response = await fetch(
          `${springBootServerUrl}/api/deviceManagerInfo/allData`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + Token
            },
          }
        );
        const data = await response.json();
        const sortedData = data.sort((a, b) => a.id - b.id);
        if (sortedData) {
          setApiData(sortedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData2();

    const intervalId = setInterval(() => {
      fetchData2();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [
    setApiData,
    springBootServerUrl,
    Token,
  ]);

  const handleDelete = async (macAddress) => {

    try {
      const response = await fetch(
        `${springBootServerUrl}/api/deviceManager/deleteListItem`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + Token,
            macAddress: macAddress,
          },
        }
      );
      const data = await response.json();
      if (response.ok && data.status === 0) {
        alert("Delete request successful");
      } else {
        alert("Delete request failed: " + (data.message || "No message"));
      }
    } catch (error) {
      console.error("Error making delete request", error);
    }
  };

  return (
    <>
      <Navbar />
      <Header Title="Listing devices" breadcrumb="/Listing_devices" />
      <form
        className="history-list"
        style={{ marginLeft: "240px", marginRight: "40px" }}
      >
        <div className="form-group902232">
          <table className="styled-table2232">
            <thead>
              <tr>
                <th>Serial no.</th>
                <th>MacAddress</th>
                <th>OUI</th>
                <th>Product class</th>
                <th>IpAddress</th>
                <th>Status</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {apiData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <span
                      onClick={() => navigate("/Ip-Phone-Provisioning")}
                      style={{
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      {item.macAddress}
                    </span>
                  </td>
                  <td>{item.oui}</td>
                  <td>{item.productClass}</td>
                  <td>
                    {item.ipAddress && item.ipAddress !== "-1" ? (
                      <span
                        onClick={() => {
                          window.open(`http://${item.ipAddress}/`, "_blank");
                        }}
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        {item.ipAddress}
                      </span>
                    ) : (
                      "-1"
                    )}
                  </td>
                  <td>
                    <MdOnlinePrediction
                      icon={MdOnlinePrediction}
                      style={{
                        cursor: "pointer",
                        color: item.active ? "green" : "red",
                        marginLeft: "10px",
                      }}
                    />
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{
                        cursor: "pointer",
                        color: "red",
                        marginLeft: "10px",
                      }}
                      onClick={() => handleDelete(item.macAddress)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
