import {baseUrl} from "./config";
import axios from "axios";


export async function createUserService(firstName,lastName, email, password, phone, roles) {
    console.log(email)
    return await axios.post(`${baseUrl}/auth/register`, {
        "firstName":firstName,
        "lastName": lastName,
        "email": email,
        "password": password,
        "phone":phone,
        "roles":roles
    })
}

export async function loginUserService(email,password){
    return await axios.post(`${baseUrl}/auth/login`,{
        "email":email,
        "password":password
    })
}


export async function validateTokenService(token){
    return await axios.get(`${baseUrl}/auth/validateToken`,{
        headers: {"Authorization" : token}
    })
}
export async function getAllUser(token){
    return await axios.get(`${baseUrl}/auth/user`,{
        headers: { Authorization: `Bearer ${token}` }
    })
}


export async function getUserById(token,id){
    return await axios.get(`${baseUrl}/auth/user=${id}`,{
        headers: { Authorization: `Bearer ${token}` }
    })
}

export async function updateUserById(token, id, updatedUser) {
    return await axios.put(`${baseUrl}/auth/user/${id}`, updatedUser, {
      headers: { Authorization: `Bearer ${token}` },
    });
}
export async function disabledBuyerById(token, id) {
    return await axios.put(`${baseUrl}/auth/buyer/${id}/disable`, {
      headers: { Authorization: `Bearer ${token}` },
    });
}
export async function deletedBuyerById(token, id) {
    return await axios.put(`${baseUrl}/auth/buyer/${id}/delete`, {
      headers: { Authorization: `Bearer ${token}` },
    });
}


