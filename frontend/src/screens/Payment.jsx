import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from'react-redux'
import {savePaymentMethod} from '../actions/cartActions.js'
import Checkout from '../components/Checkout.jsx'
import Header from '../components/Header.jsx'
function Payment() {
    const ship = useSelector(state => state.cart)
    const {shippingAddress} = ship
    const [Payment, setPayment] = useState('PayPal')
    
    const dispatch = useDispatch()
    const navigate  = useNavigate()
    if(!shippingAddress)
    {
        navigate('/shipping');
    }
    const submitHandler = ()=>{
        dispatch(savePaymentMethod(Payment)) 
        navigate('/placeOrder')
    }
  return (
      <>
      <Header/>
      <Checkout step1 step2 step3/>
    <div class="flex mt-5 justify-center bg-base-100">      
    <div class="card  w-80 mt-5  shadow-2xl bg-base-100">
      <div class="card-body">
      <h2 class="card-title">Select Payment Method</h2>
      <div class="form-control">
            <label class="label cursor-pointer">
            <span class="label-text">PayPal</span> 
                <input type="radio" id="PayPal" name="radio-6" value="PayPal" onChange={(e)=>setPayment(e.target.value)} class="radio checked:bg-red-500" checked/>
                
            </label>
            </div>
            <div class="form-control">
            <label class="label cursor-pointer">
            <span class="label-text">Credit/Debit</span>  
                <input type="radio" id="Stripe" name="radio-6" value="Stripe" onChange={(e)=>setPayment(e.target.value)} class="radio checked:bg-green-500" />
                
            </label>
            </div>
            <div class="form-control">
            <label class="label cursor-pointer"> 
            <span class="label-text">Cash On Delivery</span> 
                <input type="radio" id="Cash On Delivery" name="radio-6" value="Cash On Delivery" onChange={(e)=>setPayment(e.target.value)} class="radio checked:bg-blue-500" />
                
            </label>
            </div>
        <div class="form-control mt-6">
          <button class="btn btn-primary" onClick={()=>submitHandler()}>Select Payment</button>
        </div>
      </div>
    </div>

</div>
       
</>
  )
}

export default Payment