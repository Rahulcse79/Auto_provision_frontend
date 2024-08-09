import React, { useState, useEffect } from "react";
import Navbar from "./Sidebar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Header from "./cards/header";

export default function Fault() {

  const [apiData, setApiData] = useState([]);
  const BaseUrlSpring = process.env.REACT_APP_API_SPRING_URL || "localhost";
  const PORTSpring = process.env.REACT_APP_API_SPRING_PORT || "9090";
  const BaseUrlTr069 = process.env.REACT_APP_API_tr069_URL || "localhost";
  const PORTTr069 = process.env.REACT_APP_API_tr069_PORT || "3000";
  const CookieName = process.env.REACT_APP_COOKIENAME || "session";
  const Token = Cookies.get(CookieName);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Token) navigate("/log-in");
    const fetchData = async () => {
      try {
        const TokenData = JSON.parse(Token);
        const response = await fetch(
          `http://${BaseUrlTr069}:${PORTTr069}/checkAuth`,
          {
            method: "post",
            headers: {
              Authorization: "Bearer " + TokenData.AuthToken,
            },
          }
        );
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

    const fetchData2 = async () => {
      const TokenData = JSON.parse(Token);
      try {
        const response = await fetch(
          `http://${BaseUrlSpring}:${PORTSpring}/api/deviceManager/listDevices`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + TokenData.AuthToken,
            },
          }
        );
        const data = await response.json();
        if (data.status === 0) {
          const formattedData = JSON.parse(data.message);
          await setApiData(formattedData);
         
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData2();
  }, [
    navigate,
    setApiData,
    apiData,
    BaseUrlSpring,
    PORTSpring,
    BaseUrlTr069,
    PORTTr069,
    Token,
  ]);

  return (
    <>
      <Navbar />
      <Header Title="File_upload" breadcrumb="/File-upload" />
      <form
        className="history-list"
        style={{ marginLeft: "240px", marginRight: "40px" }}
      >
        <div className="form-group902232">
          <table className="styled-table2232">
            <thead>
              <tr>
                <th>Serial no.</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {apiData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item._id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </>
  );
}
