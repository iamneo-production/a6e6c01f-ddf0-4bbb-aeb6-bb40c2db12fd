import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserService, loginUserService } from "../api/userService";
import {toast} from "react-toastify";

export const loginUser =
    createAsyncThunk('user/loginUser', async (body) => {
        return loginUserService(body.email, body.password)
            .then((res) => {
                console.log(res)
                return res.data
            }).catch((err) => {
                console.log(err)
                return err.data
            })
    })

export const signupUser =
    createAsyncThunk('user/signupUser', async (body) => {
        return createUserService(body.firstName, body.lastName, body.email, body.password, body.phone, body.roles)
            .then((res) => {
                console.log(res.data)
                return res.data
            }).catch((err) => {
                console.log(err)
                return err.data
            })
    })

export const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            roles: '',
            id: ''
        },
        token: null,
        signupInProgress:false,
        signinInProgress:false,
        signinSuccess: false,
        signupSuccess: false
    },
    reducers: {
        signup: (state, actions) => {
            console.log(actions.payload)

        }

    },
    extraReducers: {
        [loginUser.pending]: (state) => {
            state.signinInProgress = true
            console.log("pending")
        },
        [loginUser.fulfilled]: (state, action) => {
            state.signinInProgress = false
            console.log("Fulfilled")
            console.log(action)
            if(action.payload !== undefined){
                if (action.payload.message === "success") {
                    state.token = action.payload.data.token
                    state.currentUser.firstName = action.payload.data.currentUser.firstName
                    state.currentUser.lastName = action.payload.data.currentUser.lastName
                    state.currentUser.email = action.payload.data.currentUser.email
                    state.currentUser.phone = action.payload.data.currentUser.phone
                    state.currentUser.roles = action.payload.data.currentUser.roles
                    state.currentUser.id = action.payload.data.currentUser.id
                    state.signinSuccess = true
                } else {
                    toast.error(action.payload.message, {
                        position: toast.POSITION.TOP_CENTER
                    });
                }
            }else {
                toast.error("Try again after sometime", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        },
        [loginUser.rejected]: (state) => {
            console.log("login  failed")
            alert("login failed,Try again")
            state.signinInProgress = false
        },
        [signupUser.pending]: (state) => {
            console.log("pending")
            state.signupInProgress = true
        },
        [signupUser.fulfilled]: (state, action) => {
            console.log("Fulfilled")
            state.signupInProgress = false
            if(action.payload !== undefined){
                if (action.payload.message === "success") {
                    state.signupSuccess = true
                    toast('Account Created Successfully', {
                        position: toast.POSITION.TOP_CENTER
                    });
                } else {
                    toast.error(action.payload.message, {
                        position: toast.POSITION.TOP_CENTER
                    });
                    //alert(action.payload.message)
                }
            }else {
                toast.error("Try again after sometime", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        },
        [signupUser.rejected]: (state) => {
            console.log("signup  failed")
            alert("login failed,Try again")
            state.signupInProgress = false
        },
    }
})


export const { signup } = userSlice.actions

export const userReducer = userSlice.reducer


