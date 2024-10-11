import { configureStore }  from "@reduxjs/toolkit"
import  privateReducer  from "./features/PrivateSlice"

export const store = configureStore({
    reducer: {
        private: privateReducer
    }
})

console.log(privateReducer, "<<<<< error store");


