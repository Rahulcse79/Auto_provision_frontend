import React from 'react';
import './Shell.css'; // Import CSS for styling (see below)

const Shell = () => {
  const shellOutput = `
    Welcome to React Shell! This is a read-only shell.
    You can customize this to display output from your Linux machine.
    Example commands: ls, pwd, date, echo "Hello, World!"
  `;

  return (
    <div className="shell">
      <div className="shell-header">
        <span className="shell-title">Linux Shell</span>
      </div>
      <div className="shell-body">
        <pre className="shell-output">{shellOutput}</pre>
      </div>
    </div>
  );
};

export default Shell;
