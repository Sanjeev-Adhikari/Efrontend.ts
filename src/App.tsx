import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import './App.css'
import Home from './pages/home/Home'
import Register from './pages/auth/register/Register'
import Login from './pages/auth/login/Login'
import SingleProduct from './pages/products/singleProduct'

function App() {
  return (
    <>
   <Provider store = {store}>
   <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Home/>} />
        <Route path = '/register' element = {<Register/>} />
        <Route path = '/login' element = {<Login/>} />
        <Route path = '/product/:id' element = {<SingleProduct/>} />
      </Routes>
    </BrowserRouter>
   </Provider>
    </>
  )
}

export default App
