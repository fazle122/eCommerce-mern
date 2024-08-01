import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";


const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItems:[],shippingAddress:{},paymentMethod:'COD'};



const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((ct) => ct._id === item._id);

            if(existItem){
                state.cartItems = state.cartItems.map((ct) => ct._id === existItem._id ? item : ct);
            }else{
                state.cartItems = [...state.cartItems,item];
            }

            return updateCart(state);
        },
        deleteFromCart:(state,action) =>{
            state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
            return updateCart(state);
        
        },
        saveShippingAddress:(state,action) =>{
            state.shippingAddress = action.payload;
            return updateCart(state);
        } ,
        savePaymentMethod:(state,action) => {
            state.paymentMethod = action.payload;
            return updateCart(state);
        },
        clearCartItems:(state) => {
            state.cartItems = [];
            return updateCart(state);
        }
         
    }
})

export const {addToCart,deleteFromCart,saveShippingAddress,savePaymentMethod,clearCartItems} = cartSlice.actions;
export default cartSlice.reducer ;
         