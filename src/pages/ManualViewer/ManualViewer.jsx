import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PdfViewer from "../../components/manual-components/PdfViewer";
import "./ManualViewer.css";

const ManualViewer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [manual, setManual] = useState(null);
  const [inputValue, setInputValue] = useState("1");

  const totalPageCounts = useMemo(
    () => ({
      Tiggo7ProHybrid: 2071,
      Tiggo8ProPHEV: 3245,
    }),
    []
  );

  useEffect(() => {
    const initialManual = searchParams.get("manual");
    const initialPage = parseInt(searchParams.get("page"), 10) || 1;

    if (initialManual) {
      setManual(initialManual);
      setTotalPages(totalPageCounts[initialManual] || 0);
      setPage(initialPage);
      setInputValue(initialPage.toString());
    }
  }, [searchParams, totalPageCounts]);

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setInputValue("");
      return;
    }

    const parsedValue = parseInt(value, 10);
    setInputValue(value);

    if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= totalPages) {
      setPage(parsedValue);
      setSearchParams({ manual, page: parsedValue }, { replace: true });
    }
  };

  const handleManualChange = (e) => {
    const selectedManual = e.target.value;
    if (selectedManual !== "") {
      setManual(selectedManual);
      setTotalPages(totalPageCounts[selectedManual]);
      setPage(1);
      setInputValue("1");
      setSearchParams({ manual: selectedManual, page: 1 }, { replace: true });
    }
  };

  const resetManual = () => {
    setManual(null);
    setTotalPages(0);
    setPage(1);
    setInputValue("1");
    setSearchParams({});
  };

  return (
    <div className="manual-page">
      <div className="manual-container">
        <h1>Visualizador de Manual</h1>

        {!manual && (
          <select
            className="dropdown-select"
            value={manual || ""}
            onChange={handleManualChange}
          >
            <option value="">Selecione um manual</option>
            <option value="Tiggo7ProHybrid">Tiggo 7 Pro Hybrid</option>
            <option value="Tiggo8ProPHEV">Tiggo 8 Pro PHEV</option>
          </select>
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
            <PdfViewer manual={manual} page={page} />
          </>
        )}
      </div>
    </div>
  );
};

export default ManualViewer;
