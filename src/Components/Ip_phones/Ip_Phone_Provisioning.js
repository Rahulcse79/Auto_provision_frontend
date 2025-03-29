import React, { useState } from "react";
import Navbar from "../Sidebar";
import Form from "react-bootstrap/Form";
import Header from "../cards/header";
import Sipserver from "../Ip_phones/Sipserver";
import Tabs from "../cards/Tabs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const IpPhoneProvisioning = ({ springBootServerUrl, Token }) => {

  const [activeTab, setActiveTab] = useState("Account Settings");
  const [AddMacAddress, setAddMacAddress] = useState([]);
  const [MacAddress, setMacAddress] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const RebootCall = async () => {
    if (MacAddress !== "") {
      AddMacAddress.push({ MacAddress: MacAddress });
    }
    if (AddMacAddress.length === 0) {
      alert("At least one MAC address is required.");
      return;
    }
    setIsLoading(true);
    const FormatedDataAddMacAddress = await AddMacAddress.map(
      (item) => item.MacAddress
    );
    try {

      let result = await fetch(
        `${springBootServerUrl}/api/deviceManager/rebootBulk`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Token,
          },
          body: JSON.stringify(FormatedDataAddMacAddress),
        }
      );
      result = await result.json();
      if (result.status === 0) {
        alert("Devices rebooted successfully.");
      } else {
        alert("Failed to reboot devices.");
      }
    } catch (error) {
      alert("Server error, please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const ResetCall = async () => {
    const confirmed = window.confirm("Are you sure you want to reset your phone?");
    if (!confirmed) {
      return;
    }
    if (MacAddress !== "") {
      AddMacAddress.push({ MacAddress: MacAddress });
    }
    if (AddMacAddress.length === 0) {
      alert("At least one MAC address is required.");
      return;
    }
    setIsLoading(true);
    const FormatedDataAddMacAddress = await AddMacAddress.map(
      (item) => item.MacAddress
    );
    console.log(FormatedDataAddMacAddress);
    try {

      let result = await fetch(
        `${springBootServerUrl}/api/deviceManager/resetBulk`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Token,
          },
          body: JSON.stringify(FormatedDataAddMacAddress),
        }
      );
      result = await result.json();
      if (result.status === 0) {
        alert("Devices reset successfully.");
      } else {
        alert("Failed to reset devices.");
      }
    } catch (error) {
      alert("Server error, please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
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
    setIsLoading(true);
    try {

      let formData = new FormData();
      formData.append("file", selectedFile);
      const fileExtension = selectedFile.name.split(".").pop();
      const fileName = `cfg${MacAddress}.${fileExtension}`;
      let result = await fetch(
        `${springBootServerUrl}/api/deviceManager/uploadConfig/${MacAddress}`,
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
    } finally {
      setIsLoading(false);
    }
  };

  const CallOfUpdateConfig = async () => {
    if (MacAddress === "") {
      alert("MacAddress is required.");
      return;
    }
    setIsLoading(true);
    try {

      let result = await fetch(
        `${springBootServerUrl}/api/deviceManager/updateConfig/${MacAddress}`,
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
    } finally {
      setIsLoading(false);
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
    setIsLoading(true);
    try {

      let formData = new FormData();
      formData.append("file", selectedFile);
      const fileExtension = selectedFile.name.split(".").pop();
      const extensionName = `${fileExtension}`;
      let result = await fetch(
        `${springBootServerUrl}/api/deviceManager/uploadFirmware/${MacAddress}`,
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
    } finally {
      setIsLoading(false);
    }
  };

  const CallOfUpdateFirmware = async () => {
    if (MacAddress === "") {
      alert("MacAddress is required.");
      return;
    }
    setIsLoading(true);
    try {

      let result = await fetch(
        `${springBootServerUrl}/api/deviceManager/updateFirmware/${MacAddress}`,
        {
          method: "get",
          headers: {
            Authorization: "Bearer " + Token,
          },
        }
      );
      result = await result.json();
      if (result.status === 0) {
        alert(`Firmware file update successfully for ${MacAddress}`);
      } else {
        alert("Failed to update firmware file. Error: " + result.message);
      }
    } catch (error) {
      alert("Error updating firmware file. Please try again.");
      console.error("Error uploading file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addIpAddress = () => {
    setAddMacAddress([...AddMacAddress, { MacAddress: "" }]);
  };

  const handleInputChange = (index, value) => {
    const newAddMacAddress = [...AddMacAddress];
    newAddMacAddress[index] = { MacAddress: value };
    setAddMacAddress(newAddMacAddress);
  };

  const removeAddMacAddress = (index) => {
    const newAddMacAddress = AddMacAddress.filter((_, i) => i !== index);
    setAddMacAddress(newAddMacAddress);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Account Settings":
        return (
          <>
            <Sipserver springBootServerUrl={springBootServerUrl} Token={Token} />
          </>
        );
      case "Manage device":
        return (
          <div className="ip-phone-container"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: "30px",
            }}
          >
            <div className="ip-phone-container">
              <form
                className="ip-phone-form"
                style={{ marginBottom: "50px" }}
                onSubmit={handleSubmit}
              >
                <div className="black-boxinner" style={{ width: "655px" }}>
                  <h3>IP Phone</h3>
                  <div className="Form-ip-provisioning">
                    <input
                      type="text"
                      id="MacAddress"
                      className="ip-mac-input"
                      value={MacAddress}
                      onChange={(e) => setMacAddress(e.target.value)}
                      placeholder="Enter MacAddress."
                      required
                    />

                    <div className="btn-group">
                      <button type="button" onClick={RebootCall} className="button">
                        Reboot
                      </button>
                      <button type="button" onClick={ResetCall} className="button">
                        Reset
                      </button>
                      <button
                        type="button"
                        style={{ fontSize: "11px" }}
                        className="button"
                        onClick={addIpAddress}
                      >
                        Add Mac Address +
                      </button>
                    </div>
                  </div>

                  {AddMacAddress.map((item, index) => (
                    <div className="addMacForm" key={index}>
                      <label htmlFor={`MacAddress-${index}`}>
                        Enter Mac Address {index + 2}
                      </label>
                      <div className="addMacAddress">
                        <input
                          type="text"
                          id={`MacAddress-${index}`}
                          value={item.ipAddress}
                          onChange={(e) => handleInputChange(index, e.target.value)}
                          placeholder="Enter Mac address"
                          required
                        />
                        {index > -1 && (
                          <button
                            type="button"
                            onClick={() => removeAddMacAddress(index)}
                            style={{ marginLeft: "10px" }}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))}</div>

                <hr className="config-hr" />
                <div className="config-section">
                  <p style={{ color: "red" }}>
                    Note: vendor configuration file and Firmware Upgrade currently
                    can not support bulk provision it will take only 1st
                    macAddress
                  </p>
                  <div className="black-boxinner" style={{ width: "655px" }}>
                    <h5>Vendor Configuration File</h5>
                    <br />
                    <div className="Form-ip-provisioning">
                      <Form.Group controlId="formFileDisabled" className="mb-3">
                        <Form.Control type="file" onChange={handleFileChange} />
                        {selectedFile && <p>{selectedFile.name}</p>}
                      </Form.Group>

                      <button
                        type="button"
                        className="button"
                        onClick={CallOfUploadConfig}
                      >
                        Upload
                      </button>
                      <button
                        type="button"
                        className="button"
                        onClick={CallOfUpdateConfig}
                      >
                        Update
                      </button>
                    </div>
                  </div></div>
                <div className="black-boxinner" style={{ width: "655px" }}>
                  <hr className="config-hr" />
                  <div className="config-section">
                    <h5>Firmware Upgrade</h5>
                    <br />
                    <div className="Form-ip-provisioning">
                      <Form.Group controlId="formFileDisabled" className="mb-3">
                        <Form.Control type="file" onChange={handleFileChange} />
                        {selectedFile && <p>{selectedFile.name}</p>}
                      </Form.Group>

                      <button
                        type="button"
                        className="button"
                        onClick={CallOfUploadFirmware}
                      >
                        Upload
                      </button>
                      <button
                        type="button"
                        className="button"
                        onClick={CallOfUpdateFirmware}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
      default:
        return <div>Select a tab to view content</div>;
    }
  };


  return (
    <>
      <Navbar />
      <Header Title="IP Phones Provisioning" breadcrumb="/IP phone/IP2LG" />
      <div className="tabs-container">
        <Tabs
          tabs={["Account Settings", "Manage device"]}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      {renderTabContent()}

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
            Please wait... while we are retrieving the data.
          </div>
        </div>
      )}
    </>
  );
};

export default IpPhoneProvisioning;
