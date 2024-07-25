import React, { useState } from 'react';


const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [pcSold, setPcSold] = useState(false); // State to track if PC is sold

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Process the input command
    if (input.trim().toLowerCase() === 'sell pc') {
      if (pcSold) {
        setOutput(output + '> PC has already been sold.\n');
      } else {
        setOutput(output + '> PC sold successfully!\n');
        setPcSold(true);
      }
    } else {
      // Echo back the input for other commands
      setOutput(output + '> ' + input + '\n');
    }
    setInput('');
  };

  return (
    <div className="terminal">
      <div className="terminal-output">
        <pre>{output}</pre>
      </div>
      <form onSubmit={handleFormSubmit} className="terminal-input">
        <span>$</span>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          autoFocus
          autoComplete="off"
        />
      </form>
    </div>
  );
};

export default Terminal;
