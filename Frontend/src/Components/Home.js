import React, { useEffect, useState } from "react";
import DashboardCard from "./cards/index";
import { Container, Row, Col } from "react-bootstrap";
import { FaMobileAlt, FaClock, FaHistory } from "react-icons/fa";
import Navbar from "./Sidebar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();
  const [timeschedule, setTimeschedule] = useState(0);
  const [countHistory, setCountHistory] = useState(0);
  const BaseUrl = window.location.hostname || "localhost";
  const Token = Cookies.get("Device_manager_token");

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
  }, [navigate,BaseUrl,Token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await fetch(
          `http://${BaseUrl}:9090/api/deviceManagerInfo/all`,
          {
            method: "get",
            headers: {
              Authorization: "Bearer " + Token
            },
          }
        );
        const data = await response.json();
        if (data.status === 0) {
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [BaseUrl,Token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://${BaseUrl}:9090/api/deviceManagerAutoDeploy/allAutoDeployData`,
          {
            method: "GET",
            headers: {
              Authorization: Token,
            },
          }
        );
        const data = await response.json();
        setTimeschedule(data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [BaseUrl,Token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://${BaseUrl}:9090/api/deviceManagerHistory/historys`,
          {
            method: "GET",
            headers: {
              Authorization: Token,
            },
          }
        );
        const data = await response.json();
        setCountHistory(data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [BaseUrl,Token]);

  return (
    <>
      <Navbar />
      <Container fluid className="dashboard-container">
        <Row className="justify-content-end">
          <Col md={3}>
            <DashboardCard
              title="Connected devices"
              value="2"
              icon={<FaMobileAlt />}
              color="green"
            />
          </Col>
          <Col md={3}>
            <DashboardCard
              title="Time schedule"
              value={timeschedule}
              icon={<FaClock />}
              color="red"
            />
          </Col>
          <Col md={3}>
            <DashboardCard
              title="Total histories"
              value={countHistory}
              icon={<FaHistory />}
              color="green"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
