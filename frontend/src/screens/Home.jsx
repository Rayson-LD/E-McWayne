import {useEffect} from 'react'
import { useParams } from 'react-router'
import Footer from '../components/Footer'
import {useSelector,useDispatch} from'react-redux'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import { listProducts,listTopProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Pagination from '../components/Pagination'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
function Home() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {loading,error,products,page,pages} = productList

  const TopOrder = useSelector(state => state.topOrders)
  const {loading:LoadCar,error:ErrorCar,top} = TopOrder
  const params = useParams()
  const Keyword = params.Keyword
  const pageNumber = params.pageNumber || 1
  useEffect(() => {
    console.log(top)
    dispatch(listProducts(Keyword,pageNumber))
    dispatch(listTopProducts())
  }, [dispatch,Keyword,pageNumber])
  return (
    <div>
        <Header/>
        {LoadCar?<Loader skeletons={1} w={'w-full'} h={'h-80'}/>
        :ErrorCar?<Message error={ErrorCar} color={error}/>
        :!Keyword&&<Carousel autoPlay={true}>
          {top.map((p)=>(
            <div key={p.id}>
            <img src={p.image} />
            <p className="legend">{p.name}</p>
        </div>
          ))}
                
            </Carousel>
}
        <h1 className='text-3xl text-bold'>Our Latest Products</h1>
        {products.length === 0 && <Message error='No Such products' color='alert-info'/>}
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
        <Pagination page={page} pages={pages} keyword={Keyword}/>
        </div>
}
        <Footer/>
    </div>
  )
}

export default Home