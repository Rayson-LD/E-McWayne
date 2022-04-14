import {useEffect} from 'react'
import Footer from '../components/Footer'
import {useSelector,useDispatch} from'react-redux'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import { listProducts } from '../actions/productActions'
function Home() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {loading,error,products} = productList
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])
  return (
    <div>
        <Header/>
        <h1 className='text-3xl text-bold'>Our Latest Products</h1>
        {loading?<div className="overflow-x-auto">
        <div className="grid grid-rows-1 grid-flow-col gap-4">
          {products.map(()=>(
                    <div class="w-60 h-96 border-2 rounded-md mx-auto mt-20">
                    <div class="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
                      <div class="w-12 bg-gray-300 h-12 rounded-full ">
                      </div>
                          <div class="flex flex-col space-y-3">
                          <div class="w-36 bg-gray-300 h-6 rounded-md ">
                          </div>
                          <div class="w-24 bg-gray-300 h-6 rounded-md ">
                          </div>
                      </div>
                    </div>
                  </div>
          ))} 
        </div>
        </div>
        : error ? <h1>{error}</h1>
        :<div className="overflow-x-auto">
        <div className="grid grid-rows-1 grid-flow-col gap-4">
          {products.map((product)=>(
                    <ProductCard key={product._id} name={product.name} desc={product.description} img={product.image} rating={product.rating} reviews={product.numReviews} id={product._id}/>
          ))} 
        </div>
        </div>
}
        <Footer/>
    </div>
  )
}

export default Home