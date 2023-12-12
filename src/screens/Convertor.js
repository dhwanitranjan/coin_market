import React, { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import CoinMarketServices from "../services";
import { getLatestCryptoListings, getLogos } from "../app/thunk.js";
import PageLoader from "../components/PageLoader";

const Convertor = () => {
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useSearchParams({
    convertSymbol: "BTC",
    amount: 1,
    symbol: "ETH",
  });
  const paramConvertSymbol = searchParam.get("convertSymbol");
  const paramAmount = searchParam.get("amount");
  const paramSymbol = searchParam.get("symbol");

  const [convertedValue, setConvertedValue] = useState();
  const cryptoList = useSelector(
    (state) => state.crypto.cryptoList?.data?.data
  );
  const coinInfos = useSelector(
    (state) => state?.crypto?.coinInfos?.data?.data
  );
  const { isLoading } = useSelector((state) => state.crypto.cryptoList);

  useEffect(() => {
    !cryptoList &&
      !coinInfos &&
      dispatch(getLatestCryptoListings()).then(({ payload }) => {
        const ids = payload.data?.map((item) => item.id).join(",");
        dispatch(getLogos(ids));
      });
  }, []);

  useEffect(
    () => paramConvertSymbol && handleConversion(),
    [paramConvertSymbol]
  );

  const dropdown = (field) => {
    return (
      <select
        className="form-select"
        value={field === "convertSymbol" ? paramConvertSymbol : paramSymbol}
        onChange={(e) =>
          setSearchParam((prev) => {
            prev.set(field, e.target.value);
            return prev;
          })
        }
      >
        {cryptoList?.map((coin) => (
          <option key={coin.id} value={coin.symbol}>
            {coin.name + " (" + coin.symbol + ")"}
          </option>
        ))}
      </select>
    );
  };

  const handleConversion = () => {
    CoinMarketServices.priceConversion(
      paramAmount,
      paramSymbol,
      paramConvertSymbol
    ).then(({ data }) => {
      setConvertedValue(data?.data?.[0]?.quote?.[paramSymbol]?.price);
    });
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Fragment>
      <div className="my-3">
        <span className="text-bolder text-light">
          Cryptocurrency Converter Calculator
        </span>
      </div>
      <div className="row">
        <div className="col-6 offset-3 my-4">{dropdown("symbol")}</div>
        <div className="col-6 offset-3">
          <input
            className="form-input w-100 my-4"
            type="number"
            value={paramAmount}
            onChange={(e) =>
              setSearchParam((prev) => {
                prev.set("amount", e.target.value);
                return prev;
              })
            }
          />
        </div>
        <button className="btn btn-sm">
          <FaArrowRightArrowLeft
            className="text-light"
            size={24}
            onClick={() => handleConversion()}
          />
        </button>
        <div className="col-6 offset-3 my-4">{dropdown("convertSymbol")}</div>
        {convertedValue && (
          <div className="col-6 offset-3 text-light d-flex justify-content-center">
            {paramAmount} {paramSymbol} ={" "}
            {convertedValue > 1
              ? convertedValue.toFixed(2)
              : convertedValue > 0.001
              ? convertedValue.toFixed(4)
              : convertedValue.toFixed(8)
              ? convertedValue > 0.00001
              : convertedValue ?? 0}{" "}
            {paramConvertSymbol}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Convertor;
