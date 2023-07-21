import axios from "axios";
import {baseUrl} from "./config";

export async function createQA(token,body){
    return await axios.post(`${baseUrl}/qa`,{
        "productId":body.productId,
        "question":body.question
    },{
        headers: { Authorization: `Bearer ${token}`}
    })
}

export async function updateQA(token,body){
    return await axios.put(`${baseUrl}/qa?qaId=${body.qaId}&answer=${body.answer}`,{
    },{
        headers: { Authorization: `Bearer ${token}`}
    })
}


export async function getQAByProduct(token,productId){
    return await axios.get(`${baseUrl}/qa/product?productId=${productId}`,{
        headers: { Authorization: `Bearer ${token}` }
    })
}

export async function getQABySeller(token,sellerId){
    return await axios.get(`${baseUrl}/qa/seller?sellerId=${sellerId}`,{
        headers: { Authorization: `Bearer ${token}` }
    })
}

export async function getQAByBuyer(token){
    return await axios.get(`${baseUrl}/qa`,{
        headers: { Authorization: `Bearer ${token}` }
    })
}