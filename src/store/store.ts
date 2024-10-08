import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import productSlice from './productSlice'
import cartSlice from './cartSlice.ts'
import checkoutSlice from './checkoutSlice.ts'


const store = configureStore({
    reducer : {
        auth : authSlice,
        products : productSlice,
        carts : cartSlice,
        orders : checkoutSlice
    
    }
})

export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
