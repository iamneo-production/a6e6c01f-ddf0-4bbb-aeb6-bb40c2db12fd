import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {createAddress, changeAddress, getAddress, deleteAddress} from "../api/addressService";

export const addAddress =
    createAsyncThunk('address/addAddress',async (body)=>{
        console.log(body)
        return  createAddress(body.token,body
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

export const updateAddress =
    createAsyncThunk('address/updateAddress',async (body)=>{
        console.log(body)
        return  changeAddress(body.token,body
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

export const removeAddress =
    createAsyncThunk('address/removeAddress',async (body)=>{
        console.log(body)
        return  deleteAddress(body.token,body.addressId
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

export const fetchAddress =
    createAsyncThunk('address/fetchAddress',async (body)=>{
        return  getAddress(
            body.token
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

export const addressSlice = createSlice({
    name:"address",
    initialState:{
        addressList:[]
    },
    reducers:{

    },
    extraReducers:{
        [addAddress.pending]:(state) => {
            console.log("Address Add pending")
        },
        [addAddress.fulfilled]:(state,action) =>{
            if(action.payload !== undefined){
                if(action.payload.message ==="success"){
                    toast.success('Address Added Successfully', {
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
        [addAddress.rejected]:(state)=>{
            toast.error("Address Create failed", {
                position: toast.POSITION.TOP_CENTER
            });
        },
        [updateAddress.pending]:(state) => {
            console.log("Address Add pending")
        },
        [updateAddress.fulfilled]:(state,action) =>{
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
        [updateAddress.rejected]:(state)=>{
            toast.error("Address Update failed", {
                position: toast.POSITION.TOP_CENTER
            });
        },
        [removeAddress.pending]:(state) => {
            console.log("remove Address pending")
        },
        [removeAddress.fulfilled]:(state,action) =>{
            if(action.payload !== undefined){
                if(action.payload.message ==="success"){
                    console.log("removed Address")
                    toast.success('Address Removed!', {
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
        [removeAddress.rejected]:(state)=>{
            toast.error("Address remove failed", {
                position: toast.POSITION.TOP_CENTER
            });
        },
        [fetchAddress.pending]:(state) => {
            state.fetchAddressInProcess = true
            console.log("pending")
        },
        [fetchAddress.fulfilled]:(state,action) =>{
            if(action.payload !== undefined){
                if(action.payload.message ==="success"){
                    state.addressList = action.payload.data
                    console.log("Address fetched")
                }else {
                    console.log(action.payload.message)
                }
            }else {
                toast.error("Try again after sometime", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        },
        [fetchAddress.rejected]:(state)=>{
            state.fetchAddressInProcess = false
            console.log("Address fetch failed")
        },
    }
})

export const addressReducer = addressSlice.reducer;