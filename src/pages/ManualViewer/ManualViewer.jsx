import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import TranslationViewer from "../../components/manual-components/TranslationViewer";
import PdfViewer from "../../components/manual-components/PdfViewer";
import "./ManualViewer.css";

const ManualViewer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [manual, setManual] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const totalPageCounts = {
    Tiggo7ProHybrid: 2071,
    Tiggo8ProPHEV: 3245,
  };

  useEffect(() => {
    const initialPage = parseInt(searchParams.get("page"), 10) || 1;
    const initialManual = searchParams.get("manual") || null;

    setPage(initialPage);
    setManual(initialManual);
    setInputValue(initialPage.toString());
  }, [searchParams]);

  // Update total pages when manual changes
  useEffect(() => {
    if (manual) {
      setTotalPages(totalPageCounts[manual]);

      if (!searchParams.get("page")) {
        setSearchParams({ manual, page: 1 });
      }
    }
  }, [manual, setSearchParams, searchParams]);

  const handleInputChange = (e) => {
    const value = e.target.value;

    // Allow the input to be fully cleared
    if (value === "") {
      setInputValue("");
      return;
    }

    const parsedValue = parseInt(value, 10);

    if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= totalPages) {
      setPage(parsedValue);
      setSearchParams({ manual, page: parsedValue });
    }

    setInputValue(value);
  };

  const handleManualChange = (e) => {
    const selectedManual = e.target.value;
    if (selectedManual !== "") {
      setManual(selectedManual);
      setSearchParams({ manual: selectedManual, page: 1 });
    }
  };

  const resetManual = () => {
    setManual(null);
    setSearchParams({});
  };

  return (
    <div className="manual-page">
      <div className="manual-container">
        <h1>Visualizador de Manual</h1>

        {!manual && (
          <>
            <select
              className="dropdown-select"
              value={manual}
              onChange={handleManualChange}
            >
              <option value="">Selecione um manual</option>
              <option value="Tiggo7ProHybrid">Tiggo 7 Pro Hybrid</option>
              <option value="Tiggo8ProPHEV">Tiggo 8 Pro PHEV</option>
            </select>
          </>
        )}
        {manual && (
          <>
            <p id="manual-name">{manual}</p>
            <button className="generic-button" onClick={resetManual}>
              Outro Manual
            </button>
            <h3>
              Total de Páginas: <span>{totalPages}</span>
            </h3>
            <h3>Selecione uma página:</h3>
            <input
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              min="1"
              max={totalPages}
            />
            <TranslationViewer page={page} />
            <PdfViewer manual={manual} page={page} />
          </>
        )}
      </div>
    </div>
  );
};

export default ManualViewer;
