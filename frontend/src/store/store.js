import {configureStore} from "@reduxjs/toolkit";
import { authReducer } from "../features/authentication/slice/authSlice";
import cartSlice from "../features/cart/slices/cartSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartSlice.reducer,
    },
})

export default store;