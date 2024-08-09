import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Header from './cards/header'

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
  const BaseUrlTr069 = process.env.REACT_APP_API_tr069_URL || "localhost";
  const PORTTr069 = process.env.REACT_APP_API_tr069_PORT || "3000";
  const BaseUrlNode = process.env.REACT_APP_API_NODE_URL || "localhost";
  const PORTNode = process.env.REACT_APP_API_NODE_PORT || "3000";
  const CookieName = process.env.REACT_APP_COOKIENAME || "session";
  const Token = Cookies.get(CookieName);
  const navigate = useNavigate();

  useEffect(() => {
    if(!Token) navigate("/log-in");
    const fetchData = async () => {
      try {
        const TokenData = JSON.parse(Token);
        const response = await fetch(`http://${BaseUrlTr069}:${PORTTr069}/checkAuth`, {
          method: "post",
          headers: {
            Authorization: "Bearer " + TokenData.AuthToken,
          },
        });
        const data = await response.json();
        if (data.status !== 1) {
          navigate("/log-in");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [navigate, BaseUrlTr069, PORTTr069, Token]);

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
      const response = await fetch(`http://${BaseUrlNode}:${PORTNode}/submitDHCPConfig`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Token,
        },
        body: JSON.stringify(dhcpConfig),
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
     
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
    setAuthoritative(e.target.checked); 
  };

  return (
    <>
      <Sidebar />
      <Header 
      Title='System Settings'
      breadcrumb ='/System Settings'/>
      <div className="system-settings-content">
        <form className="system-settings-form" onSubmit={handleSubmit}>
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
    </>
  );
}
