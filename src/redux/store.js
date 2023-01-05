import {configureStore} from "@reduxjs/toolkit";
import Cartslide from "./slices/Cartslide";
const store = configureStore({
    reducer:{
        cart:Cartslide,
    },
})
export default store;