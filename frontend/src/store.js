import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlices';
import { apiSlice } from './slices/apiSlice';
// import productsSlice from './slices/productsSlice';

const store = configureStore({
    reducer:{
     auth:authReducer,
     [apiSlice.reducerPath]:apiSlice.reducer,
    //  producs:productsSlice,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
});

export default store;