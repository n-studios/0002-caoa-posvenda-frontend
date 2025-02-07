import PropTypes from "prop-types";
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

Sidebar.propTypes = {
  namespaces: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedNamespace: PropTypes.string,
  onSelectNamespace: PropTypes.func.isRequired,
};

export default Sidebar;
