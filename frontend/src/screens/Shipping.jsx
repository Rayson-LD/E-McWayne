import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from'react-redux'
import {shipping} from '../actions/cartActions.js'
function Shipping() {
    const ship = useSelector(state => state.cart)
    const {shippingAddress} = ship
    const [Address, setAddress] = useState(shippingAddress.Address)
    const [City, setCity] = useState(shippingAddress.City)
    const [Pin, setPin] = useState(shippingAddress.Pin)
    const [Country, setCountry] = useState(shippingAddress.Country)
    
    const dispatch = useDispatch()
    const navigate  = useNavigate()
    const submitHandler = ()=>{
       
        dispatch(shipping({Address,City,Pin,Country})) 
        navigate('/payment')
    }
  return (
      <>
    <div class="hero min-h-screen bg-base-200">
       
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Add Your Address</h1>
      <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body">
      <div class="form-control">
          <label class="label">
            <span class="label-text">Address</span>
          </label>
          <input type="text" value={Address} onChange={(e)=>setAddress(e.target.value)} placeholder="Address" class="input input-bordered" required/>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">City</span>
          </label>
          <input type="text" value={City} onChange={(e)=>setCity(e.target.value)} placeholder="City" class="input input-bordered" required/>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Pin</span>
          </label>
          <input type="text" value={Pin} placeholder="Pin" onChange={(e)=>setPin(e.target.value)}  class="input input-bordered" required/>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Country</span>
          </label>
          <input type="text" value={Country} placeholder="Country" onChange={(e)=>setCountry(e.target.value)}  class="input input-bordered" required/>
        </div>
        <div class="form-control mt-6">
          <button class="btn btn-primary" onClick={()=>submitHandler()}>Add Shipping Address</button>
        </div>
      </div>
    </div>
  </div>
  
 
</div>

       
</>
  )
}

export default Shipping