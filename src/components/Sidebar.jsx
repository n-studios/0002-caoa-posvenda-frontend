// src/components/Sidebar.jsx
import React from "react";
import "./Sidebar.css";

const Sidebar = ({ namespaces, selectedNamespace, onSelectNamespace }) => {
  return (
    <div className="sidebar">
      <h3>Manual</h3>
      <ul>
        {namespaces.map((namespace) => (
          <li
            key={namespace}
            className={namespace === selectedNamespace ? "active" : ""}
            onClick={() => onSelectNamespace(namespace)}
          >
            {namespace}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
