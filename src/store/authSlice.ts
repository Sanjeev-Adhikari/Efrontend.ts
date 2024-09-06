import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import API from '../http'
import { Status } from '../globals/types/types'

interface User{
    username : string,
    email : string,
    password : string,
    token : string,
   
}

interface RegisterUser{
    username : string,
    email : string,
    password : string
}

interface LoginUser{
    email : string,
    password : string,
    
}

interface AuthState{
    user : User,
    status : Status,
    token : string
}
const initialState:AuthState = {
    user : {} as User,
    status : Status.LOADING,
    token : ""
}
const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        setUser(state:AuthState, action:PayloadAction<User>){
            state.user = action.payload
        },
        setStatus(state:AuthState, action:PayloadAction<Status>){
            state.status = action.payload
        },
        resetStatus(state:AuthState){
            state.status = Status.LOADING
        },
        setToken(state:AuthState, action:PayloadAction<string>){
            state.token = action.payload
        },
        setLogout(state:AuthState){
            state.user = {} as User
            state.token = ""
            state.status = Status.SUCCESS
        }
    }

})

export const {setUser, setStatus, setToken, resetStatus, setLogout} = authSlice.actions
export default authSlice.reducer

export function register(data:RegisterUser){
   return async function registerThunk(dispatch:any){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await API.post("register", data)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                // dispatch(setUser(response.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
        
    }
}
export function login(data:LoginUser){
    return async function loginThunk(dispatch:any){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await API.post("login", data)
            
            if(response.status === 200){
                const {data} = response.data
                dispatch(setStatus(Status.SUCCESS))
                // dispatch(setUser(response.data))
                dispatch(setToken(data))
                localStorage.setItem('token', data)
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}