import React, { useState, useEffect } from "react";
import Sidebar from "../../Sidebar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Sip_server() {

  const navigate = useNavigate();
  const BaseUrl = window.location.hostname || "localhost";
  const Token = Cookies.get("Device_manager_token");

  const [sipServer, setSipServer] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [extensionOne, setExtensionOne] = useState("");
  const [extensionTwo, setExtensionTwo] = useState("");
  const [port, setPort] = useState("");
  const [passwordOne, setPasswordOne] = useState("1234");
  const [passwordOneTwo, setPasswordTwo] = useState("1234");

  const CallSubmit = async (event) => {
    event.preventDefault();
    // Add your form submission logic here
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://${BaseUrl}:3000/checkAuth`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + Token,
            },
          }
        );
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

  return (
    <>
      <Sidebar />
      <div>
        <form className="SipServerForm" onSubmit={CallSubmit}>
          
          <div className="form-group90">
            <label htmlFor="macAddress">
              MacAddress<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              id="macAddress"
              value={macAddress}
              onChange={(e) => setMacAddress(e.target.value)}
              placeholder="Enter mac-address"
              required
            />
          </div>

          <div className="form-group90">
            <label htmlFor="Sip_server_ip">
              Sip_server_ip<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              id="Sip_server_ip"
              value={sipServer}
              onChange={(e) => setSipServer(e.target.value)}
              placeholder="Enter sip server ip"
              required
            />
          </div>

          <div className="form-group90">
            <label htmlFor="port">Port :</label>
            <input
              type="number"
              id="port"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              placeholder="Enter port"
              required
            />
          </div>

          <div className="form-group90">
            <label htmlFor="extensionOne">Extension 1 :</label>
            <input
              type="number"
              id="extensionOne"
              value={extensionOne}
              onChange={(e) => setExtensionOne(e.target.value)}
              required
            />
          </div>

          <div className="form-group90">
            <label htmlFor="extensionTwo">Password:</label>
            <input
              type="number"
              id="extensionTwo"
              value={passwordOne}
              onChange={(e) => setPasswordOne(e.target.value)}
            />
          </div>

          <div className="form-group90">
            <label htmlFor="extensionTwo">Password:</label>
            <input
              type="number"
              id="extensionTwo"
              value={extensionTwo}
              onChange={(e) => setExtensionTwo(e.target.value)}
            />
          </div>

          <div className="form-group90">
            <label htmlFor="extensionTwo">Password:</label>
            <input
              type="number"
              id="extensionTwo"
              value={passwordOneTwo}
              onChange={(e) => setPasswordTwo(e.target.value)}
            />
          </div>

          <div className="form-group90">
            <button type="submit" className="button21">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
