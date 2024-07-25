import React, {useState} from "react";
import { Nav, Accordion, Card, useAccordionButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faHome,faChevronRight, faLaptop, faCog, faServer, faClock, faHistory, faBug } from '@fortawesome/free-solid-svg-icons';
import LogoImage from './Image/logoDark.png';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Cookies from 'js-cookie';

const CustomToggle = ({ children, eventKey, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const decoratedOnClick = useAccordionButton(eventKey, () => setIsOpen(!isOpen));

  return (
    <div onClick={decoratedOnClick} className="accordion-toggle">
      <FontAwesomeIcon icon={icon} className="mr-2" />
      {children}
      <FontAwesomeIcon icon={isOpen ? faChevronDown : faChevronRight} className="ml-auto" />
    </div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();

  const openPage = (path) => () => navigate(path);
  const BaseUrl = window.location.hostname || "localhost";

  const openOnlineStatus = () => {
    window.location.href = `http://${BaseUrl}/device-manager/#!/overview`;
  };

  const ListingDevices = () => {
    window.location.href = `http://${BaseUrl}/device-manager/#!/devices`;
  };

  const ViewFileUpload = () => {
    window.location.href = `http://${BaseUrl}/device-manager/#!/admin/files`;
  };

  const OpenFaultLog = () => {
    window.location.href = `http://${BaseUrl}/device-manager/#!/faults`;
  }

  const openTimeSchedule = () => {
    navigate("/time-schedule");
  }

  const openAutoUpdateList = () => {
    navigate("/auto-update");
  }

  const OpenIP2LG = () => {
    navigate('/ip-phone-provisioning');
  }

  const OpenLinuxProvisioning = () => {
    navigate("/linux-provisioning");
  }

  const OpenLinuxSipServer = () => {
    navigate("/sip-server");
  }

  const logOutCall = async () => {
    await Cookies.remove("session");
    navigate("/log-in");
  };

  const openHome = () => {
    navigate("/");
  }

  const openSetting = () =>{
    navigate("/system-setting");
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={LogoImage} alt="Coral" className="sidebar-logo" />
      </div>

      <Accordion defaultActiveKey="0" className="flex-column" style={{ marginTop: '20px' }}>
      <Card>
          <CustomToggle eventKey="12" icon={faHome}>Home</CustomToggle>
          <Accordion.Collapse eventKey="12">
            <Nav className="flex-column">
              <Nav.Link href="#" onClick={openHome} style={{ color: 'black' }}>Home</Nav.Link>
            </Nav>
          </Accordion.Collapse>
        </Card>
        <Card>
          <CustomToggle eventKey="0" icon={faLaptop}>Devices</CustomToggle>
          <Accordion.Collapse eventKey="0">
            <Nav className="flex-column">
              <Nav.Link href="#" onClick={openOnlineStatus} style={{ color: 'black' }}>Online Status</Nav.Link>
              <Nav.Link href="#" onClick={ListingDevices} style={{ color: 'black' }}>Listing Devices</Nav.Link>
              <Nav.Link href="#" onClick={ViewFileUpload} style={{ color: 'black' }}>File Upload</Nav.Link>
            </Nav>
          </Accordion.Collapse>
        </Card>

        <Card>
          <CustomToggle eventKey="1" icon={faServer}>Device Management</CustomToggle>
          <Accordion.Collapse eventKey="1">
            <Accordion>
              <Card>
                <CustomToggle eventKey="3">Ip-phones</CustomToggle>
                <Accordion.Collapse eventKey="3">
                  <Nav className="flex-column">
                    <Nav.Link href="#" onClick={OpenIP2LG} style={{ color: 'black' }}>IP2LG</Nav.Link>
                  </Nav>
                </Accordion.Collapse>
                <CustomToggle eventKey="2">Servers</CustomToggle>
                <Accordion.Collapse eventKey="2">
                  <Nav className="flex-column">
                    <Nav.Link href="#"  style={{ color: 'black' }} onClick={OpenLinuxSipServer}>SIP Server</Nav.Link>
                    <Nav.Link href="#"  style={{ color: 'black' }} onClick={OpenLinuxProvisioning}>5G Core</Nav.Link>
                    <Nav.Link href="#"  style={{ color: 'black' }}>IoT Server</Nav.Link>
                  </Nav>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Accordion.Collapse>
        </Card>

        <Card>
          <CustomToggle eventKey="3" icon={faClock}>Scheduling</CustomToggle>
          <Accordion.Collapse eventKey="3">
            <Nav className="flex-column">
              <Nav.Link href="#" onClick={openTimeSchedule} style={{ color: 'black' }}>Time Schedule</Nav.Link>
              <Nav.Link href="#" onClick={openAutoUpdateList} style={{ color: 'black' }}>Auto Update List</Nav.Link>
            </Nav>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Nav.Link href="#" onClick={openPage("/history")} className="accordion-link">
            <FontAwesomeIcon icon={faHistory} className="mr-2" />
            History
          </Nav.Link>
        </Card>
        
        <Card>
          <Nav.Link href="#" onClick={OpenFaultLog} className="accordion-link">
            <FontAwesomeIcon icon={faBug} className="mr-2" />
            Fault Log
          </Nav.Link>
        </Card>
        <Card>
            <Nav.Link href="#" className="accordion-link" onClick={openSetting}>
                <FontAwesomeIcon icon={faCog} className="mr-2" />
                System Settings
            </Nav.Link>
            <Nav.Link href="#" className="accordion-link" onClick={logOutCall}>
            <ExitToAppIcon />
            Log Out
          </Nav.Link>
        </Card>
      </Accordion>
    </div>
  );
};

export default Navbar;
