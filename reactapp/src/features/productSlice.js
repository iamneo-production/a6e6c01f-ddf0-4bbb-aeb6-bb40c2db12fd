import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createProduct,deleteProductById, getProduct,getProductById} from "../api/productService";
import {toast} from "react-toastify";

export const addProduct =
    createAsyncThunk('product/addProduct',async (body)=>{
        return  createProduct(body.token,body
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

export const fetchProduct =
    createAsyncThunk('product/fetchProduct',async (body)=>{
        return  getProduct(
            body.token
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

    export const fetchProductById =
    createAsyncThunk('product/fetchProductById',async (body)=>{
        console.log("from slice")
        console.log(body)
        return  getProductById(
            body.token,
            body.productId
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

    export const deleteProduct =
    createAsyncThunk('product/deleteProduct',async (body)=>{
        return  deleteProductById(
            body.token,
            body.productId
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })



const productSlice = createSlice({
    name: "product", initialState: {
        addProductInProcess:false,
        fetchProductInProcess:false,
        allProductList: [],
        selectedProduct:'',
        productDetails:''
    },
    reducers:{
        setSelectedProduct:(state,action) =>{
            state.selectedProduct = action.payload.productId
        }
    },
    extraReducers:{
        [addProduct.pending]:(state) => {
            state.addProductInProcess = true
            console.log("Product Add pending")
        },
        [addProduct.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                toast.success('Product Added Successfully', {
                    position: toast.POSITION.TOP_CENTER
                });
            }else {
                toast.error('Please try again!!', {
                    position: toast.POSITION.TOP_CENTER
                });
            }
            state.addProductInProcess =false
        },
        [addProduct.rejected]:(state)=>{
            state.addProductInProcess = false
            toast.error("Product Create failed", {
                position: toast.POSITION.TOP_CENTER
            });
        },
        [fetchProduct.pending]:(state) => {
            state.fetchProductInProcess = true
            console.log("pending")
        },
        [fetchProduct.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                state.allProductList = action.payload.data
                console.log("Product fetched")
                console.log(state.allProductList)
            }else {
                console.log(action.payload.message)
            }
            state.fetchProductInProcess =false
        },
        [fetchProduct.rejected]:(state)=>{
            state.fetchProductInProcess = false
            console.log("Product fetch failed")
        },
        [fetchProductById.pending]:(state) => {
            state.fetchProductInProcess = true
            console.log("pending")
        },
        [fetchProductById.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                state.productDetails = action.payload.data
                console.log("Product fetched")
                console.log(state.productList)
            }else {
                console.log(action.payload.message)
            }
            state.fetchProductInProcess =false
        },
        [fetchProductById.rejected]:(state)=>{
            state.fetchProductInProcess = false
            console.log("Product fetch failed")
        },
        [fetchProduct.rejected]:(state)=>{
            state.fetchProductInProcess = false
            console.log("Product fetch failed")
        },
        [deleteProduct.pending]:(state) => {
            console.log("pending")
        },
        [deleteProduct.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                console.log("Product deleted")
            }else {
                console.log(action.payload)
            }
        },
        [deleteProduct.rejected]:(state)=>{
            console.log("Product fetch failed")
        },
    }
})

export const {setSelectedProduct} = productSlice.actions;



export const productReducer = productSlice.reducer;