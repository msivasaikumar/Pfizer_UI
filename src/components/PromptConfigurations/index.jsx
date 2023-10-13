import React, { useState } from "react";
import "./index.scss"; // Import the CSS file for the component

function PromptConfigurations({ onConfigurationsChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [configurations, setConfigurations] = useState({
    configText: "",
    refNum: 1,
    rootNum: 1
  });

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const handleConfigurationsChange = (e, id) => {
    const newConfigurations = e.target.value;
    setConfigurations({ ...configurations, [id]: newConfigurations });
    onConfigurationsChange({ ...configurations, [id]: newConfigurations }); // Call the prop function
  };

  return (
    <div className="prompt-configurations">
      <button type="button" onClick={toggleCollapse} className="collapse-button">
        {isOpen ? "Collapse" : "Expand"} Prompt Configurations
      </button>
      {isOpen && (
        <div className="configurations-content">
          <textarea
            id="promptText"
            placeholder="Enter prompt configuration..."
            rows="4"
            cols="50"
            value={configurations.value}
            onChange={(e) => handleConfigurationsChange(e, "configText")}
          />
          <div className="configurations-options">
            <label htmlFor="numReferences">Number of References to Find:</label>
            <select id="numReferences" value={configurations.value} onChange={(e) => handleConfigurationsChange(e, "refNum")}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <label htmlFor="numRootCauses">Number of Root Causes to Generate:</label>
            <select id="numRootCauses" onChange={(e) => handleConfigurationsChange(e, "rootNum")}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="3">4</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default PromptConfigurations;
