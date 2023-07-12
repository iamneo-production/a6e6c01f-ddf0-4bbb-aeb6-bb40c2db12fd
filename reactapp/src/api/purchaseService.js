import axios from "axios";
const baseURL = "http://localhost:8080";

export function getPurchaseByBuyerId(buyerId) {
  const url = `${baseURL}/purchase/buyer?buyerId=${buyerId}`;
  const config = {
    method: "get",
    url: url,
  };
  return axios(config);
}


