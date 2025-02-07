import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Training = () => {
  const navigate = useNavigate();
  const webpageUrl =
    "https://0002-caoa-posvenda-interface-streamlit-display.azurewebsites.net/";

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src={webpageUrl}
        title="Embedded Webpage"
        width="100%"
        height="100%"
        style={{ border: "none" }}
        allowFullScreen
      />
      <Button onClick={() => navigate("/")} buttonText={"Página inicial"} />
    </div>
  );
};

export default Training;
