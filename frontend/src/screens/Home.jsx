import {useState,useEffect} from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import axios from 'axios'
import ProductCard from '../components/ProductCard'
function Home() {
  const [products, setproducts] = useState([]);
  useEffect(() => {
    
  
    const fetchData = async() => {
      const  items = await axios.get('/api/products');
      setproducts(items.data)
    }
    fetchData()
  }, [])
  
  return (
    <div>
        <Header/>
        <h1 className='text-3xl text-bold'>Our Latest Products</h1>
        <div className="overflow-x-auto">
        <div className="grid grid-rows-1 grid-flow-col gap-4">
    {products.map((product)=>(
              <ProductCard key={product._id} name={product.name} desc={product.description} img={product.image} rating={product.rating} reviews={product.numReviews} id={product._id}/>
    ))} 
</div>
</div>
        <Footer/>
    </div>
  )
}

export default Home