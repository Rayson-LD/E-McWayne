import {useEffect} from 'react'
import Footer from '../components/Footer'
import {useSelector,useDispatch} from'react-redux'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
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
          <Loader skeletons={6} w={'w-80'} h={'h-60'}/>
          </div>
          </div>
        : error ? <Message error={error} color={error}/>
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