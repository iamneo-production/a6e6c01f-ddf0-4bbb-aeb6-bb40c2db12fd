import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserService, loginUserService,disabledBuyerById,deletedBuyerById,getAllUser, getUserById,updateUserById  } from "../api/userService";
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
export const fetchAllUsers =
    createAsyncThunk('user/fetchAllUsers', async (body) => {
        return getAllUser(
            body.token
        ).then((res) => {
            return res.data
        }).catch((err) => {
            return err.response.data
        })
    })


export const fetchUserById =
    createAsyncThunk('user/fetchUserById', async (body) => {
        console.log("from slice")
        console.log(body)
        return getUserById(
            body.token,
            body.id
        ).then((res) => {
            return res.data
        }).catch((err) => {
            return err.response.data
        })
    })

    export const updateUser = createAsyncThunk(
        'user/updateUser',
        async ({ token, id, updatedUser }) => {
          try {
            const response = await updateUserById(token, id, updatedUser);
            return response.data;
          } catch (error) {
            throw error;
          }
        }
    );

   export const disableBuyer = createAsyncThunk(
        'user/disableBuyer',
        async ({ token, id }) => {
          try {
            const response = await disabledBuyerById(token, id);
            return response.data;
          } catch (error) {
            throw error;
          }
        }
    );
    export const deleteBuyer = createAsyncThunk(
        'user/deleteBuyer',
        async ({ token, id }) => {
          try {
            const response = await deletedBuyerById(token, id);
            return response.data;
          } catch (error) {
            throw error;
          }
        }
    );
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
        signupSuccess: false,
        fetchUserInProcess: false,
        allUserList: [],
        allActionList:[],
        selectedUser:''
    },
    reducers: {
        signup: (state, actions) => {
            console.log(actions.payload)

        },
        setSelectedUser:(state,action) =>{
            state.selectedUser = action.payload.id
        },
        

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
        [fetchAllUsers.pending]: (state) => {
            state.fetchUserInProcess = true
            console.log("pending")
        },
        [fetchAllUsers.fulfilled]: (state, action) => {
            if(action.payload){
                state.allUserList =action.payload
                console.log("Users fetched")
                console.log(state.allUserList)
            }else{
                console.log("User Not fetched")
            }
            state.fetchUserInProcess = false
        },
        [fetchAllUsers.rejected]: (state) => {
            state.fetchUserInProcess = false
            console.log("Users fetch failed")
        },
        [fetchUserById.pending]: (state) => {
            state.fetchUserInProcess = true
            console.log("pending")
        },
        [fetchUserById.fulfilled]: (state, action) => {
            if(action.payload.message ==="success"){
                state.userDetails = action.payload.data
                console.log("Users fetched")
                console.log(state.userList)
            }else {
                console.log(action.payload.message)
            }
            state.fetchUserInProcess = false;
        },
        [fetchUserById.rejected]: (state) => {
            state.fetchUserInProcess = false;
            console.log("Fetching user by ID failed");
            
        },
        [updateUser.fulfilled]: (state, action) => {
            // Assuming the response data includes the updated product details
            state.currentUser.firstName = action.payload.firstName
            state.currentUser.lastName = action.payload.lastName
            state.currentUser.email = action.payload.email
            state.currentUser.phone = action.payload.phone
            state.userDetails = action.payload;
        },
        [disableBuyer.fulfilled]: (state, action) => {
            console.log("Buyer diabled")


        },


        [deleteBuyer.fulfilled]: (state, action) => {
            console.log("Buyer deleted")


        },


    }
})


export const { signup, disableUser, deleteUser } = userSlice.actions

export const userReducer = userSlice.reducer


