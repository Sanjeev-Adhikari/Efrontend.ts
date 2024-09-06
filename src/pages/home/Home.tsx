import { useEffect } from "react"
import Card from "../../globals/components/cards/Card"
import Footer from "../../globals/components/footer/Footer"
import Navbar from "../../globals/components/navbar/Navbar"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import Hero from "./components/Hero"
import { getProducts } from "../../store/productSlice"

const Home = () => {
  const dispatch = useAppDispatch()
  const {status, product} = useAppSelector((state)=>state.products)
  useEffect(()=>{
    dispatch(getProducts())
  },[])
  console.log(product)
  return (
    <>
    
    {/* Hero Section: Image Side with Simple Header */}
 <Navbar/>
 <Hero />

    {/* END Hero Section: Image Side with Simple Header */}
    <div className="flex flex-col items-center mt-10">
    <h1 className="text-4xl font-bold text-gray-600 text-center">Top Products</h1>
   <div className="flex flex-wrap justify-center gap-6">
 {
  product.length > 0 && product.map((pd)=>{
    return (
      <Card key={pd.id} data={pd}/>
    )
  })
 }
   
   </div>
    </div>
<div className="mt-20">
<Footer/>
</div>

  </>
  )
}

export default Home