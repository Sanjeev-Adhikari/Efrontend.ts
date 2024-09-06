import { Link, useNavigate } from "react-router-dom"
import {  useAppSelector } from "../../../store/hooks"
import { useEffect, useState } from "react"


const Navbar = () => {
  const navigate = useNavigate()
  const {user} = useAppSelector((state)=>state.auth)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useEffect(()=>{
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token || !!user.token)
  },[user.token])
 
  const handleLogout= ()=>{
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    navigate('/login')

  }
  return (
   <>
   {/* Main Header */}
   <header
        id="page-header"
        className="relative flex flex-none items-center py-8"
      >
        {/* Main Header Content */}
        <div className="container mx-auto flex flex-col gap-4 px-4 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-0 lg:px-8 xl:max-w-7xl">
          <div>
            <a
              href="/"
              className="group inline-flex items-center gap-2 text-lg font-bold tracking-wide text-gray-900 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300"
            >
              <span className="text-3xl text-blue-400">E-STORE</span>
            </a>
          </div>
          <nav className="space-x-3 md:space-x-6">
           {
            !isLoggedIn ? (
              <>
               <Link to='/register'
              
              className="text-xl font-semibold text-blue-400 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"  
            >
              <span>Register</span>
            </Link>
            <Link
              to='/login'
              className="text-xl font-semibold text-blue-400 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
            >
              <span>Login</span>
            </Link>
              </>
            ) : (
              <button
              onClick={handleLogout}
              type="button"
               className="text-xl font-semibold text-blue-400 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
            >
              <span>Logout</span>
            </button>
            )
           }
           
          </nav>
        </div>
        {/* END Main Header Content */}
      </header>
      {/* END Main Header */}

   </>
  )
}

export default Navbar