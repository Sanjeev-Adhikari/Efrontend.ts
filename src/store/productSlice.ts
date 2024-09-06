import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductState } from "../globals/types/productType";
import { Status } from "../globals/types/types";
import API from "../http";
import { AppDispatch, RootState } from "./store";


const initialState:ProductState = {
product : [],
status : Status.LOADING,
singleProduct:  null
}

const productSlice = createSlice({
  name : 'product',
  initialState,
  reducers : {
    setProduct(state:ProductState, action:PayloadAction<Product[]>){
        state.product = action.payload
    },
    setStatus(state:ProductState, action:PayloadAction<Status>){
        state.status = action.payload
    },
    setSingleProduct(state:ProductState, action:PayloadAction<Product>){
        state.singleProduct = action.payload
    }
  }   
})

export const {setProduct, setStatus, setSingleProduct} = productSlice.actions
export default productSlice.reducer 

export function getProducts(){
    return async function getProductsThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await API.get('product')
            if(response.status === 200){
                const {data} = response.data
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setProduct(data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function getProductById(productId : string){
    return async function getProductByIdThunk(dispatch:AppDispatch, getState : ()=> RootState){
      const state = getState()
      const existingProduct = state.products.product.find((product:Product)=> product.id === productId)
      if(existingProduct){
        dispatch(setSingleProduct(existingProduct))
        dispatch(setStatus(Status.SUCCESS))
        return
      }
        dispatch(setStatus(Status.LOADING))
        try {
            
            const response = await API.get(`product/${productId}`)
           
            if(response.status === 200){
                const {data} = response.data
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setSingleProduct(data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        
      }
    }
}