import {useEffect,useState} from 'react'
import { useParams,Link } from 'react-router-dom'
import {useSelector,useDispatch} from'react-redux'
import Header from '../components/Header.jsx'
import Loader from '../components/Loader.jsx'
import Message from '../components/Message.jsx'
import {getOrder,putPayment} from '../actions/orderActions.js'
import { PayPalButton } from 'react-paypal-button-v2'
import axios from 'axios'
function Order() {
    const orderDetails = useSelector(state => state.order)
    const userDetails = useSelector(state => state.userDetails)
    const payment = useSelector(state => state.payment)
    const [SDKReady, setSDKReady] = useState(false)
    const {userInfo} = userDetails
    const {order,loading,error} = orderDetails
    const {loadingPay,successPay} = payment
    const dispatch = useDispatch()
    const params = useParams()
    const id = params.id
    useEffect(() => {
      const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      console.log(clientId)
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSDKReady(true)
      }
      document.body.appendChild(script)
    }
    addPayPalScript()
        if(!order || order._id !== id || successPay){
          dispatch({type:'ORDER_PAY_RESET'})
            dispatch(getOrder(id))
        }
        else if(!order.isPaid)
        {
          if (!window.paypal) {
            addPayPalScript()
          } else {
            setSDKReady(true)
          }
        }
      
    }, [dispatch,id,order,successPay])
    const successPaymentHandler = (paymentResult) =>{
      console.log(paymentResult)
      dispatch(putPayment(id,paymentResult))
    }
  return loading?(<Loader skeletons={2} w={'w-full'} h={'h-96'}/>):error?(<Message error={error} color={'alert-error'}/>):(
        <>
      <Header/>
    <div class="flex flex-col w-full lg:flex-row mt-3 mb-3">
  <div class="grid flex-grow  card bg-ghost rounded-box place-items-left ml-3">
    <h1 class='text-3xl mt-10'>ORDER ID: {order._id}</h1>
    <h1 class='text-3xl mt-10'>ORDER DETAILS</h1>
    <hr width='30%'/>
    <p class=' mt-3 '>Name : {userInfo.name}</p>
    <p class=' mt-3 '>Email :<a href={`mailto: ${userInfo.email}`}>{userInfo.email}</a></p>
    <p class=' mt-3 '>Address : {order.shippingAddress.Address}, {order.shippingAddress.City}, {order.shippingAddress.Country} - {order.shippingAddress.Pin}</p> 
    {order.isPaid ? (
                <Message color='alert-success' error={`Paid on ${order.paidAt}`}/>
              ) : (
                <Message color='alert-error' error='Not Paid'/>
              )}
    <h1 class='text-3xl mt-10'>PAYMENT BY</h1>
    <hr width='25%'/>
    <p class=' mt-3 '>{order.paymentMethod}</p>
    {order.isDelivered ? (
                <Message color='alert-success' error={`Delivered on ${order.deliveredAt}`}/>
              ) : (
                <Message color='alert-error' error='Not Delivered'/>
              )}
    <h1 class='text-3xl mt-10'>ORDER ITEMS</h1>
    <hr width='25%'/>
    <table class="table w-full  mt-3">
        <tbody>
        {order.orderItems.map((p)=>(
          
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
  <div class="grid flex-grow h-full card bg-ghost rounded-box place-items-center">
  <h1 class='text-3xl mt-3'>PRICE SUMMARY</h1>
    <hr width='75%'/>
    <table class="table w-full  mt-3 text-center flex place-items-center">
        <tbody>
          <tr >
            <td>Items:</td>
            <td>Rs : {order.itemsPrice}</td>
          </tr>
          <tr >
            <td>Shipping:</td>
            <td>Rs : {order.shippingPrice}</td>
          </tr>
          <tr >
            <td>Tax:</td>
            <td>Rs : {order.taxPrice}</td>
          </tr>
          <tr >
            <td>Total:</td>
            <td>Rs : {order.totalPrice}</td>
          </tr>
        </tbody>
      </table>
      {loadingPay&&<Loader/>}
      {!SDKReady?(<Loader/>):(
        <PayPalButton
        amount={order.totalPrice}
        onSuccess={successPaymentHandler}
        //options={{ currency: "INR"}} add?currency=INR for indian currency bt paypal doesnot support INR at present
      />
      )}
      
  </div>
</div>
</>
          
  )
}

export default Order