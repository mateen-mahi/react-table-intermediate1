//Store For using Redux Toolkit 

import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Features/Counter/ProductSlice"

export const store = configureStore({
    reducer:{
        products:productReducer,
    }
})