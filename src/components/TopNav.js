import React, { Fragment, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const [toggle, setToggle] = useState(false);
  const [selectedTab, setSelectedTab] = useState("home");
  const navigate = useNavigate();
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          CoinMa$ter
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setToggle((prev) => !prev)}
        >
          {!toggle ? (
            <span className="navbar-toggler-icon"></span>
          ) : (
            <IoIosClose size={24} />
          )}
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <span
              role="button"
              className={`nav-item nav-link ${
                selectedTab === "home" ? "active" : ""
              }`}
              onClick={() => {
                setSelectedTab("home");
                navigate("/");
                setToggle(false);
              }}
            >
              Home
            </span>
            <span
              role="button"
              className={`nav-item nav-link ${
                selectedTab === "convertor" ? "active" : ""
              }`}
              onClick={() => {
                setSelectedTab("convertor");
                navigate("/convertor");
                setToggle(false);
              }}
            >
              Converter
            </span>
          </div>
        </div>
      </nav>
      {toggle && (
        <div className="mt-20">
          <div className="w-100 h-50 bg-dark position-absolute zindex-dropdown border-light border-bottom">
            <span
              role="button"
              className={`d-flex justify-content-center align-items-center fw-bold text-light my-5 ${
                selectedTab === "home" ? "active" : ""
              }`}
              onClick={() => {
                setSelectedTab("home");
                navigate("/");
                setToggle(false);
              }}
            >
              Home
            </span>
            <span
              role="button"
              className={`d-flex justify-content-center align-items-center fw-bolder text-light my-5 ${
                selectedTab === "convertor" ? "active" : ""
              }`}
              onClick={() => {
                setSelectedTab("convertor");
                navigate("/convertor");
                setToggle(false);
              }}
            >
              Converter
            </span>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default TopNav;
