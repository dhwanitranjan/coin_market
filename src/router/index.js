import { Route, Routes } from "react-router-dom";
import Home from "../screens/Home";
import Convertor from "../screens/Convertor";
import TopNav from "../components/TopNav";

const WebAppRouter = () => {
  return (
    <div className="container-fluid bg-dark vh-100">
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/convertor" element={<Convertor />} />
      </Routes>
    </div>
  );
};

export default WebAppRouter;
