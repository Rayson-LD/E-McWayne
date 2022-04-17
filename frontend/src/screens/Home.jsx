import {useEffect} from 'react'
import Footer from '../components/Footer'
import {useSelector,useDispatch} from'react-redux'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'

function Home() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {loading,error,products} = productList
  const repeat=[3]
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])
  return (
    <div>
        <Header/>
        <h1 className='text-3xl text-bold'>Our Latest Products</h1>
        {loading?<div className="overflow-x-auto">
        <div className="grid grid-rows-1 grid-flow-col gap-4">
          <Loader />
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