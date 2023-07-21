import axios from "axios";
import {baseUrl} from "./config";

export async function getAddress(token){
    return await axios.get(`${baseUrl}/address`,{
        headers: { Authorization: `Bearer ${token}` }
    })
}

export async function deleteAddress(token,addressId){
    return await axios.delete(`${baseUrl}/address?addressId=${addressId}`,{
        headers: { Authorization: `Bearer ${token}` }
    })
}

export async function createAddress(token,body){
    return await axios.post(`${baseUrl}/address`,{
        "flatNo":body.flatNo,
        "area":body.area,
        "city":body.city,
        "state":body.state,
        "pincode":body.pincode,

    },{
        headers: {Authorization: `Bearer ${token}`}
    })
}

export async function changeAddress(token,body){
    return await axios.put(`${baseUrl}/address?addressId=${body.addressId}`,{
        "flatNo":body.flatNo,
        "area":body.area,
        "city":body.city,
        "state":body.state,
        "pincode":body.pincode,
    },{
        headers: {Authorization: `Bearer ${token}`}
    })
}