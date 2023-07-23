import axios from "axios";
import {baseUrl} from "./config";

export async function createProduct(token,body){
    return await axios.post(`${baseUrl}/seller/products`,{
        "name":body.name,
        "description":body.description,
        "price":body.price,
        "quantity":body.quantity,
        "brand":body.brand,
        "colour":body.colour,
        "image":body.image,
        "sellerId":body.sellerId,
        "category":body.category
    },{
        headers: { "Content-Type":'multipart/form-data', Authorization: `Bearer ${token}`}
    })
}


export async function getProduct(token){
    return await axios.get(`${baseUrl}/products`,{
        headers: { Authorization: `Bearer ${token}` }
    })
}


export async function getProductById(token,productId){
    return await axios.get(`${baseUrl}/products/product-detail?productId=${productId}`,{
        headers: { Authorization: `Bearer ${token}` }
    })
}

export async function deleteProductById(token,productId){
    return await axios.delete(`${baseUrl}/seller/product-delete?productId=${productId}`,{
        headers: { Authorization: `Bearer ${token}` }
    })
}

export async function getProductBySellerId(token){
    return await axios.get(`${baseUrl}/products/seller`,{
        headers: { Authorization: `Bearer ${token}` }
    })
}

export async function getProductBySearch(token,query){
    return await axios.get(`${baseUrl}/search?query=${query}`,{
        headers: { Authorization: `Bearer ${token}` }
    })
}

export async function getProductByCategory(token,category){
    return await axios.get(`${baseUrl}/products/category?category=${category}`,{
        headers: { Authorization: `Bearer ${token}` }
    })
}

export async function updateProductById(token, productId, updatedProduct) {
    return await axios.put(`${baseUrl}/seller/products/${productId}`, {
        "name":updatedProduct.name,
        "description":updatedProduct.description,
        "price":updatedProduct.price,
        "quantity":updatedProduct.quantity,
        "brand":updatedProduct.brand,
        "colour":updatedProduct.colour,
        "category":updatedProduct.category
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

export async function updateProductImageById(token, productId, image) {
    return await axios.put(`${baseUrl}/seller/product/update-image/${productId}`, {
        "image":image,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    });
}
export async function getProductBySellerIdd(id) {
    return await axios.get(`${baseUrl}/auth/selleridd/${id}`);
  }
