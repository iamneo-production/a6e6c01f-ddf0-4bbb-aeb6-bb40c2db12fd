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
                console.log(res)
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
        signinSuccess: false,
        signupSuccess: false
    },
    reducers: {
        signup: (state, actions) => {
            console.log(actions.payload)

        },
        logout: (state) => {
            state.currentUser = {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                roles: '',
                id: ''
            }
            state.token = null

        }

    },
    extraReducers: {
        [loginUser.pending]: (state) => {
            console.log("pending")
        },
        [loginUser.fulfilled]: (state, action) => {
            console.log("Fulfilled")
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
                alert(action.payload.message)
            }
        },
        [loginUser.rejected]: (state) => {
            console.log("login  failed")
            alert("login failed,Try again")
        },
        [signupUser.pending]: (state) => {
            console.log("pending")
        },
        [signupUser.fulfilled]: (state, action) => {
            console.log("Fulfilled")
            if (action.payload.message === "success") {
                state.signupSuccess = true
                toast('Account Created Successfully', {
                    position: toast.POSITION.TOP_CENTER
                });
            } else {
                alert(action.payload.message)
            }
        },
        [signupUser.rejected]: (state) => {
            console.log("signup  failed")
            alert("login failed,Try again")
        },
    }
})


export const { signup, logout } = userSlice.actions

export const userReducer = userSlice.reducer


