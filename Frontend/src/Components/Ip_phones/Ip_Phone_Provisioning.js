import React, { useEffect, useState } from "react";
import Navbar from "../Sidebar";
import Reboot from "../Image/reboot.png";
import Reset from "../Image/reset.png";
import Update from "../Image/FileUpdate.jpeg";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

const IpPhoneProvisioning = () => {

  const [MacAddress, setMacAddress] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const BaseUrl = window.location.hostname || "localhost";
  const Token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiYXV0aE1ldGhvZCI6ImxvY2FsIiwiaWF0IjoxNzIxMDI2MzI5fQ.qgzAeeRUQ7YCWQKXBnDsTNwkSe4SNswx6G1NYlB3Csc";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Token = Cookies.get("Device_manager_token");
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
  }, [navigate, BaseUrl]);

  const RebootCall = async () => {
    if (MacAddress === "") {
      alert("MacAddress is required.");
      return;
    }
    try {
      let result = await fetch(
        `http://${BaseUrl}:9090/api/deviceManager/reboot/${MacAddress}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Token,
          },
        }
      );
      result = await result.json();
      if (result.status === 0) {
        alert("Device rebooted - " + MacAddress);
      } else {
        alert("MacAddress wrong or invalid token.");
      }
    } catch (error) {
      alert("Server error, please try again.");
      console.error(error);
    }
  };

  const ResetCall = async () => {
    if (MacAddress === "") {
      alert("MacAddress is required.");
      return;
    }
    try {
      let result = await fetch(
        `http://${BaseUrl}:9090/api/deviceManager/reset/${MacAddress}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Token,
          },
        }
      );
      result = await result.json();
      console.log(result);
      if (result.status === 0) {
        alert("Device reset - " + MacAddress);
      } else {
        alert("MacAddress wrong or invalid token.");
      }
    } catch (error) {
      alert("Server error, please try again.");
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const CallOfUploadConfig = async () => {
    if (MacAddress === "") {
      alert("MacAddress is required.");
      return;
    } else if (selectedFile == null) {
      alert("Select configuration file.");
      return;
    }
    try {
      let formData = new FormData();
      formData.append("file", selectedFile);
      const fileExtension = selectedFile.name.split(".").pop();
      const fileName = `cfg${MacAddress}.${fileExtension}`;
      let result = await fetch(
        `http://${BaseUrl}:9090/api/deviceManager/uploadConfig/${MacAddress}`,
        {
          method: "post",
          headers: {
            Authorization: "Bearer " + Token,
            fileName: fileName,
          },
          body: formData,
        }
      );
      result = await result.json();
      if (result.status === 0) {
        alert(`Configuration file uploaded successfully for ${MacAddress}`);
      } else {
        alert("Failed to upload configuration file. Error: " + result.message);
      }
    } catch (error) {
      alert("Error uploading configuration file. Please try again.");
      console.error("Error uploading file:", error);
    }
  };

  const CallOfUpdateConfig = async () => {
    if (MacAddress === "") {
      alert("MacAddress is required.");
      return;
    }
    try {
      let result = await fetch(
        `http://${BaseUrl}:9090/api/deviceManager/updateConfig/${MacAddress}`,
        {
          method: "get",
          headers: {
            Authorization: "Bearer " + Token,
          },
        }
      );
      result = await result.json();
      if (result.status === 0) {
        alert(`Configuration file update successfully for ${MacAddress}`);
      } else {
        alert("Failed to update configuration file. Error: " + result.message);
      }
    } catch (error) {
      alert("Error updating configuration file. Please try again.");
      console.error("Error uploading file:", error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const CallOfUploadFirmware = async () => {
    if (MacAddress === "") {
      alert("MacAddress is required.");
      return;
    } else if (selectedFile == null) {
      alert("Select firmware file.");
      return;
    }
    try {
      let formData = new FormData();
      formData.append("file", selectedFile);
      const fileExtension = selectedFile.name.split(".").pop();
      const extensionName = `${fileExtension}`;
      let result = await fetch(
        `http://${BaseUrl}:9090/api/deviceManager/uploadFirmware/${MacAddress}`,
        {
          method: "put",
          headers: {
            Authorization: "Bearer " + Token,
            extensionName: extensionName,
          },
          body: formData,
        }
      );
      result = await result.json();
      if (result.status === 0) {
        alert(`Firmware file uploaded successfully for ${MacAddress}`);
      } else {
        alert("Failed to upload firmware file. Error: " + result.message);
      }
    } catch (error) {
      alert("Error uploading firmware file. Please try again.");
      console.error("Error uploading file:", error);
    }
  };

  const CallOfUpdateFirmware = async () => {
    if (MacAddress === "") {
      alert("MacAddress is required.");
      return;
    }
    try {
      let result = await fetch(
        `http://${BaseUrl}:9090/api/deviceManager/updateFirmware/${MacAddress}`,
        {
          method: "get",
          headers: {
            Authorization: "Bearer " + Token,
          },
        }
      );
      result = await result.json();
      if (result.status === 0) {
        alert(`FirmWare file update successfully for ${MacAddress}`);
      } else {
        alert("Failed to update firmWare file. Error: " + result.message);
      }
    } catch (error) {
      alert("Error updating firmWare file. Please try again.");
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container21">
        <form className="login-form21" onSubmit={handleSubmit}>
          <h2>Enter MacAddress</h2>
          <div className="form-control21">
            <input
              type="text"
              id="MacAddress"
              value={MacAddress}
              onChange={(e) => setMacAddress(e.target.value)}
              placeholder="Enter MacAddress."
              required
            />
          </div>
        </form>
      </div>

      <div className="IpPhoneBlock">
        <div>
          <img src={Reboot} alt="loding.." className="RebootCss" />
          <button
            type="button"
            onClick={RebootCall}
            className="btn btn-primary"
          >
            Reboot
          </button>
        </div>

        <div>
          <img src={Reset} alt="loding.." className="RebootCss" />
          <button type="button" onClick={ResetCall} className="btn btn-primary">
            Reset
          </button>
        </div>

        <div className="ConfigurationPart">
          <h3>Vendor Configuration File</h3>

          <div>
            <Form.Group controlId="formFileDisabled" className="mb-3">
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <button
              type="button"
              className="btn btn-primary"
              onClick={CallOfUploadConfig}
            >
              Upload
            </button>
          </div>

          <div>
            <img src={Update} alt="Loading..." className="RebootCss" />
            <button
              type="button"
              className="btn btn-primary"
              onClick={CallOfUpdateConfig}
            >
              Update
            </button>
          </div>
        </div>

        <div className="ConfigurationPart">
          <h3>Firmware Upgrade Image</h3>
          <div>
            <Form.Group controlId="formFileDisabled" className="mb-3">
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <button
              type="button"
              className="btn btn-primary"
              onClick={CallOfUploadFirmware}
            >
              Upload
            </button>
          </div>
          <div>
            <img src={Update} alt="loding.." className="RebootCss" />
            <button
              type="button"
              className="btn btn-primary"
              onClick={CallOfUpdateFirmware}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default IpPhoneProvisioning;
