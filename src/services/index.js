import axios from "axios";

const key = "4584f44a-3644-4361-8d37-f7e344b9216d";
const baseURL = "https://pro-api.coinmarketcap.com";
const CoinMarketServices = {
  getLatestCryptoListings: function () {
    return axios.get(
      `${baseURL}/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${key}`
    );
  },
  getLogos: function (ids) {
    return axios.get(
      `${baseURL}/v2/cryptocurrency/info?CMC_PRO_API_KEY=${key}&id=${ids}`
    );
  },
};

export default CoinMarketServices;
