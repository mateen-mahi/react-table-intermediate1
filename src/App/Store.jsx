import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "../Features/Counter/CounterSlice";
import productReducer from "../Features/Counter/ProductSlice"

export const store = configureStore({
    reducer:{
        show:CounterReducer,
        products:productReducer
    }
})