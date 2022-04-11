import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Header from '../components/Header'
import Rating from '../components/Rating'
import axios from 'axios'
function SingleProductScreen() {
  const param = useParams()
  const [product, setproduct] = useState({});
  useEffect(() => {
    const fetchData = async() => {
      const  item = await axios.get(`/api/product/${param.id}`);
      setproduct(item.data)
    }
    fetchData()
  }, [])
  return (
    <div>
      <Header/>
      <div class="flex flex-col w-full lg:flex-row mt-5">
        <div class="grid flex-grow px-2 bg-ghost rounded-box place-items-left">
          <img src={product.image} alt="Shoes" class="rounded-xl" />
          <div class="grid grid-rows-1 grid-flow-col gap-2 pt-5">
          <button style={{borderRadius:'0',borderWidth:'2px',color:'yellow'}} className="btn btn-outline w-40 gap-2" disabled={product.countInStock===0}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            ADD TO CART
          </button>
          {product.countInStock>0&&
          <button style={{borderRadius:'0',borderWidth:'2px',color:'orange'}} className="btn btn-outline w-40 gap-2 ">
            BUY NOW
          </button>
          }
          </div>
          </div> 
        <div class="divider lg:divider-horizontal"></div> 
        <div class="flex-grow  card bg-ghost rounded-box place-items-left ">
          <h1 class="text-3xl text-bold">{product.name}</h1>
          <Rating rating={product.rating} reviews={product.numReviews}/>
          <p className='text-bold text-5xl pt-5'>Rs : {product.price}</p>
          <p className='text-bold  pt-5'>Brand : {product.brand}</p>
          <p className='text-bold  pt-5'>Category : {product.category}</p>
          <p className='text-bold  pt-5'>{`Brand Warranty of ${product.warranty} ${product.warranty > 1 ?'Years': 'Year'}`}</p>
          <div class="grid grid-rows-1 grid-flow-col gap-2 pt-5">
          <p class='text-gray'>Description :</p>
          <p class='justify-center px-2'>{product.description}</p>
         
          </div>
          <h1 class='text-3xl text-bold text-error pt-5'>{`${product.countInStock>0?`Only ${product.countInStock} Left in Stocks`:"Item Coming Soon"}`} </h1>
          </div>
      </div>
    </div>
  )
}

export default SingleProductScreen