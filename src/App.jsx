import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Chat from "./pages/Chat"; // Import the Chat component
import Training from "./pages/Training"; // Import the Training component
import Inventory from "./pages/Inventory"; // Import the Inventory component

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Route for Home */}
        <Route path="/chat" element={<Chat />} /> {/* Route for Chat */}
        <Route path="/training" element={<Training />} />{" "}
        {/* Route for Training */}
        <Route path="/inventory" element={<Inventory />} />{" "}
        {/* Route for Inventory */}
      </Routes>
    </Router>
  );
};

export default App;
