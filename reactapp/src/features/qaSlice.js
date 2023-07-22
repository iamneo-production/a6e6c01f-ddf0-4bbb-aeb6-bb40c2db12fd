import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {createQA, getQAByBuyer, getQAByProduct, getQABySeller, updateQA} from "../api/qaService";

export const addQA =
    createAsyncThunk('qa/addQA',async (body)=>{
        return  createQA(body.token,body
        ).then((res) =>{
            console.log("return res.data",res.data)
            return res.data
        }).catch((err) =>{
            return err.response.data
        })
    })

export const answerQA =
    createAsyncThunk('qa/answerQA',async (body)=>{
        return  updateQA(body.token,body
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.data
        })
    })

export const fetchQAByProduct =
    createAsyncThunk('qa/fetchQAByProduct',async (body)=>{
        return  getQAByProduct(
            body.token,
            body.productId
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.data
        })
    })

export const fetchQABySeller =
    createAsyncThunk('qa/fetchQABySeller',async (body)=>{
        return  getQABySeller(
            body.token,
            body.sellerId
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.data
        })
    })

export const fetchQAByBuyer =
    createAsyncThunk('qa/fetchQAByBuyer',async (body)=>{
        return  getQAByBuyer(
            body.token
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.data
        })
    })

export const qaSlice = createSlice({
    name:"qa",
    initialState:{
        qaList:[],
        qaSellerList: [],
        qaBuyerList: []
    },
    reducers:{

    },
    extraReducers:{
        [addQA.pending]:(state) => {
            console.log("QA Add pending")
        },
        [addQA.fulfilled]:(state,action) =>{
            if(action.payload !== undefined){
                if(action.payload.message ==="success"){
                    toast.success('Question Submitted Successfully ', {
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
        [addQA.rejected]:(state)=>{
            toast.error("Question Submit Failed", {
                position: toast.POSITION.TOP_CENTER
            });
        },
        [answerQA.pending]:(state) => {
            console.log("QA Add pending")
        },
        [answerQA.fulfilled]:(state,action) =>{
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
        [answerQA.rejected]:(state)=>{
            toast.error("Question Submit Failed", {
                position: toast.POSITION.TOP_CENTER
            });
        },
        [fetchQAByProduct.pending]:(state) => {
            state.fetchQAInProcess = true
            console.log("pending")
        },
        [fetchQAByProduct.fulfilled]:(state,action) =>{
            if(action.payload !== undefined){
                if(action.payload.message ==="success"){
                    state.qaList = action.payload.data
                    console.log("QA fetched")
                }else {
                    console.log(action.payload.message)
                }
            }else {
                toast.error("Try again after sometime", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        },
        [fetchQAByProduct.rejected]:(state)=>{
            state.fetchQAInProcess = false
            console.log("QA fetch failed")
        },
        [fetchQABySeller.pending]:(state) => {
            console.log("pending")
        },
        [fetchQABySeller.fulfilled]:(state,action) =>{
            if(action.payload !== undefined){
                if(action.payload.message ==="success"){
                    state.qaSellerList = action.payload.data
                    console.log("QA fetched")
                }else {
                    console.log(action.payload.message)
                }
            }else {
                toast.error("Try again after sometime", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        },
        [fetchQABySeller.rejected]:(state)=>{
            console.log("QA fetch failed")
        },
        [fetchQAByBuyer.pending]:(state) => {
            console.log("pending")
        },
        [fetchQAByBuyer.fulfilled]:(state,action) =>{
            if(action.payload !== undefined){
                if(action.payload.message ==="success"){
                    state.qaBuyerList = action.payload.data
                    console.log("QA fetched")
                }else {
                    console.log(action.payload.message)
                }
            }else {
                toast.error("Try again after sometime", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        },
        [fetchQAByBuyer.rejected]:(state)=>{
            console.log("QA fetch failed")
        }
    }
})

export const qaReducer = qaSlice.reducer;