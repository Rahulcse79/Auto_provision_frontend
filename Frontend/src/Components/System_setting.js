import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


export default function System_setting() {
  const [subnet, setSubnet] = useState("");
  const [netmask, setNetmask] = useState("");
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [routers, setRouters] = useState("");
  const [broadcast, setBroadcast] = useState("");
  const [domain, setDomain] = useState("");
  const [DHCP, setDHCP] = useState("");
  const [minLease, setMinLease] = useState("");
  const [maxLease, setMaxLease] = useState("");
  const [encapsulated, setEncapsulated] = useState("");
  const [authoritative, setAuthoritative] = useState(false);
  const BaseUrl = window.location.hostname || "localhost";
  const Token = Cookies.get("Device_manager_token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${BaseUrl}:3000/checkAuth`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + Token,
          },
        });
        const data = await response.json();
        if (data.status === 0) {
          console.log("Token is valid.");
        } else {
          navigate("/log-in");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [navigate, BaseUrl, Token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dhcpConfig = {
      subnet: subnet,
      netmask: netmask,
      range: {
        start: rangeStart,
        end: rangeEnd,
      },
      routers: routers,
      broadcast: broadcast,
      dns: domain,
      vendorOptions: DHCP,
      defaultLease: minLease,
      maxLease: maxLease,
      encapsulated: encapsulated,
      authoritative: authoritative,
    };

    try {
      const response = await fetch(`http://${BaseUrl}:3021/submitDHCPConfig`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Token,
        },
        body: JSON.stringify(dhcpConfig),
      });
      console.log(dhcpConfig);
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      if (data.status === 0) {
        console.log("DHCP configuration submitted successfully.");
      } else {
        console.log("Failed to submit DHCP configuration.");
      }
    } catch (error) {
      console.error("Error submitting DHCP configuration:", error);
    }
  };

  const handleCheckboxChange = (e) => {
    setAuthoritative(e.target.checked); // Update state based on checkbox value
  };

  return (
    <div className="system-settings-container">
      <Sidebar />
      <div className="system-settings-content">
        <form className="Textlight21" onSubmit={handleSubmit}>
          <div className="form-group-flex">
            <div className="form-group90">
              <label htmlFor="subnet">Subnet:</label>
              <input
                type="text"
                id="subnet"
                name="subnet"
                className="input-field"
                value={subnet}
                onChange={(e) => setSubnet(e.target.value)}
              />
            </div>
            <div className="form-group90">
              <label htmlFor="netmask">Netmask:</label>
              <input
                type="text"
                id="netmask"
                name="netmask"
                className="input-field"
                value={netmask}
                onChange={(e) => setNetmask(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group-flex">
            <div className="form-group90">
              <label htmlFor="rangeStart">Pool start:</label>
              <input
                type="text"
                id="rangeStart"
                name="rangeStart"
                className="input-field"
                value={rangeStart}
                onChange={(e) => setRangeStart(e.target.value)}
              />
            </div>
            <div className="form-group90">
              <label htmlFor="rangeEnd">Pool end:</label>
              <input
                type="text"
                id="rangeEnd"
                name="rangeEnd"
                className="input-field"
                value={rangeEnd}
                onChange={(e) => setRangeEnd(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group-flex">
            <div className="form-group90">
              <label htmlFor="routers">Option Routers:</label>
              <input
                type="text"
                id="routers"
                name="routers"
                className="input-field"
                value={routers}
                onChange={(e) => setRouters(e.target.value)}
              />
            </div>
            <div className="form-group90">
              <label htmlFor="broadcast">Option Broadcast Address:</label>
              <input
                type="text"
                id="broadcast"
                name="broadcast"
                className="input-field"
                value={broadcast}
                onChange={(e) => setBroadcast(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group-flex">
            <div className="form-group90">
              <label htmlFor="domain">Option Domain Name Servers:</label>
              <input
                type="text"
                id="domain"
                name="domain"
                className="input-field"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
            </div>
            <div className="form-group90">
              <label htmlFor="DHCP">Append DHCP Parameter Request List:</label>
              <input
                type="text"
                id="DHCP"
                name="DHCP"
                className="input-field"
                value={DHCP}
                onChange={(e) => setDHCP(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group-flex">
            <div className="form-group90">
              <label htmlFor="encapsulated">Option Vendor Encapsulated Options:</label>
              <input
                type="text"
                id="encapsulated"
                name="encapsulated"
                className="input-field"
                value={encapsulated}
                onChange={(e) => setEncapsulated(e.target.value)}
              />
            </div>
            <div className="form-group90">
              <label htmlFor="minLease">Default Lease Time:</label>
              <input
                type="text"
                id="minLease"
                name="minLease"
                className="input-field"
                value={minLease}
                onChange={(e) => setMinLease(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group-flex">
            <div className="form-group90">
              <label htmlFor="maxLease">Max Lease Time:</label>
              <input
                type="text"
                id="maxLease"
                name="maxLease"
                className="input-field"
                value={maxLease}
                onChange={(e) => setMaxLease(e.target.value)}
              />
            </div>
            <div className="form-group90">
              <label htmlFor="authoritative">Authoritative:</label>
              <input
                type="checkbox"
                id="authoritative"
                name="authoritative"
                className="input-field"
                checked={authoritative}
                onChange={handleCheckboxChange}
              />
            </div>
          </div>
          <div className="form-group-flex">
            <button type="submit" className="button21">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
