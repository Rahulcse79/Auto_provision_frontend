import React, { useState, useEffect } from "react";
import Sidebar from "../../Sidebar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Shell from "../../terminal";

export default function Sip_server() {
  const navigate = useNavigate();
  const BaseUrl = window.location.hostname || "localhost";
  const Token = Cookies.get("session");

  const [sipServer, setSipServer] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [account1_Label, setAccount1_Label] = useState("");
  const [account1_SipUserId, setAccount1_SipUserId] = useState("");
  const [account1_AuthenticateID, setAccount1_AuthenticateID] =
    useState("1234");
  const [account1_DispalyName, setAccount1_DispalyName] = useState("");
  const [account1_Active, setAccount1_Active] = useState(false);
  const [account1_LocalSipPort, setAccount1_LocalSipPort] = useState("");
  const [account1Enabled, setAccount1Enabled] = useState(false);

  const toggleAccount1 = () => {
    setAccount1Enabled((prevState) => !prevState);
  };

  const CallSubmit = async (event) => {
    event.preventDefault();
    try {
      const account = account1Enabled ? "1" : "2";
      const TokenData = await JSON.parse(Token);
      const postData = {
        sipServer: sipServer,
        account1_Label: account1_Label,
        account1_SipUserId: account1_SipUserId,
        account1_AuthenticateID: account1_AuthenticateID,
        account1_DispalyName: account1_DispalyName,
        account1_Active: account1_Active,
        account1_LocalSipPort: account1_LocalSipPort,
        account: account
      };
      const response = await fetch(`http://${BaseUrl}:9090/api/deviceManager/sip/${macAddress}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TokenData.AuthToken}`
        },
        body: JSON.stringify(postData)
      });
      if (response.ok) {
        alert(`Account creation successful.`);
      } else {
        alert(`Failed to create account.`);
      }
    } catch (error) {
      console.error('Error creating account:', error);
      alert('Failed to create account. Please try again.');
    }
  };
  

  const handleCheckboxChange = (e) => {
    setAccount1_Active(e.target.checked);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const TokenData = JSON.parse(Token);
        const response = await fetch(`http://${BaseUrl}:3000/checkAuth`, {
          method: "post",
          headers: {
            Authorization: "Bearer " + TokenData.AuthToken,
          },
        });
        const data = await response.json();
        if (data.status === 1) {
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
      <Shell/>
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
            <label htmlFor="account1_LocalSipPort">
              Account local sip port :
            </label>
            <input
              type="number"
              id="account1_LocalSipPort"
              value={account1_LocalSipPort}
              onChange={(e) => setAccount1_LocalSipPort(e.target.value)}
              placeholder="Enter account local sip port."
              required
            />
          </div>

          <div className="form-group90">
            <div>
              <label>Select account :</label>
              <button onClick={toggleAccount1}>
                {account1Enabled ? "1" : "2"}
              </button>
            </div>
          </div>

          <div className="form-group90">
            <label htmlFor="account1_Active">Account active :</label>
            <input
              type="checkbox"
              id="account1_Active"
              name="account1_Active"
              className="input-field"
              checked={account1_Active}
              onChange={handleCheckboxChange}
            />
          </div>

          <div className="form-group90">
            <label htmlFor="account1_DispalyName">Account dispalyName :</label>
            <input
              type="text"
              id="account1_DispalyName"
              value={account1_DispalyName}
              onChange={(e) => setAccount1_DispalyName(e.target.value)}
              required
            />
          </div>

          <div className="form-group90">
            <label htmlFor="account1_Label">Account label :</label>
            <input
              type="text"
              id="account1_Label"
              value={account1_Label}
              onChange={(e) => setAccount1_Label(e.target.value)}
              required
            />
          </div>

          <div className="form-group90">
            <label htmlFor="account1_SipUserId">Account sip userId :</label>
            <input
              type="text"
              id="account1_SipUserId"
              value={account1_SipUserId}
              onChange={(e) => setAccount1_SipUserId(e.target.value)}
              required
            />
          </div>

          <div className="form-group90">
            <label htmlFor="account1_AuthenticateID">
              Account authenticateID :
            </label>
            <input
              type="text"
              id="account1_AuthenticateID"
              value={account1_AuthenticateID}
              onChange={(e) => setAccount1_AuthenticateID(e.target.value)}
              required
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
