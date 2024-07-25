import React, { useState, useEffect } from "react";
import Navbar from "./Sidebar";
import Cookies from "js-cookie";
import { faTrash, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function History() {
  const [apiData, setApiData] = useState([]);
  const BaseUrl = window.location.hostname || "localhost";
  const Token = Cookies.get("Device_manager_token");
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://${BaseUrl}:9090/api/deviceManagerHistory/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert(`Item with ID ${id} deleted successfully.`);
        window.location.reload();
      } else {
        alert(`Failed to delete item with ID ${id}.`);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item. Please try again.");
    }
  };

  const handleDownload = async (id) => {
    try {
      const response = await fetch(
        `http://${BaseUrl}:9090/api/deviceManagerHistory/history/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Token,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`Failed to fetch file with ID ${id}.`);
      }
  
      // Parse the JSON response
      const data = await response.json();
  
      // Extract file information
      const fileName = data.fileName;
      const fileData = data.files; // Assuming this is the file content
  
      // Example: Create a Blob object from fileData (assuming it's base64 data)
      const blob = new Blob([fileData], { type: "application/octet-stream" });
  
      // Create a temporary URL to the blob object
      const url = window.URL.createObjectURL(blob);
  
      // Create a link element
      const link = document.createElement("a");
      link.href = url;
  
      // Set the filename on the link
      link.setAttribute("download", fileName);
  
      // Append the link to the body
      document.body.appendChild(link);
  
      // Programmatically click the link to trigger the download
      link.click();
  
      // Clean up: remove the link and revoke the URL object
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
  
    } catch (error) {
      console.error("Error fetching or downloading file:", error);
      alert("Failed to download file. Please try again.");
    }
  };  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${BaseUrl}:3000/checkAuth`, {
          method: "get",
          headers: {
            Authorization: "Bearer " + Token,
          },
        });
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
          `http://${BaseUrl}:9090/api/deviceManagerHistory/historys`,
          {
            method: "GET",
            headers: {
              Authorization: Token,
            },
          }
        );
        const data = await response.json();
        setApiData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [BaseUrl, Token]);

  return (
    <>
      <Navbar />
      <div className="Textlight">Histroy</div>
      <form className="Textlight212232 Textdark">
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
                <th>Version</th>
                <th>Download file / Delete</th>
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
                  <td>{item.version}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faDownload}
                      style={{ cursor: "pointer", color: "green" }}
                      onClick={() => handleDownload(item.id)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{
                        cursor: "pointer",
                        color: "red",
                        marginLeft: "10px",
                      }}
                      onClick={() => handleDelete(item.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </>
  );
}
