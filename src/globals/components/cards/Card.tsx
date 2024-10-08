import { Link } from "react-router-dom"
import { Product } from "../../types/productType"
import { useAppDispatch } from "../../../store/hooks"
import { addToCart } from "../../../store/cartSlice"

interface CardProps{
    data : Product
}

const Card:React.FC<CardProps> = ({data}) => {
    const dispatch = useAppDispatch()
    const handleCart = ()=>{
        dispatch(addToCart(data.id))
    }
  return (
    <>
     <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
        <Link to={`/product/${data.id}`}>
          <img className="rounded-t-lg p-8" src={data?.productImageUrl} alt="product image" />
          <div className="px-5 pb-5">
            <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
              {data?.productName}
            </h3>
            <div className="flex items-center mt-2.5 mb-5">
              {/* Rating icons and more */}
            </div>
          </div>
        </Link>
        <div className="px-5 pb-5">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {data?.productPrice}
            </span>
            <button
              onClick={handleCart}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
 
        </>
  )
}

export default Card