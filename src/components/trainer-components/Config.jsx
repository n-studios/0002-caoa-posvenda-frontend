import { useState } from "react";
import "./Config.css";

const Config = () => {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleToggle = () => {
    if (isConfigOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsConfigOpen(false);
        setIsClosing(false);
      }, 300);
    } else {
      setIsConfigOpen(true);
      setIsClosing(false);
    }
  };

  return (
    <div className="config">
      <div className="config-header" onClick={handleToggle}>
        <h3>Configurações</h3>
        <span className={`toggle-icon ${isConfigOpen ? "open" : ""}`}>
          {isConfigOpen ? "▼" : "►"}
        </span>
      </div>

      <div
        className={`config-content ${isConfigOpen ? "open" : ""} ${
          isClosing ? "closing" : ""
        }`}
      >
        <label htmlFor="config-dropdown">Tipo do Experimento:</label>
        <select id="config-dropdown" className="dropdown-select">
          <option value="option1">Opção 1</option>
          <option value="option2">Opção 2</option>
          <option value="option3">Opção 3</option>
        </select>
        <h4>Descrição do Experimento</h4>
        <p>Sample Text</p>
      </div>
    </div>
  );
};

export default Config;
