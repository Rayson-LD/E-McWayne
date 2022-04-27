import {useEffect,useState} from 'react'
import { useParams, Link} from 'react-router-dom'
import Header from '../components/Header'
import Rating from '../components/Rating'
import Message from '../components/Message'
import {useSelector,useDispatch} from'react-redux'
import { listProductDetails,reviewList } from '../actions/productActions'
import Meta from '../components/Meta'
function SingleProductScreen() {
  const param = useParams()
  const dispatch = useDispatch()
  const [rating, setrating] = useState(0.5)
  const [comment, setcomment] = useState('')
  const productList = useSelector(state => state.productDetails)
  const {product} = productList

  const userDetails = useSelector(state => state.userDetails)
  const {userInfo} = userDetails

  const reviewDetails = useSelector(state => state.reviews)
  const {success,error} = reviewDetails
  useEffect(() => {
    if(success)
    {
      setrating(0)
      setcomment('')
      dispatch({type:'PRODUCT_REVIEW_RESET'})
    }
    dispatch(listProductDetails(param.id))
  }, [dispatch,param,success])

  const Change = (e) =>{

    if(e.target.id === 'comment')
    {
        setcomment(e.target.value)
    }
    if(e.target.id === 'rating')
    {
        setrating(e.target.value)
    }
}
const submitHandler = () =>{
  dispatch(reviewList(param.id,{rating,comment}))
}
  return (

    <div>
      <Meta title={product.name}/>
      <Header/>
      <div className="flex flex-col w-full lg:flex-row mt-5">
        <div className="grid flex-grow px-2 bg-ghost rounded-box place-items-left">
          <img src={product.image} alt="Shoes" className="rounded-xl" />
          <div className="grid grid-rows-1 grid-flow-col gap-2 pt-5">
            <Link to={`/cart/pid=${param.id}`}>
          <button style={{borderRadius:'0',borderWidth:'2px',color:'yellow'}} className="btn btn-outline w-40 gap-2"  disabled={product.countInStock===0}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            ADD TO CART
          </button>
          </Link>
          {product.countInStock>0&&
          <button style={{borderRadius:'0',borderWidth:'2px',color:'orange'}} className="btn btn-outline w-40 gap-2 ">
            BUY NOW
          </button>
          }
          </div>
          </div> 
        <div className="divider lg:divider-horizontal"></div> 
        <div className="flex-grow  card bg-ghost rounded-box place-items-left ">
          <h1 className="text-3xl text-bold">{product.name}</h1>
          <Rating rating={product.rating} reviews={product.numReviews}/>
          <p className='text-bold text-5xl pt-5'>Rs : {product.price}</p>
          <p className='text-bold  pt-5'>Brand : {product.brand}</p>
          <p className='text-bold  pt-5'>Category : {product.category}</p>
          <p className='text-bold  pt-5'>{`Brand Warranty of ${product.warranty} ${product.warranty > 1 ?'Years': 'Year'}`}</p>
          <div className="grid grid-rows-1 grid-flow-col gap-2 pt-5">
          <p className='text-gray'>Description :</p>
          <p className='justify-center px-2'>{product.description}</p>
         
          </div>
          <h1 className='text-3xl text-bold text-error pt-5'>{`${product.countInStock>0?`Only ${product.countInStock} Left in Stocks`:"Item Coming Soon"}`} </h1>
          </div>
      </div>
      <h1 class='text-3xl mt-3 text-center'>WRITE A REVIEW</h1>
      {error && <Message error={error} color='alert-error'/>}
      {userInfo?( <div className="hero-content flex-col  m-auto  border-2 border-opposite">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100" style={{borderRadius:0}}>
      <div className="card-body">
        <div className="form-control">
            <label className="label">
            <span className="label-text">Your Message</span>
            </label> 
            <textarea className="textarea textarea-bordered h-24" id="comment" value={comment} onChange={Change} placeholder="Message" required></textarea>

        </div>
        <div className="form-control">
            <label className="label">
            <span className="label-text">Give Your Rating</span>
            </label> 
            <div className="rating rating-half">
           <input type="radio" name="rating-10" id="rating"  className="mask mask-star bg-orange-400 mask-half-1"  defaultChecked value='0.5'/>
           <input type="radio" name="rating-10" id="rating"  className="mask mask-star bg-orange-400 mask-half-2"   value='1' onClick={Change}/>
           <input type="radio" name="rating-10" id="rating"   className="mask mask-star bg-orange-400 mask-half-1"   value='1.5' onClick={Change}/>
           <input type="radio" name="rating-10" id="rating"    className="mask mask-star bg-orange-400 mask-half-2"   value='2' onClick={Change}/>
           <input type="radio" name="rating-10" id="rating"   className="mask mask-star bg-orange-400 mask-half-1"   value='2.5' onClick={Change}/>
           <input type="radio" name="rating-10" id="rating"   className="mask mask-star bg-orange-400 mask-half-2"   value='3' onClick={Change}/>
           <input type="radio" name="rating-10" id="rating"  className="mask mask-star bg-orange-400 mask-half-1"   value='3.5' onClick={Change}/>
           <input type="radio" name="rating-10" id="rating"  className="mask mask-star bg-orange-400 mask-half-2"   value='4' onClick={Change}/>
           <input type="radio" name="rating-10" id="rating"  className="mask mask-star bg-orange-400 mask-half-1"   value='4.5' onClick={Change}/>
           <input type="radio" name="rating-10" id="rating"  className="mask mask-star bg-orange-400 mask-half-2"   value='5' onClick={Change}/>
     </div>
            
        </div>
       
        <div className="form-control mt-6">
        <button class="btn btn-primary" onClick={()=>submitHandler()}>Write a Review</button>
        </div>
      </div>
      </div>
        </div>):(
          <div class="alert alert-error shadow-lg">
          <div>
            <span>Please <Link to = '/login'>Login</Link> to Sign Up</span>
          </div>
        </div>
        )}
       

      <h1 class='text-3xl mt-3'>REVIEWS</h1>
      {product.reviews.length === 0 &&<Message error='No Reviews Yet' color={'alert-info'}/>}
      {product.reviews.map((r)=>(
        <div class="card w-96 bg-base-100 shadow-xl" key={r.id}>
        <div class="card-body">
          <h2 class="card-title">{r.name}</h2>
          <p>{r.createdAt.substring(0,10)}</p>
          <p>{r.comment}</p>
          <div class="card-actions justify-end">
          <Rating rating={r.rating}/>
          </div>
        </div>
      </div>
      ))}
    </div>
  )
}

export default SingleProductScreen