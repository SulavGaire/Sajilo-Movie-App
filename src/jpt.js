import React, { useState } from "react";

function App() {
  // Define the possible modes as constants
  const MODE_BALANCED = "balanced";
  const MODE_CREATIVE = "creative";
  const MODE_PRECISE = "precise";

  // Initialize the state variable with the default mode
  const [mode, setMode] = useState(MODE_BALANCED);

  // Define a function to handle mode change
  const handleModeChange = (event) => {
    // Get the value of the selected option
    const selectedMode = event.target.value;
    // Update the state variable with the new mode
    setMode(selectedMode);
  };

  return (
    <div className="App">
      <h1>Toggle between three modes in React JS</h1>
      <p>The current mode is: {mode}</p>
      <p>Select a mode:</p>
      <select value={mode} onChange={handleModeChange}>
        <option value={MODE_BALANCED}>Balanced</option>
        <option value={MODE_CREATIVE}>Creative</option>
        <option value={MODE_PRECISE}>Precise</option>
      </select>
      <div className="ModeComponent">
        {/* Use a ternary operator to render the component based on the mode */}
        {mode === MODE_BALANCED ? (
          <BalancedComponent />
        ) : mode === MODE_CREATIVE ? (
          <CreativeComponent />
        ) : (
          <PreciseComponent />
        )}
      </div>
    </div>
  );
}

// Define the components for each mode
function BalancedComponent() {
  return <div>This is the balanced component</div>;
}

function CreativeComponent() {
  return <div>This is the creative component</div>;
}

function PreciseComponent() {
  return <div>This is the precise component</div>;
}

export default App;
