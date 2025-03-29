import React, { useEffect, useState } from "react";
import DashboardCard from "./cards/index";
import { Container, Row, Col } from "react-bootstrap";
import { FaMobileAlt, FaClock, FaHistory } from "react-icons/fa";
import Navbar from "./Sidebar";
import PieChartComponent from "./cards/Piechart";
import Header from "./cards/header";

const Dashboard = ({ nodeServerUrl, springBootServerUrl, Token}) => {

  const [timeschedule, setTimeschedule] = useState(0);
  const [countHistory, setCountHistory] = useState(0);
  const [systemHealth, setSystemHealth] = useState(null);
  const [onlineDevices, setOnlineDevices] = useState(0);

  useEffect(() => {

    const fetchData1 = async () => {
      try {
        let response = await fetch(
          `${springBootServerUrl}/api/deviceManagerInfo/allData`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + Token
            },
          }
        );
        response = await response.json();
        if (response) {
          let count = 0;
          response.forEach((item) => {
            if (item.active) {
              count++;
            }
          });
          setOnlineDevices(count);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchData2 = async () => {
      try {
        const response = await fetch(
          `${springBootServerUrl}/api/deviceManagerAutoDeploy/allAutoDeployData`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + Token
            },
          }
        );
        const data = await response.json();
        setTimeschedule(data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchData3 = async () => {
      try {
        const response = await fetch(
          `${springBootServerUrl}/api/deviceManagerHistory/historys`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + Token
            },
          }
        );
        const data = await response.json();
        setCountHistory(data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchData4 = async () => {
      try {
        const response = await fetch(
          `${nodeServerUrl}/systemHealth`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + Token
            },
          }
        );
        const data = await response.json();

        if (data.status === 0) {
          setSystemHealth(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData1();
    fetchData2();
    fetchData3();

    const intervalId = setInterval(() => {
      fetchData4();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [nodeServerUrl, springBootServerUrl, Token]);

  return (
    <>
      <Navbar />
      <Header Title="Auto Provisioning Dashboard" breadcrumb="/dashboard" />
      <Container fluid className="dashboard-container rows-flex">
        <Row className="dashboard-row column-flex">
          <Col md={3}>
            <DashboardCard
              className="dash-card"
              title="Online devices"
              value={onlineDevices ? onlineDevices : ""}
              color="#8cbed6"
              icon={<FaMobileAlt />}
            />
          </Col>
          <Col md={3}>
            <DashboardCard
              className="dash-card"
              title="Time schedule"
              value={timeschedule ? timeschedule : ""}
              color="#8cbed6"
              icon={<FaClock />}
            />
          </Col>
          <Col md={3}>
            <DashboardCard
              className="dash-card"
              title="Total histories"
              value={countHistory ? countHistory : ""}
              color="#8cbed6"
              icon={<FaHistory />}
            />
          </Col>
        </Row>

        <Row className="dashboard-row">
          <Col md={3}>
            {systemHealth !== null && (
              <PieChartComponent
                memUsage={systemHealth.data.totalCpu}
                title={<span style={{ color: 'white' }}>CPU Usage</span>}
                used="CPU Used"
                unused="CPU Unused"
              />
            )}
          </Col>
          <Col md={3}>
            {systemHealth !== null && (
              <PieChartComponent
                memUsage={systemHealth.data.diskUsage.diskUsage}
                title={<span style={{ color: 'white' }}>Disk Usage</span>}
                used="Disk Used"
                unused="Disk Unused"
              />
            )}
          </Col>
          <Col md={3}>
            {systemHealth !== null && (
              <PieChartComponent
                memUsage={systemHealth.data.ramUsage.memUsage}
                title={<span style={{ color: 'white' }}>RAM Usage</span>}
                used="RAM Used"
                unused="RAM Unused"
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
