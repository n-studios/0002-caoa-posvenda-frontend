import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TranslationViewer from "./TranslationViewer";
import "./PdfViewer.css";
import Tiggo7ProHybrid_Pages from "../../data/Tiggo7ProHybrid_Pages.json";
import Tiggo8ProPHEV_Pages from "../../data/Tiggo8ProPHEV_Pages.json";

const manualJson = {
  Tiggo7ProHybrid: Tiggo7ProHybrid_Pages,
  Tiggo8ProPHEV: Tiggo8ProPHEV_Pages,
};

const PdfViewer = ({ manual, page }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    if (!manualJson[manual]) {
      setError(true);
      setPdfUrl(null);
      setLoading(false);
      return;
    }

    let pageKey;
    if (manual === "Tiggo7ProHybrid") {
      pageKey = `Tiggo7ProHybrid_page_${page}.pdf`;
    } else if (manual === "Tiggo8ProPHEV") {
      pageKey = `Tiggo_8_Pro_PHEV_page_${page}.pdf`;
    } else {
      setError(true);
      setPdfUrl(null);
      setLoading(false);
      return;
    }

    let pdfFileId = manualJson[manual][pageKey];

    if (!pdfFileId) {
      setError(true);
      setPdfUrl(null);
      setLoading(false);
      return;
    }

    const url = `https://drive.google.com/file/d/${pdfFileId}/preview`;
    setPdfUrl(url);
    setError(false);
    setLoading(false);
  }, [manual, page]);

  return (
    <div className="pdf-viewer-container">
      {loading && <p>Carregando página...</p>}
      {error && !loading && <p>Esta página do manual não foi encontrada.</p>}
      {!loading && pdfUrl && (
        <>
          <TranslationViewer page={page} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <iframe
              src={pdfUrl}
              width="600"
              height="800"
              type="application/pdf"
            />
          </div>
        </>
      )}
    </div>
  );
};

PdfViewer.propTypes = {
  manual: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export default PdfViewer;
