import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./PdfViewer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PdfViewer = ({ manual, page }) => {
  const [pdfData, setPdfData] = useState(null);
  const [error, setError] = useState(false);

  // Define correct base paths for each manual
  const manualPaths = {
    Tiggo7ProHybrid: "/manuals/Tiggo7ProHybrid_Pages/Tiggo7ProHybrid_page_",
    Tiggo8ProPHEV: "/manuals/Tiggo_8_PRO_PHEV_Pages/Tiggo_8_Pro_PHEV_page_",
  };

  const getManualPath = () => {
    return manualPaths[manual] ? `${manualPaths[manual]}${page}.pdf` : null;
  };

  useEffect(() => {
    setError(false);
    const manualPath = getManualPath();
    if (manualPath) {
      fetch(manualPath)
        .then((response) => {
          if (!response.ok) throw new Error("PDF not found");
          return response.blob();
        })
        .then((blob) => {
          setPdfData(URL.createObjectURL(blob));
        })
        .catch((error) => {
          console.error("Error loading PDF:", error);
          setError(true);
          setPdfData(null);
        });
    }
  }, [manual, page]);

  return (
    <div className="pdf-viewer-container">
      {error ? (
        <p>Esta página do manual não foi encontrada.</p>
      ) : pdfData ? (
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
      ) : (
        <p>Carregando página...</p>
      )}
    </div>
  );
};

export default PdfViewer;
