import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "../screens/Home";
import Convertor from "../screens/Convertor";

const WebAppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/convertor" element={<Convertor />} />
    </Routes>
  );
};

export default WebAppRouter;
