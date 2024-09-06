
import Form from "../component/Form"
import { UserDataType } from "../types/types"
import { register, resetStatus } from "../../../store/authSlice"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Status } from "../../../globals/types/types"


const Register = () => {
  const {status} = useAppSelector((state)=>state.auth)
  console.log(status)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleRegister= async (data:UserDataType)=>{
    dispatch(register(data))
  }
  useEffect(()=>{
    dispatch(resetStatus())
    if(status === Status.SUCCESS){
      navigate("/login")
    }
  },[status])
  return (
   <Form type='register' onSubmit={handleRegister}/>
  )
}

export default Register