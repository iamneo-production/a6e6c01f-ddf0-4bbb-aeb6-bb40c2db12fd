import axios from "axios";
import {baseUrl} from "./config";
const baseURL = "http://localhost:8080";

export async function getPurchaseByProduct(token, productId) {
  return await axios.get(`${baseUrl}/seller/product/purchase?productId=${productId}`, {
    headers: {Authorization: `Bearer ${token}`}
  })
}

export function getPurchaseByBuyerId(buyerId) {
  const url = `${baseURL}/purchase/buyer?buyerId=${buyerId}`;
  const config = {
    method: "get",
    url: url,
  };
  return axios(config);
}



export async function createPurchase(token,body){
  return await axios.post(`${baseUrl}/purchase`,{
    "cartIds":body.cartIds,
    "paymentMethod":body.paymentMethod
  },{
    headers: { Authorization: `Bearer ${token}`}
  })
}


export async function getPurchaseByBuyer(token){
  return await axios.get(`${baseUrl}/purchase/buyer`,{
    headers: { Authorization: `Bearer ${token}` }
  })
}
export async function getPurchaseByBuyerIdd(id){
  return await axios.get(`${baseUrl}/auth/buyer/${id}`);
}
