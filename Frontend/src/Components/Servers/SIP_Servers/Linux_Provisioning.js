import React, { useEffect, useState } from "react";
import Navbar from "../../Sidebar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LinuxProvisioning = () => {
  const navigate = useNavigate();
  const BaseUrl = window.location.hostname || "localhost";
  const Token = Cookies.get("Device_manager_token");

  const [ipAddresses, setIpAddresses] = useState([""]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${BaseUrl}:3000/checkAuth`, {
          method: "GET",
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

  const handleInputChange = (index, value) => {
    const updatedIpAddresses = [...ipAddresses];
    updatedIpAddresses[index] = value;
    setIpAddresses(updatedIpAddresses);
  };

  const addIpAddress = () => {
    setIpAddresses([...ipAddresses, ""]);
  };

  const removeIpAddress = (index) => {
    const updatedIpAddresses = [...ipAddresses];
    updatedIpAddresses.splice(index, 1);
    setIpAddresses(updatedIpAddresses);
  };

  const transformedData = async (ipAddresses) => {
    try {
        const formattedArray = ipAddresses.map(ip => ({
            ip: ip,
            port: 3022
        }));
    
        return formattedArray;
    } catch (error) {
        console.error("Error transforming data:", error);
        throw error;
    }
};


  const RebootCall = async () => {
    try {
      if (ipAddresses.length === 0) {
        alert("At least one IP address is required.");
        return;
      }

      const transformedIpAddresses = await transformedData(ipAddresses);
      console.log("Transformed IP addresses:", transformedIpAddresses);

      const response = await fetch(
        `http://${BaseUrl}:5090/api/devicemanager/linux/reboot`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Token,
          },
          body: JSON.stringify({ devices: transformedIpAddresses }), // Send devices array
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Devices rebooted:", data.results);
      if (data.status === 0) {
        console.log("Reboot Linux machines successful.");
      } else {
        console.log("Reboot Linux machines API fail.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const SendFile = async () => {
    try {
      if (ipAddresses.length === 0) {
        alert("At least one IP address is required.");
        return;
      }
      const transformedIpAddresses = await transformedData(ipAddresses);
      console.log("Transformed IP addresses:", transformedIpAddresses.devices);
      const response = await fetch(
        `http://${BaseUrl}:5090/api/devicemanager/linux/filesend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Token,
          },
          body: JSON.stringify({ devices: transformedIpAddresses.devices }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Devices file send:", data.results);
      if (data.status === 0) {
        console.log("File send Linux machines successful.");
      } else {
        console.log("File send Linux machines API fail.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <form className="Textlight21">
          {ipAddresses.map((ipAddress, index) => (
            <div className="form-group90" key={index}>
              <label htmlFor={`ipAddress-${index}`}>
                IP Address <span style={{ color: "red" }}>*</span>
              </label>
              <div style={{ display: "flex" }}>
                <input
                  type="text"
                  id={`ipAddress-${index}`}
                  value={ipAddress}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  placeholder="Enter IP address"
                  required
                />
                {index > 0 && (
                  <button
                    type="button"
                    className="button21"
                    onClick={() => removeIpAddress(index)}
                    style={{ marginLeft: "10px", height: "35px" }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="form-group90">
            <button type="button" className="button21" onClick={addIpAddress}>
              + Add IP Address
            </button>
          </div>

          <div className="form-group90">
            <button type="button" className="button21" onClick={RebootCall}>
              Reboot
            </button>
          </div>
          <div className="form-group90">
            <button type="button" className="button21" onClick={SendFile}>
              Send configuration file
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LinuxProvisioning;