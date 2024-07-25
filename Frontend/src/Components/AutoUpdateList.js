import React, { useEffect, useState } from "react";
import Navbar from "./Sidebar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AutoUpdate() {
  const [apiData, setApiData] = useState([]);
  const [apiFailData, setFailApiData] = useState([]);
  const navigate = useNavigate();
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
  }, [navigate, BaseUrl, Token]);

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
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const currentDate = new Date();
        
        const filteredData = data.filter(item => {
          const [day, month, year] = item.date.split('/');
          const [hour, minute] = item.time.split(':');
          const itemDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);
          const twentyFourHoursAgo = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
          return itemDate < twentyFourHoursAgo;
        });
  
        setFailApiData(filteredData);
        setApiData(data.filter(item => !filteredData.includes(item)));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [BaseUrl, Token, setApiData, setFailApiData]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://${BaseUrl}:9090/api/deviceManagerAutoDeploy/deleteAutoDeployData/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
           Authorization: Token,
        },
      });
      if (response.ok) {
        alert(`Item with ID ${id} deleted successfully.`);
        window.location.reload();
      } else {
        alert(`Failed to delete item with ID ${id}.`);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item. Please try again.');
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Navbar style={{ width: "250px" }} />
      <div style={{ marginLeft: "250px", padding: "20px" }}>
        <div>
          <h3 style={{color:"#2b2b2b"}}>Successful auto provisioning list</h3>
          <form className="Textlight212232 Textlight">
            <div className="form-group902232">
              <table className="styled-table2232">
                <thead>
                  <tr>
                    <th>Serial no.</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>File type</th>
                    <th>MAC address</th>
                    <th>File name</th>
                    <th>Product class</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {apiData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.date}</td>
                      <td>{item.time}</td>
                      <td>{item.fileFormat}</td>
                      <td>{item.macAddress}</td>
                      <td>{item.fileName}</td>
                      <td>{item.productClass}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ cursor: "pointer", color: "red" }}
                          onClick={() => handleDelete(item.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </form>
        </div>

        <div>
          <h3 style={{color:"#2b2b2b"}}>Fail auto provisioning list</h3>
          <form className="Textlight212232 Textlight">
            <div className="form-group902232">
              <table className="styled-table2232">
                <thead>
                  <tr>
                    <th>Serial no.</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>File type</th>
                    <th>MAC address</th>
                    <th>File name</th>
                    <th>Product class</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {apiFailData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.date}</td>
                      <td>{item.time}</td>
                      <td>{item.fileFormat}</td>
                      <td>{item.macAddress}</td>
                      <td>{item.fileName}</td>
                      <td>{item.productClass}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ cursor: "pointer", color: "red" }}
                          onClick={() => handleDelete(item.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
