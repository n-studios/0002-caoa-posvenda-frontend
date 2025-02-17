import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout-components/Header";
import Home from "./pages/Home/Home";
import Chat from "./pages/Chat/Chat";
import Trainer from "./pages/Trainer/Trainer";
import Inventory from "./pages/Inventory/Inventory";
import ManualViewer from "./pages/ManualViewer/ManualViewer";

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/trainer" element={<Trainer />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/manual" element={<ManualViewer />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
