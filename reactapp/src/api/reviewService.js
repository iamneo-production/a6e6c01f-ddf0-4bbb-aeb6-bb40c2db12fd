import axios from "axios";
const baseURL = "http://localhost:8080";

export function ADD_REVIEW(purchaseId, comment, rating) {
    const url = `${baseURL}/review/${purchaseId}`;
    const config = {
        method: "post",
        url: url,
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            purchaseId: purchaseId,
            comment: comment,
            rating: rating,
        },
    };

    return axios(config);
}


export function GET_REVIEWS_BY_PURCHASE(purchaseId) {
    const url = `${baseURL}/review/purchase/${purchaseId}`;
    const config = {
        method: 'get',
        url: url,
    };

    return axios(config)
}


export function UPDATE_REVIEW(purchaseId, data) {
    const url = `${baseURL}/review/${purchaseId}`;
    const config = {
        method: 'put',
        url: url,
        data: data
    }
    return axios(config)
}