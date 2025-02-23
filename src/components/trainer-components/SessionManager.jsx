import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const SessionManager = ({ API_BASE_URL, handleSelectedSession }) => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState("");

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/whatsapp_session/get_sessions`
      );
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  const getFourLastSessions = (array) => {
    const count = Math.min(array.length, 4);
    return array.slice(-count).reverse();
  };

  const lastFourSessions = getFourLastSessions(sessions);

  function formatObjectIdTimestamp(objectId) {
    if (!/^[0-9a-fA-F]{24}$/.test(objectId)) {
      return "Invalid ID";
    }

    const timestamp = parseInt(objectId.substring(0, 8), 16) * 1000;
    const date = new Date(timestamp);

    const formattedDate = date.toLocaleDateString("pt-BR");
    const formattedTime = date.toLocaleTimeString("pt-BR");

    return `${formattedDate} as ${formattedTime}`;
  }

  const handleSessionChange = (event) => {
    const newSession = event.target.value;
    setSelectedSession(newSession);
    handleSelectedSession(newSession);
  };

  return (
    <>
      <label htmlFor="session-dropdown">Selecione uma sessão:</label>
      <select
        id="session-dropdown"
        className="dropdown-select"
        value={selectedSession}
        onChange={handleSessionChange}
      >
        <option value="">Sessões Disponíveis</option>
        {lastFourSessions.map((session) => (
          <option key={session._id} value={session._id}>
            {`Sessão iniciada ${formatObjectIdTimestamp(session._id)}`}
          </option>
        ))}
      </select>
    </>
  );
};

SessionManager.propTypes = {
  API_BASE_URL: PropTypes.string.isRequired,
  handleSelectedSession: PropTypes.func.isRequired,
};

export default SessionManager;
