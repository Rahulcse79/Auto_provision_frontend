import React, { useState } from "react";
import Navbar from "../../Sidebar";
import Shell from "../../terminal";
import Header from "../../cards/header";
import Core from "../../Image/core.png";

const LinuxProvisioning = ({nodeServerUrl, Token}) => {

  const [shellData, setShellData] = useState(
    "Welcome to linux Shell! This is a read-only shell."
  );
  const [ipAddresses, setIpAddresses] = useState([""]);

  const handleInputChange = async (index, value) => {
    const updatedIpAddresses = [...ipAddresses];
    updatedIpAddresses[index] = value;
    await setIpAddresses(updatedIpAddresses);
  };

  const addIpAddress = async () => {
    await setIpAddresses([...ipAddresses, ""]);
  };

  const removeIpAddress = async (index) => {
    const updatedIpAddresses = [...ipAddresses];
    updatedIpAddresses.splice(index, 1);
    await setIpAddresses(updatedIpAddresses);
  };

  const RebootCall = async () => {
    try {
      const maxRetries = 3;
      let retryCount = 0;
      let devices = [];
      while (devices.length === 0 && retryCount < maxRetries) {
        devices = await ipAddresses;
        if (devices.length === 0) {
          await new Promise(resolve => setTimeout(resolve, 5000));
          retryCount++;
        }
      }
      if (devices.length === 0) {
        alert("No devices found after multiple attempts.");
        return;
      }
      let response = await fetch(`${nodeServerUrl}/linuxReboot`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ devices }),
      });
      response = await response.json();
      if (response.status === 0) {
        setShellData(response.responce);
        alert(`Success: ${response.message}`);
      } else {
        setShellData(response.responce);
        alert(`Error: ${response.message}`);
      }
    } catch (error) {
      console.error("Error during RebootCall:", error);
      alert("Server Error. Please try again later.");
    }
  };


  const LinuxConfig = async () => {
    try {

      const maxRetries = 3;
      let retryCount = 0;
      let devices = [];
      while (devices.length === 0 && retryCount < maxRetries) {
        devices = await ipAddresses;
        if (devices.length === 0) {
          console.log("Devices list is empty. Retrying in 5 seconds...");
          await new Promise(resolve => setTimeout(resolve, 5000));
          retryCount++;
        }
      }
      if (devices.length === 0) {
        alert("No devices found after multiple attempts.");
        return;
      }
      let response = await fetch(`${nodeServerUrl}/linuxConfig`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ devices }),
      });
      response = await response.json();
      if (response.status === 0) {
        setShellData(response.responce);
        alert(`Success: ${response.message}`);
      } else {
        setShellData(response.responce);
        alert(`Error: ${response.message}`);
      }
    } catch (error) {
      console.error("Error during LinuxConfig:", error);
      alert("Server Error. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <Header Title="Linux Provisioning" breadcrumb="/Server/5G core" />
      <div className="linux-container">
        <img className="linux-img" src={Core} alt="Loading..." />
        <form className="   linux-provisioning-form">
          {ipAddresses.map((ipAddress, index) => (
            <div className="form-group90" key={index}>
              <label htmlFor={`ipAddress-${index}`}>
                IP Address <span style={{ color: "red" }}>*</span>
              </label>
              <div style={{ display: "flex" }}>
                <input
                  type="text"
                  id={`ipAddress-${index}`}
                  value={ipAddress}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  placeholder="Enter IP address"
                  required
                />
                {index > 0 && (
                  <button
                    type="button"
                    className="button21"
                    onClick={() => removeIpAddress(index)}
                    style={{ marginLeft: "10px", height: "35px" }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className="form-group90">
            <button type="button" className="button21" onClick={addIpAddress}>
              + Add IP Address
            </button>
          </div>
          <div className="form-group90">
            <button type="button" className="button21" onClick={RebootCall}>
              Reboot
            </button>
          </div>
          <div className="form-group90">
            <button type="button" className="button21" onClick={LinuxConfig}>
              Configure machine
            </button>
          </div>
        </form>
      </div>
      <Shell shellOutput={shellData} />
    </>
  );
};

export default LinuxProvisioning;
