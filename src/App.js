import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Home from "./Components/Home";
import IpPhoneProvisioning from "./Components/Ip_phones/Ip_Phone_Provisioning";
import LinuxProvisioning from "./Components/Servers/SIP_Servers/Linux_Provisioning";
import AutoUpdate from "./Components/AutoUpdateList";
import History from "./Components/History";
import TimeSchedule from "./Components/TimeSchedule";
import LogIn from "./Components/LogIn";
import Setting from "./Components/System_setting";
import FileUpload from "./Components/FileUpload";
import ListDevices from "./Components/ListDevices";
import OnlineDevices from "./Components/cards/onlinePie";
import CiscoPhone from "./Components/Ip_phones/Cisco_phone";
import IotGateway from "./Components/Servers/IOT/Iot_gateway";
import CallServer from "./Components/Servers/CallServer/Call_Server";
import AddIpAddress from "./Components/Servers/AddIpAddress";
import Faults from "./Components/Faults";
import PhoneFiles from "./Components/Ip_phones/PhoneFiles";

function App() {

  document.body.style.backgroundColor = '#4a4a4a';
  const Cookie_name = process.env.REACT_APP_COOKIENAME || "Auto_Provisioning_Server";
  const TR_server_url = process.env.REACT_APP_TR_SERVER_URL || "http://0.0.0.0:3000";
  const Node_server_url = process.env.REACT_APP_NODE_SERVER_URL || "http://0.0.0.0:4058";
  const SpringBoot_server_url = process.env.REACT_APP_SPRINGBOOT_SERVER_URL || "http://0.0.0.0:9093";
  const [Token, setToken] = useState(null);
  const [CheckCookie, setCheckCookie] = useState(false);
  const FetchCookie = localStorage.getItem(Cookie_name);

  useEffect(() => {
    const CheckLoginPage = window.location.pathname !== "/";
    if (!FetchCookie && CheckLoginPage) {
      console.log("if (!FetchCookie && CheckLoginPage) " + CheckLoginPage + FetchCookie)
      window.location.href = "/";
      return;
    }

    if (!CheckCookie && FetchCookie) {
      console.log("!CheckCookie && FetchCookie" + FetchCookie + CheckCookie);
      const TokenData = JSON.parse(FetchCookie);
      setToken(TokenData.AuthToken);
      setCheckCookie(true);
    }
  }, [Cookie_name, CheckCookie, FetchCookie]);

  useEffect(() => {
    if (!Token) {
      window.location.href = "/";
      return
    };
    
    console.log(Token)
    const fetchData = async () => {
      try {
        const response = await fetch(`${TR_server_url}/checkAuth`, {
          method: "POST",
          headers: { Authorization: `Bearer ${Token}` },
        });
        const data = await response.json();
        if (data.status !== 1) {
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [Token, TR_server_url]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn trServerUrl={TR_server_url} cookieName={Cookie_name} />} />
          {FetchCookie && (
            <>
              <Route path="/home" element={<Home nodeServerUrl={Node_server_url} springBootServerUrl={SpringBoot_server_url} Token={Token} />} />
              <Route path="/Backup_config" element={<PhoneFiles springBootServerUrl={SpringBoot_server_url} Token={Token} />} />
              <Route path="/cisco_CP-3905" element={<CiscoPhone springBootServerUrl={SpringBoot_server_url} Token={Token} />} />
              <Route path="/history" element={<History springBootServerUrl={SpringBoot_server_url} Token={Token} />} />
              <Route path="/auto-update" element={<AutoUpdate springBootServerUrl={SpringBoot_server_url} Token={Token} />} />
              <Route path="/ip-phone-provisioning" element={<IpPhoneProvisioning springBootServerUrl={SpringBoot_server_url} Token={Token} />} />
              <Route path="/linux-provisioning" element={<LinuxProvisioning nodeServerUrl={Node_server_url} Token={Token} />} />
              <Route path="/time-schedule" element={<TimeSchedule springBootServerUrl={SpringBoot_server_url} Token={Token} />} />
              <Route path="/system-setting" element={<Setting nodeServerUrl={Node_server_url} Token={Token} />} />
              <Route path="/fileUploadList" element={<FileUpload springBootServerUrl={SpringBoot_server_url} Token={Token} />} />
              <Route path="/listing-devices" element={<ListDevices springBootServerUrl={SpringBoot_server_url} Token={Token} />} />
              <Route path="/iot_gateway" element={<IotGateway />} />
              <Route path="/online-devices" element={<OnlineDevices springBootServerUrl={SpringBoot_server_url} Token={Token} />} />
              <Route path="/call-server" element={<CallServer nodeServerUrl={Node_server_url} Token={Token} />} />
              <Route path="/add-IPAddress" element={<AddIpAddress nodeServerUrl={Node_server_url} Token={Token} />} />
              <Route path="/faults" element={<Faults springBootServerUrl={SpringBoot_server_url} Token={Token} />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;