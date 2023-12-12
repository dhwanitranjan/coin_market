import { useDispatch, useSelector } from "react-redux";
import { getLatestCryptoListings, getLogos } from "../app/thunk.js";
import { useEffect, useState } from "react";
import {
  IoMdArrowDropup,
  IoMdArrowDropdown,
  IoIosArrowBack,
  IoIosArrowForward,
} from "react-icons/io";

const Home = () => {
  const dispatch = useDispatch();
  const pageSize = 10;
  const cryptoList = useSelector(
    (state) => state.crypto.cryptoList?.data?.data
  );
  const coinInfos = useSelector(
    (state) => state?.crypto?.coinInfos?.data?.data
  );
  const [displayCryptos, setDisplayCryptos] = useState();
  const [pageNo, setPageNo] = useState(0);
  useEffect(() => {
    setDisplayCryptos(
      cryptoList?.slice(pageNo * pageSize, (pageNo + 1) * pageSize)
    );
  }, [pageNo, cryptoList]);

  useEffect(() => {
    dispatch(getLatestCryptoListings()).then(({ payload }) => {
      const ids = payload.data?.map((item) => item.id).join(",");
      dispatch(getLogos(ids));
    });
    setPageNo(0);
  }, []);

  return (
    <div>
      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">24h %</th>
            <th scope="col">7d %</th>
            <th scope="col">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {displayCryptos?.map((coin, i) => {
            const rates = coin.quote.USD;
            return (
              <tr key={coin.id}>
                <th>{pageNo * pageSize + i + 1}</th>
                <td>
                  <div className="d-flex">
                    <img
                      src={coinInfos?.[coin.id]?.logo}
                      className="rounded coin-logo"
                      alt={coin.name}
                    />
                    <p className="fw-bolder mx-2">{coin.name}</p>
                    <p className="fw-light">{coin.symbol}</p>
                  </div>
                </td>
                <td>
                  $
                  {rates.price > 1
                    ? rates.price.toFixed(2)
                    : rates.price > 0.001
                    ? rates.price.toFixed(4)
                    : rates.price.toFixed(8)}
                </td>
                <td
                  className={`${
                    rates.percent_change_24h < 0
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  {rates.percent_change_24h < 0 ? (
                    <IoMdArrowDropup size={20} />
                  ) : (
                    <IoMdArrowDropdown size={20} />
                  )}
                  {rates.percent_change_24h.toFixed(2)}
                </td>
                <td
                  className={`${
                    rates.percent_change_7d < 0 ? "text-success" : "text-danger"
                  }`}
                >
                  {rates.percent_change_7d < 0 ? (
                    <IoMdArrowDropup size={20} />
                  ) : (
                    <IoMdArrowDropdown size={20} />
                  )}
                  {rates.percent_change_7d.toFixed(2)}
                </td>
                <td>${rates.market_cap.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-flex justify-content-end mx-4">
        {pageNo > 0 && (
          <div
            className="text-light"
            disabled={pageNo === 0}
            onClick={() => setPageNo((prev) => prev - 1)}
          >
            <IoIosArrowBack />
          </div>
        )}
        <span className="form-label text-light mx-3">{pageNo + 1}</span>
        {pageNo < 9 && (
          <div
            className="text-light"
            disabled={pageNo === Math.round(cryptoList?.length / pageSize) + 1}
            onClick={() => setPageNo((prev) => prev + 1)}
          >
            <IoIosArrowForward />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
