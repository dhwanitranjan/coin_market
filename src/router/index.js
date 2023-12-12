import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "../screens/Home";
import Convertor from "../screens/Convertor";
import TopNav from "../components/TopNav";

const WebAppRouter = () => {
  return (
    <div className="container-fluid bg-dark">
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/convertor" element={<Convertor />} />
      </Routes>
    </div>
  );
};

export default WebAppRouter;
