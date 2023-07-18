import axios from "axios";
import {baseUrl} from "./config";

export async function createCart(token,body){
    return await axios.post(`${baseUrl}/cart`,{
        "productId":body.productId,
        "quantity":body.quantity
    },{
        headers: {Authorization: `Bearer ${token}`}
    })
}

export async function updateCartQuantity(token,body){
    return await axios.put(`${baseUrl}/cart?cartId=${body.cartId}&quantity=${body.quantity}`,{
    },{
        headers: {Authorization: `Bearer ${token}`}
    })
}

export async function getCart(token){
    return await axios.get(`${baseUrl}/cart`,{
        headers: { Authorization: `Bearer ${token}` }
    })
}

export async function deleteCart(token,cartId){
    return await axios.delete(`${baseUrl}/cart?cartId=${cartId}`,{
        headers: { Authorization: `Bearer ${token}` }
    })
}