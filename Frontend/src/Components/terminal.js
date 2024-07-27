import React from "react";

const Shell = ({ commandNumber }) => {
  const shellOutput = `Welcome to auto provisioning Shell! This is a read-only shell.`;

  const shellOutputOfConfigLinux = `Linux machine config done.`;

  return (
    <div className="shell">
      <div className="shell-header">
        <span className="shell-title">Auto provisioning shell</span>
      </div>
      <div className="shell-body">
        <pre className="shell-output">{commandNumber === "41" ? shellOutputOfConfigLinux : shellOutput}</pre>
      </div>
    </div>
  );
};

export default Shell;
