import { configureStore } from "@reduxjs/toolkit";
import { apiSLice } from "./slices/apiSlice";
import cartSlice from "./slices/cartSlice";
import authSlice from "./slices/authSlice";

const store = configureStore({
    reducer:{
        [apiSLice.reducerPath]: apiSLice.reducer,
        cart:cartSlice,
        auth:authSlice,
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSLice.middleware),
    devTools:true,
})

export default store;

