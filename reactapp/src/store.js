import {combineReducers,configureStore} from "@reduxjs/toolkit";
import {userReducer} from './features/userSlice';
import { productReducer } from "./features/productSlice";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {cartReducer} from "./features/cartSlice";
import { addressReducer } from "./features/addressSlice";

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    user:userReducer,
    product:productReducer,
    cart:cartReducer,
    address:addressReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };