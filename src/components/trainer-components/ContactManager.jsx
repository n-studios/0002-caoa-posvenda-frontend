import { useState, useCallback } from "react";
import "./ContactManager.css";

const ContactManager = () => {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [update, setUpdate] = useState(false);
  const [create, setCreate] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [contact, setContact] = useState({ name: "", _id: "" });

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

  const handleNewContactButton = () => {
    setCreate(!create);
    setUpdate(false);
    setContact({ name: "", _id: "" });
  };

  const handleUpdateButton = (contact) => {
    setUpdate(true);
    setCreate(false);
    setContact(contact);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendCreate = () => {
    if (contact.name && contact._id) {
      setContacts([...contacts, contact]);
      setContact({ name: "", _id: "" });
      setCreate(false);
    }
  };

  const handleSendUpdate = () => {
    const contactIndex = contacts.findIndex((c) => c._id === contact._id);
    const updatedContacts = contacts;
    updatedContacts[contactIndex] = { name: contact.name, _id: contact._id };
    setContacts(updatedContacts);
    setUpdate(false);
  };

  const handleDelete = (id) => {
    setContacts(contacts.filter((c) => c._id !== id));
    setSelectedContacts(selectedContacts.filter((c) => c._id !== id));
    setUpdate(false);
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

  return (
    <div className="contact-section">
      <div className="contact-header" onClick={handleToggle}>
        <h3>Contatos</h3>
        <span className={`toggle-icon ${isConfigOpen ? "open" : ""}`}>►</span>
      </div>

      <div
        className={`contact-content ${isConfigOpen ? "open" : ""} ${isClosing ? "closing" : ""}`}
      >
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
                          src="src/assets/edit_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
                          alt="edit"
                        />
                      </button>
                      <button
                        className="control-button"
                        onClick={() => handleDelete(contact._id)}
                      >
                        <img
                          src="src/assets/delete_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
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
              <button className="generic-button">Enviar</button>
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
              name="_id"
              placeholder="Telefone: somente numeros..."
              value={contact._id}
              onChange={handleInputChange}
            />
            <button className="generic-button" onClick={handleSendCreate}>
              Enviar
            </button>
          </div>
        )}

        {update && (
          <div className="crud-contact">
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={contact.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="_id"
              placeholder="Telefone: somente numeros..."
              value={contact._id}
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

export default ContactManager;
