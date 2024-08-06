import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import IpPhoneProvisioning from "./Components/Ip_phones/Ip_Phone_Provisioning";
import LinuxProvisioning from "./Components/Servers/SIP_Servers/Linux_Provisioning";
import AutoUpdate from "./Components/AutoUpdateList";
import History from "./Components/History";
import TimeSchedule from "./Components/TimeSchedule";
import LogIn from "./Components/LogIn";
import Setting from "./Components/System_setting";
import Fault from "./Components/Fault";
import ListingDevices from "./Components/ListingDevices";
import OnlinePie from "./Components/cards/onlinePie"


function App() {
  document.body.style.backgroundColor = '#f0f0f0';
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home/>}/>
          <Route path="/history" element={<History/>}/>
          <Route path="/auto-update" element={<AutoUpdate/>}/>
          <Route path="/ip-phone-provisioning" element={<IpPhoneProvisioning/>}/>
          <Route path="/linux-provisioning" element={<LinuxProvisioning/>}/>
          <Route path="/time-schedule" element={<TimeSchedule/>}/>
          <Route path="/log-in" element={<LogIn/>}/>
          <Route path="/system-setting" element={<Setting/>}/>
          <Route path="/fault" element={<Fault/>}/>
          <Route path="/listing-devices" element={<ListingDevices/>}/>
          <Route path="/online-devices" element={<OnlinePie/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
