import React, { useState } from "react";
import "../style/App2.css"; // Archivo CSS con las clases personalizadas

const UniqueToggleSwitch = () => {
  const [isYears, setIsYears] = useState(true);

  const toggleSwitch = () => {
    setIsYears(!isYears);
  };

  return (
    <div className="unique-toggle-switch-container">
      <span className={isYears ? "unique-active" : ""}>Años</span>
      <div className="unique-toggle-switch" onClick={toggleSwitch}>
        <div className={`unique-toggle-knob ${isYears ? "unique-left" : "unique-right"}`}></div>
      </div>
      <span className={!isYears ? "unique-active" : ""}>Meses</span>
    </div>
  );
};

export default UniqueToggleSwitch;
