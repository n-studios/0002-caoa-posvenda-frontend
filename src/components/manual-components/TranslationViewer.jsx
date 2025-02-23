import { useState } from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import { marked } from "marked";
import translations from "../../data/translations.json";
import "./TranslationViewer.css";

const TranslationViewer = ({ page }) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const translation =
    translations[page.toString()] || "Tradução não disponível.";

  const formattedTranslation = marked(translation);

  const handleToggle = () => {
    if (isViewerOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsViewerOpen(false);
        setIsClosing(false);
      }, 300);
    } else {
      setIsViewerOpen(true);
      setIsClosing(false);
    }
  };

  return (
    <div className="translation-viewer-container">
      <div className="viewer-header" onClick={handleToggle}>
        <h3>Visualizar tradução para a Página {page}</h3>
        <span className={`toggle-icon ${isViewerOpen ? "open" : ""}`}>►</span>
      </div>

      <div
        className={`viewer-content ${isViewerOpen ? "open" : ""} ${
          isClosing ? "closing" : ""
        }`}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(formattedTranslation),
        }}
      />
    </div>
  );
};

TranslationViewer.propTypes = {
  page: PropTypes.number.isRequired,
};

export default TranslationViewer;
