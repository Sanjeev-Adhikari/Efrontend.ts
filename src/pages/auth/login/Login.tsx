
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import Form from "../component/Form"
import { UserLoginType } from "../types/types"
import { login, resetStatus } from "../../../store/authSlice"
import { Status } from "../../../globals/types/types"
import { useEffect } from "react"

const Login = () => {
  const {status} = useAppSelector((state)=>state.auth)
  const dispatch = useAppDispatch()
  const handleLogin= async (data:UserLoginType)=>{
    dispatch(login(data))
  }
  useEffect(()=>{
    dispatch(resetStatus())
    if(status === Status.SUCCESS){
      window.location.href ='/'
    }
  },[status])
 
  return (
    <Form type = 'login' onSubmit={handleLogin}/>
  )
}

export default Login