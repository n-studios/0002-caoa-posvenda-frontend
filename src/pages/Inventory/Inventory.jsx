import { useNavigate } from "react-router-dom";
import Button from "../../components/shared-components/Button";

const Inventory = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Inventory Page</h1>
      <p>Welcome to the Inventory section!</p>
      <Button onClick={() => navigate("/")} buttonText={"Return to Home"} />
    </div>
  );
};

export default Inventory;
