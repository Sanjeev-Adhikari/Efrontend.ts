import { Link } from "react-router-dom"
import Footer from "../../globals/components/footer/Footer"
import Navbar from "../../globals/components/navbar/Navbar"
import { deleteItemFromCart, updateItemInCart } from "../../store/cartSlice"
import { useAppDispatch, useAppSelector } from "../../store/hooks"

const Cart = () => {
    const {items} = useAppSelector((state)=>state.carts)

    const dispatch = useAppDispatch()

    const deleteCartItem = (productId:string)=>{
        dispatch(deleteItemFromCart(productId))
    }

    const updateCartItem = (productId:string, quantity:number)=>{
        dispatch(updateItemInCart(productId,quantity))
    }
    const totalItemsInCart = items.reduce((total, item)=>item?.quantity + total, 0 )
    const totalAmount = items.reduce((total, item)=>item?.Product?.productPrice * item?.quantity + total, 0 )
    const deliveryCharge = 100
  return (
    <>
    <Navbar />
    <div className="h-full bg-gray-100 pt-20">
    <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div className="rounded-lg md:w-2/3">
      {
        items?.length > 0 && items.map((item)=>{
            return (
                <>
                <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                <img src={item?.Product?.productImageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900"> {item?.Product?.productName} </h2>
                    <p className="text-md">{item?.Product?.Category?.categoryName} </p>
                    <p className="text-md font-bold text-green-500">In Stock: {item?.Product?.productStockQty}</p>
                   
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                      <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={()=>updateCartItem(item?.Product?.id, item?.quantity -1)}> - </span>
                      <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={item?.quantity} min="1"/>
                      <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={()=>updateCartItem(item?.Product?.id, item?.quantity +1)}> + </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-sm">Rs: {item?.Product?.productPrice} </p>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500" onClick={()=>deleteCartItem(item?.Product?.id)}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
                </>
            )
        })
      }    
      </div>
  
      <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
      <div className="mb-2 flex justify-between">
          <p className="text-gray-700">Total items</p>
          <p className="text-gray-700"> {totalItemsInCart}</p>
        </div>
        <div className="mb-2 flex justify-between">
          <p className="text-gray-700">Subtotal</p>
          <p className="text-gray-700">Rs: {totalAmount}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700">Delivery charge</p>
          <p className="text-gray-700">Rs: {deliveryCharge}</p>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-bold">Total</p>
          <div className="">
            <p className="mb-1 text-lg font-bold">Rs: {totalAmount + deliveryCharge}</p>          
          </div>
        </div>
        <Link to={'/checkout'}>
        <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
        </Link>
      </div>
    </div>
  </div>
  <Footer />
    </>
  )
}

export default Cart