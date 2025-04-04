import React, { useState } from "react";
import Navbar from "./Sidebar";
import Header from "./cards/header";
import { faDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Fault({ springBootServerUrl, Token }) {

  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData2 = async () => {

    try {
      const response = await fetch(
        `${springBootServerUrl}/api/deviceManager/listDevices`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + Token,
          },
        }
      );
      const data = await response.json();
      if (data.status === 0) {
        const formattedData = JSON.parse(data.message);
        const transformedData = formattedData.map(item => ({
          _id: item._id,
          metadata: {
            fileType: item['metadata.fileType'] || 'N/A',
            oui: item['metadata.oui'] || 'N/A',
            productClass: item['metadata.productClass'] || 'N/A',
            version: item['metadata.version'] || 'N/A',
          }
        }));
        await setApiData(transformedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData2();

  const handleDownload = async (FileName) => {

    try {
      const response = await fetch(
        `${springBootServerUrl}/api/deviceManager/download_file`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + Token,
            FileName: FileName,
          },
        }
      );
      const data = await response.json();
      if (data.status === 0) {
        const fileData = data.fileData;
        const byteCharacters = atob(fileData);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const textDecoder = new TextDecoder("utf-8");
        textDecoder.decode(byteArray);
        const blob = new Blob([byteArray], {
          type: "application/octet-stream",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", FileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        alert("File downloaded successfully.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (FileName) => {

    setIsLoading(true);
    try {
      const response = await fetch(
        `${springBootServerUrl}/api/deviceManager/delete_file`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + Token,
            FileName: FileName,
          },
        }
      );
      const data = await response.json();
      if (data.status === 0) {
        alert("File delete successfully.");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error delete data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Header Title="Listing_file" breadcrumb="/Listing-file" />
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
                <th>FileType</th>
                <th>Oui</th>
                <th>ProductClass</th>
                <th>Version</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {apiData.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item._id || "N/A"}</td>
                    <td>{item.metadata ? item.metadata.fileType : "N/A"}</td>
                    <td>{item.metadata.oui || "N/A"}</td>
                    <td>{item.metadata.productClass || "N/A"}</td>
                    <td>{item.metadata.version || "N/A"}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faDownload}
                        style={{ cursor: "pointer", color: "green" }}
                        onClick={() => handleDownload(item._id)}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{
                          cursor: "pointer",
                          color: "red",
                          marginLeft: "10px",
                        }}
                        onClick={() => handleDelete(item._id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ marginBottom: "50px" }}>
            {apiData.length === 0 && (
              <span style={{ color: "red" }}>
                No data present, the table will be empty.
              </span>
            )}
          </div>
        </div>
      </form>

      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div style={{ color: "white", fontSize: "30px", display: "flex", alignItems: "center" }}>
            <AiOutlineLoading3Quarters
              style={{
                animation: "spin 2s linear infinite",
                marginRight: "10px",
              }}
            />
            Please wait... while we are saving the data.
          </div>
        </div>
      )}
    </>
  );
}
