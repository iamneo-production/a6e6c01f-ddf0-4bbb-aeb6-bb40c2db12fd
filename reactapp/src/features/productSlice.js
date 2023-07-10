import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createProduct, getProduct} from "../api/productService";

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


const productSlice = createSlice({
    name: "product", initialState: {
        addProductInProcess:false,
        fetchProductInProcess:false,
        productList: []
    },
    extraReducers:{
        [addProduct.pending]:(state) => {
            state.addProductInProcess = true
            console.log("Product Add pending")
        },
        [addProduct.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                console.log('Product Added');
            }else {
               console.log('Please try again!!');
            }
            state.addProductInProcess =false
        },
        [addProduct.rejected]:(state)=>{
            state.addProductInProcess = false
            console.log("Product Create failed");
        },
        [fetchProduct.pending]:(state) => {
            state.fetchProductInProcess = true
            console.log("pending")
        },
        [fetchProduct.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                console.log(state.productList)
                state.productList = action.payload.data
                console.log("Product fetched")
                console.log(state.productList)
            }else {
                console.log(action.payload.message)
            }
            state.fetchProductInProcess =false
        },
        [fetchProduct.rejected]:(state)=>{
            state.fetchProductInProcess = false
            console.log("Product fetch failed")
        },
    }
})

export const {} = productSlice.actions;



export const productReducer = productSlice.reducer;