import {combineReducers,configureStore} from "@reduxjs/toolkit";
import {userReducer} from './features/userSlice';
import { productReducer } from "./features/productSlice";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {cartReducer} from "./features/cartSlice";
import { addressReducer } from "./features/addressSlice";
import {qaReducer} from "./features/qaSlice";
import {purchaseReducer} from "./features/purchaseSlice";

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["logout"],
};

const rootReducer = combineReducers({
    user:userReducer,
    product:productReducer,
    cart:cartReducer,
    address:addressReducer,
    qa:qaReducer,
    purchase:purchaseReducer
});

const persistedReducer = persistReducer(persistConfig, (state, action) => {
    if (action.type === "logout/logout") {
        state = rootReducer(undefined, action);
    }
    return rootReducer(state, action);
});

const store = configureStore({
    reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };