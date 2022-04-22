import {useEffect} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import {useSelector,useDispatch} from'react-redux'
import Checkout from '../components/Checkout.jsx'
import Header from '../components/Header.jsx'
import {createOrder} from '../actions/orderActions.js'
function PlaceOrder() {
    const details = useSelector(state => state.cart)
    const orderDetails = useSelector(state => state.order)
    const {success,order} = orderDetails
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {shippingAddress,cartItems,paymentMethod} = details
     details.ItemsPrice = cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)
     details.shippingPrice = details.ItemsPrice<200? 70:0
     details.Tax = (details.ItemsPrice*0.25).toFixed(2)
     details.Total = (Number(details.ItemsPrice) + Number(details.shippingPrice) + Number(details.Tax)).toFixed(2)
  
    useEffect(() => {
      if(success)
      {
        navigate(`/orders/${order._id}`)
      }
    
    }, [success,order,navigate])
    

     const submitHandler = ()=>{
      dispatch(createOrder({
        shippingAddress,
        orderItems:cartItems,
        paymentMethod,
        itemsPrice: details.ItemsPrice,
        shippingPrice: details.shippingPrice,
        taxPrice: details.Tax,
        totalPrice: details.Total,
      }))
      
  }
  return (
      <>
      <Header/>
      <Checkout step1 step2 step3 step4/>
    <div class="flex flex-col w-full lg:flex-row mt-3 mb-3">
  <div class="grid flex-grow  card bg-ghost rounded-box place-items-center">
    <h1 class='text-3xl mt-10'>SHIPPING</h1>
    <hr width='30%'/>
    <p class=' mt-3 '>Address : {shippingAddress.Address}, {shippingAddress.City}, {shippingAddress.Country} - {shippingAddress.Pin}</p>  
    <h1 class='text-3xl mt-10'>PAYMENT METHOD</h1>
    <hr width='25%'/>
    <p class=' mt-3 '>Method : {paymentMethod}</p>
    <h1 class='text-3xl mt-10'>ORDER ITEMS</h1>
    <hr width='25%'/>
    <table class="table w-full  mt-3">
        <tbody>
        {cartItems.map((p)=>(
          
          <tr class="hover">
            <td><img src={p.image} class='w-6 h-6 rounded-full' alt={p.name} /></td>
            <td><Link to={`/product/pid=${p.product}/item=${p.name}`}>{p.name} </Link></td>
            <td>{p.qty} X {p.price} = {(p.qty*p.price).toFixed(2)}</td>
          </tr>
              ))}
        </tbody>
      </table>
    </div> 
  <div class="divider lg:divider-horizontal"></div> 
  <div class="grid flex-grow  card bg-ghost rounded-box place-items-center">
  <h1 class='text-3xl mt-3'>ORDER SUMMARY</h1>
    <hr width='75%'/>
    <table class="table w-full  mt-3 text-center flex place-items-center">
        <tbody>
          <tr >
            <td>Items:</td>
            <td>Rs : {details.ItemsPrice}</td>
          </tr>
          <tr >
            <td>Shipping:</td>
            <td>Rs : {details.shippingPrice}</td>
          </tr>
          <tr >
            <td>Tax:</td>
            <td>Rs : {details.Tax}</td>
          </tr>
          <tr >
            <td>Total:</td>
            <td>Rs : {details.Total}</td>
          </tr>
        </tbody>
      </table>
      <button class="btn btn-outline btn-success w-96" style={{borderRadius:0}} onClick={()=>submitHandler()}>PLACE ORDER</button>
  </div>
</div>
</>
  )
}

export default PlaceOrder