import React from "react";

const PageLoader = () => {
  return (
    <div className="d-flex justify-content-center align-item-center">
      <div class="spinner-grow text-primary" role="status"></div>
      <div class="spinner-grow text-secondary" role="status"></div>
      <div class="spinner-grow text-success" role="status"></div>
      <div class="spinner-grow text-danger" role="status"></div>
    </div>
  );
};

export default PageLoader;
