import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {createCart, updateCartQuantity, getCart, deleteCart} from "../api/cartService";

export const addCart =
    createAsyncThunk('cart/addCart',async (body)=>{
        console.log(body)
        return  createCart(body.token,body
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.data
        })
    })

export const updateCart =
    createAsyncThunk('cart/updateCart',async (body)=>{
        console.log(body)
        return  updateCartQuantity(body.token,body
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.data
        })
    })

export const removeCart =
    createAsyncThunk('cart/removeCart',async (body)=>{
        console.log(body)
        return  deleteCart(body.token,body.cartId
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.data
        })
    })

export const fetchCart =
    createAsyncThunk('cart/fetchCart',async (body)=>{
        return  getCart(
            body.token
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.data
        })
    })

export const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cartList:[]
    },
    reducers:{
        
    },
    extraReducers:{
        [addCart.pending]:(state) => {
            console.log("Cart Add pending")
        },
        [addCart.fulfilled]:(state,action) =>{
            if(action.payload !== undefined){
                if(action.payload.message ==="success"){
                    toast.success('Added to Cart ', {
                        position: toast.POSITION.TOP_CENTER
                    });
                }else {
                    toast.error('Please try again!!', {
                        position: toast.POSITION.TOP_CENTER
                    });
                }
            }else {
                toast.error("Try again after sometime", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        },
        [addCart.rejected]:(state)=>{
            toast.error("Cart Create failed", {
                position: toast.POSITION.TOP_CENTER
            });
        },
        [updateCart.pending]:(state) => {
            console.log("Cart Add pending")
        },
        [updateCart.fulfilled]:(state,action) =>{
            if(action.payload !== undefined){
                if(action.payload.message ==="success"){
                    console.log("updated")
                }else {
                    toast.error('Please try again!!', {
                        position: toast.POSITION.TOP_CENTER
                    });
                }
            }else {
                toast.error("Try again after sometime", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        },
        [updateCart.rejected]:(state)=>{
            toast.error("Cart Update failed", {
                position: toast.POSITION.TOP_CENTER
            });
        },
        [removeCart.pending]:(state) => {
            console.log("remove Cart pending")
        },
        [removeCart.fulfilled]:(state,action) =>{
            if(action.payload !== undefined){
                if(action.payload.message ==="success"){
                    console.log("removed Cart")
                    toast.success('Product Removed!', {
                        position: toast.POSITION.TOP_CENTER
                    });
                }else {
                    toast.error('Please try again!!', {
                        position: toast.POSITION.TOP_CENTER
                    });
                }
            }else {
                toast.error("Try again after sometime", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        },
        [removeCart.rejected]:(state)=>{
            toast.error("Cart remove failed", {
                position: toast.POSITION.TOP_CENTER
            });
        },
        [fetchCart.pending]:(state) => {
            state.fetchCartInProcess = true
            console.log("pending")
        },
        [fetchCart.fulfilled]:(state,action) =>{
            if(action.payload !== undefined){
                if(action.payload.message ==="success"){
                    state.cartList = action.payload.data
                    console.log("Cart fetched")
                }else {
                    console.log(action.payload.message)
                }
            }else {
                toast.error("Try again after sometime", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        },
        [fetchCart.rejected]:(state)=>{
            state.fetchCartInProcess = false
            console.log("Cart fetch failed")
        },
    }
})

export const cartReducer = cartSlice.reducer;