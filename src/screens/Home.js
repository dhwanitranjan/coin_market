import { useDispatch, useSelector } from "react-redux";
import { getLatestCryptoListings, getLogos } from "../app/thunk.js";
import React, { useEffect, useState } from "react";
const Home = () => {
  const dispatch = useDispatch();
  const { cryptoList, coinInfos } = useSelector((state) => state.crypto);
  console.log(cryptoList);
  useEffect(() => {
    dispatch(getLatestCryptoListings()).then(({ payload }) => {
      const ids = payload.data.map((item) => item.id).join(",");
      dispatch(getLogos(ids));
    });
  }, []);
  return <div>Home</div>;
};

export default Home;
