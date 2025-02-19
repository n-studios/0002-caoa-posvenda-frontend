import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import PropTypes from "prop-types";
import TranslationViewer from "./TranslationViewer";
import "./PdfViewer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const manualPaths = {
  Tiggo7ProHybrid: "/manuals/Tiggo7ProHybrid_Pages/Tiggo7ProHybrid_page_",
  Tiggo8ProPHEV: "/manuals/Tiggo_8_PRO_PHEV_Pages/Tiggo_8_Pro_PHEV_page_",
};

const PdfViewer = ({ manual, page }) => {
  const [pdfData, setPdfData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!manualPaths[manual]) {
      setError(true);
      setPdfData(null);
      setLoading(false);
      return;
    }

    const manualPath = `${manualPaths[manual]}${page}.pdf`;

    setError(false);
    setLoading(true);

    fetch(manualPath)
      .then((response) => {
        if (!response.ok) throw new Error("PDF not found");
        return response.blob();
      })
      .then((blob) => {
        setPdfData(URL.createObjectURL(blob));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading PDF:", error);
        setError(true);
        setPdfData(null);
        setLoading(false);
      });
  }, [manual, page]);

  return (
    <div className="pdf-viewer-container">
      {loading && <p>Carregando página...</p>}
      {error && !loading && <p>Esta página do manual não foi encontrada.</p>}
      {!loading && pdfData !== null && (
        <>
          <TranslationViewer page={page} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <Document file={pdfData}>
              <div
                style={{
                  border: "1px solid black",
                  padding: "5px",
                  display: "inline-block",
                }}
              >
                <Page
                  pageNumber={1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  width={600}
                />
              </div>
            </Document>
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
