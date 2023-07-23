import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {createPurchase, getPurchaseByBuyer, getPurchaseByProduct,getPurchaseByBuyerIdd} from "../api/purchaseService";

export const addPurchase =
    createAsyncThunk('purchase/addPurchase',async (body)=>{
        return  createPurchase(body.token,body
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.data
        })
    })

export const fetchPurchase =
    createAsyncThunk('purchase/fetchPurchase',async (body)=>{
        return  getPurchaseByBuyer(
            body.token
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.data
        })
    })

export const fetchPurchaseByProduct =
    createAsyncThunk('purchase/fetchPurchaseByProduct',async (body)=>{
        return  getPurchaseByProduct(
            body.token,
            body.productId
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.data
        })
    })
export const fetchPurchaseById =
    createAsyncThunk('purchase/fetchPurchaseById',async (body)=>{
        console.log(body);
        return  getPurchaseByBuyerIdd(
            body.userid
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.data
        })
    })

export const purchaseSlice = createSlice({
    name:"purchase",
    initialState:{
        fetchPurchaseInProcess:'',
        purchaseList:[],
        purchaseListByProduct:[],
        purchaseListById:[],
    },
    reducers:{
        setSelectedPurchase:(state,action) =>{
            state.selectedPurchase = action.payload.buyerId
        },
    },
    extraReducers:{
        [addPurchase.pending]:(state) => {
            console.log("Purchase Add pending")
        },
        [addPurchase.fulfilled]:(state,action) =>{
            if(action.payload !== undefined){
                if(action.payload.message ==="success"){
                    console.log("OrderPlaced")
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
        [addPurchase.rejected]:(state)=>{
            toast.error("Purchase Create failed", {
                position: toast.POSITION.TOP_CENTER
            });
        },
        [fetchPurchase.pending]:(state) => {
            state.fetchPurchaseInProcess = true
            console.log("pending")
        },
        [fetchPurchase.fulfilled]:(state,action) =>{
            if(action.payload !== undefined){
                if(action.payload.message ==="success"){
                    state.purchaseList = action.payload.data
                    console.log("Purchase fetched")
                }else {
                    console.log(action.payload.message)
                }
            }else {
                toast.error("Try again after sometime", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        },
        [fetchPurchase.rejected]:(state)=>{
            state.fetchPurchaseInProcess = false
            console.log("Purchase fetch failed")
        },
        [fetchPurchaseByProduct.pending]:(state) => {
            state.fetchPurchaseInProcess = true
            console.log("pending")
        },
        [fetchPurchaseByProduct.fulfilled]:(state,action) =>{
            if(action.payload !== undefined){
                if(action.payload.message ==="success"){
                    state.purchaseListByProduct = action.payload.data
                    console.log("Purchase fetched")
                }else {
                    console.log(action.payload.message)
                }
            }else {
                toast.error("Try again after sometime", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        },
        [fetchPurchaseByProduct.rejected]:(state)=>{
            state.fetchPurchaseInProcess = false
            console.log("Purchase fetch failed")
        },
         [fetchPurchaseById.pending]:(state) => {
            state.fetchPurchaseInProcess = true
            console.log("pending")
        },
        [fetchPurchaseById.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                state.purchaseListById = action.payload.data
                console.log(state.purchaseListById)
                console.log(action.payload)
                console.log("Purchase fetched")
            }else {
                console.log("purchase failed")
                console.log(action.payload.message)
            }
        },
        [fetchPurchaseById.rejected]:(state)=>{
            state.fetchPurchaseInProcess = false
            console.log("Purchase fetch failed")
        },
    }
})

export const purchaseReducer = purchaseSlice.reducer;
