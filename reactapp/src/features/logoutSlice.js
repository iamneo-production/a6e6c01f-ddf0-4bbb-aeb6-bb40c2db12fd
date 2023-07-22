import {createSlice} from "@reduxjs/toolkit";
import {userReducer} from "./userSlice";
import {productReducer} from "./productSlice";
import {cartReducer} from "./cartSlice";
import {addressReducer} from "./addressSlice";
import {qaReducer} from "./qaSlice";

const logoutSlice = createSlice({
    name: "logout",
    initialState: {},
    reducers: {
        logout: () => {
            console.log("logout")
            return {
                user:userReducer(undefined, {}),
                product:productReducer(undefined, {}),
                cart:cartReducer(undefined, {}),
                address:addressReducer(undefined, {}),
                qa:qaReducer(undefined, {})
            };
        },
    },
});

export const { logout } = logoutSlice.actions;
export default logoutSlice;