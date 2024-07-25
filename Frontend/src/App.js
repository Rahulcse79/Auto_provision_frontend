import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import IpPhoneProvisioning from "./Components/Ip_phones/Ip_Phone_Provisioning";
import LinuxProvisioning from "./Components/Servers/SIP_Servers/Linux_Provisioning";
import AutoUpdate from "./Components/AutoUpdateList";
import History from "./Components/History";
import TimeSchedule from "./Components/TimeSchedule";
import LogIn from "./Components/LogIn";
import SipServer from "./Components/Servers/SIP_Servers/Sipserver";
import Setting from "./Components/System_setting";
import Terminal from "./Components/Terminal";

function App() {
  document.body.style.backgroundColor = 'rgb(31, 40, 62)';
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home/>}/>
          <Route path="/terminal" element={<Terminal/>}/>
          <Route path="/history" element={<History/>}/>
          <Route path="/auto-update" element={<AutoUpdate/>}/>
          <Route path="/ip-phone-provisioning" element={<IpPhoneProvisioning/>}/>
          <Route path="/linux-provisioning" element={<LinuxProvisioning/>}/>
          <Route path="/time-schedule" element={<TimeSchedule/>}/>
          <Route path="/log-in" element={<LogIn/>}/>
          <Route path="/sip-server" element={<SipServer/>}/>
          <Route path="/system-setting" element={<Setting/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
