import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import "./ContactManager.css";

const API_BASE_URL =
  "https://0002-caoa-posvenda-api-evaluation.azurewebsites.net/api/v1";

const ContactManager = ({ questionId, rubricId }) => {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [update, setUpdate] = useState(false);
  const [create, setCreate] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [contact, setContact] = useState({
    _id: "",
    name: "",
    phone_number: "",
  });
  const [sessionStarted, setSessionStarted] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

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

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/get_users`);
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleNewContactButton = () => {
    setCreate(!create);
    setUpdate(false);
    setContact({ name: "", phone_number: "" });
  };

  const handleUpdateButton = (contact) => {
    setUpdate(true);
    setCreate(false);
    setContact(contact);
  };

  const handleCloseUpdate = () => {
    setUpdate(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendCreate = () => {
    if (contact.name && contact.phone_number) {
      const newContact = {
        name: contact.name,
        phone_number: contact.phone_number,
      };
      fetch(`${API_BASE_URL}/users/create_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContact),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to create contact");
          }
          return response.json();
        })
        .then(() => {
          fetchContacts();
          setContact({ name: "", phone_number: "" });
        })
        .catch((error) => console.error("Error creating contact:", error));
    }
  };

  const handleSendUpdate = () => {
    if (contact.name && contact.phone_number) {
      const updatedContact = {
        phone_number: contact.phone_number,
        name: contact.name,
        user_id: contact._id,
      };
      fetch(`${API_BASE_URL}/users/update_user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedContact),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update contact");
          }
          return response.json();
        })
        .then(() => {
          fetchContacts();
          setUpdate(false);
        })
        .catch((error) => console.error("Error updating contact:", error));
    }
  };

  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/users/delete_user/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete contact: ${response.msg}`);
        }
        return response.json();
      })
      .then(() => {
        setContacts((prevContacts) => prevContacts.filter((c) => c._id !== id));
        setSelectedContacts((prevSelected) =>
          prevSelected.filter((c) => c._id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting contact:", error);
      });
  };

  const toggleContact = (contact) => {
    if (selectedContacts.some((c) => c._id === contact._id)) {
      setSelectedContacts(
        selectedContacts.filter((c) => c._id !== contact._id)
      );
    } else {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };

  const selectAll = useCallback(() => {
    setSelectedContacts((prev) =>
      prev.length === contacts.length ? [] : contacts
    );
  }, [contacts]);

  const startWhatsApp = () => {
    if (questionId === "" || rubricId === "") {
      return alert("Selecione uma rúbrica e pergunta.");
    }
    const sessionObject = {
      user_ids: selectedContacts.map((contact) => contact._id),
      question_id: questionId,
      rubric_id: rubricId,
    };

    fetch(`${API_BASE_URL}/whatsapp_session/start_session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sessionObject),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to start WhatsApp session");
        }
        return response.json();
      })
      .then(() => {
        setSessionStarted(true);
        setTimeout(() => {
          setSessionStarted(false);
        }, 3000);
      })
      .catch((error) =>
        console.error("Error starting WhatsApp Session", error)
      );
  };

  return (
    <div className="contact-section">
      <div className="contact-header" onClick={handleToggle}>
        <h3>Contatos</h3>
        <span className={`toggle-icon ${isConfigOpen ? "open" : ""}`}>►</span>
      </div>

      <div
        className={`contact-content ${isConfigOpen ? "open" : ""} ${isClosing ? "closing" : ""}`}
      >
        {sessionStarted && (
          <h3
            style={{
              color: "dodgerblue",
              alignSelf: "center",
            }}
          >
            Pergunta Enviada!
          </h3>
        )}
        <div className="contact-display">
          <div className="available-contacts">
            <h2>Contatos Disponíveis</h2>
            {contacts.length > 0 && (
              <button className="generic-button" onClick={selectAll}>
                {selectedContacts.length === contacts.length
                  ? "Remover Todos"
                  : "Selecionar Todos"}
              </button>
            )}
            <div className="available-container">
              <ul>
                {contacts.map((contact) => (
                  <li key={contact._id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedContacts.some(
                          (c) => c._id === contact._id
                        )}
                        onChange={() => toggleContact(contact)}
                      />
                      {contact.name}
                    </label>
                    <span>
                      <button
                        className="control-button"
                        onClick={() => handleUpdateButton(contact)}
                      >
                        <img
                          src="/edit_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
                          alt="edit"
                        />
                      </button>
                      <button
                        className="control-button"
                        onClick={() => handleDelete(contact._id)}
                      >
                        <img
                          src="/delete_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
                          alt="delete"
                        />
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="selected-contacts">
            <h2>Contatos Selecionados</h2>
            {selectedContacts.length > 0 && (
              <button className="generic-button" onClick={startWhatsApp}>
                Enviar
              </button>
            )}
            <div className="selected-container">
              <ul>
                {selectedContacts.map((contact) => (
                  <li key={contact._id}>
                    {contact.name}
                    <button
                      className="remove-button"
                      onClick={() => toggleContact(contact)}
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {!update && (
          <button className="generic-button" onClick={handleNewContactButton}>
            {create ? `Fechar` : `Novo Contato`}
          </button>
        )}

        {create && (
          <div className="crud-contact">
            <h2>Criar Novo Contato</h2>
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={contact.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="phone_number"
              placeholder="Telefone: somente numeros..."
              value={contact.phone_number}
              onChange={handleInputChange}
            />
            <button className="generic-button" onClick={handleSendCreate}>
              Enviar
            </button>
          </div>
        )}

        {update && (
          <div className="crud-contact">
            <button
              className="generic-button"
              style={{ marginBottom: "10px" }}
              onClick={handleCloseUpdate}
            >
              Fechar
            </button>
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={contact.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="phone_number"
              placeholder="Telefone: somente numeros..."
              value={contact.phone_number}
              onChange={handleInputChange}
            />
            <div className="controls">
              <button className="generic-button" onClick={handleSendUpdate}>
                Enviar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ContactManager.propTypes = {
  questionId: PropTypes.string.isRequired,
  rubricId: PropTypes.string.isRequired,
};

export default ContactManager;
