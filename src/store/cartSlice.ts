import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Cart, CartState } from "../globals/types/cartTypes";
import { Status } from '../globals/types/types'
import {AppDispatch} from './store'
import { APIAuthenticated } from '../http';

interface DeleteAction{
   
    productId : string
}
 interface DeleteAction2{
    productIDs : string[],
 }
interface UpdateAction extends DeleteAction{
    quantity: number
}

const initialState : CartState = {
    items : [],
    status : Status.LOADING
}

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        setItem(state:CartState, action:PayloadAction<Cart[]>){
            state.items = action.payload
        },
        setStatus(state:CartState, action:PayloadAction<Status>){
            state.status = action.payload
        },
        setDeleteAction(state:CartState, action:PayloadAction<DeleteAction>){
            const index = state.items.findIndex((item)=>item.Product.id === action.payload.productId)
            state.items.splice(index, 1)
        },
        setDeleteAction2(state:CartState, action:PayloadAction<DeleteAction2>){
           for(var i = 0; i < action.payload.productIDs.length; i++){
            const index = state.items.findIndex((item)=>item.Product.id === action.payload.productIDs[i])
            state.items.splice(index, 1)
           }
        },
        setUpdateAction(state:CartState, action:PayloadAction<UpdateAction>){
            const index = state.items.findIndex((item)=>item.Product.id === action.payload.productId)
            if(index !== -1){
                state.items[index].quantity = action.payload.quantity
            }

        }
    }
})

export const {setStatus, setItem, setDeleteAction, setUpdateAction, setDeleteAction2} = cartSlice.actions
export default cartSlice.reducer

export function addToCart(productId: string){
    return async function addToCartThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.post('customer/cart', {
                productId,
                quantity : 1
            })
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setItem(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function fetchCartItems(){
    return async function fetchCartItemsThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.get("customer/cart")
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setItem(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function deleteItemFromCart(productId: string){
    return async function deleteItemFromCartThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.delete(`/customer/cart/${productId}`)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setDeleteAction({productId}))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function updateItemInCart(productId:string, quantity:number){
    return async function updateItemInCartThunk(dispatch: AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.patch(`/customer/cart/${productId}`, {
                quantity
            })
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setUpdateAction({productId, quantity}))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}