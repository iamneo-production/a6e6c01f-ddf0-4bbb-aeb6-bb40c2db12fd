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