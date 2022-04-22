import {useEffect} from 'react'
import { useParams,Link } from 'react-router-dom'
import {useSelector,useDispatch} from'react-redux'
import Header from '../components/Header.jsx'
import Loader from '../components/Loader.jsx'
import Message from '../components/Message.jsx'
import {getOrder} from '../actions/orderActions.js'
function Order() {
    const orderDetails = useSelector(state => state.order)
    const userDetails = useSelector(state => state.userDetails)
    const {userInfo} = userDetails
    const {order,loading,error} = orderDetails
    const dispatch = useDispatch()
    const params = useParams()
    const id = params.id
    console.log(order)
    useEffect(() => {
        if(!order || order._id !== id){
            dispatch(getOrder(id))
        }
      
    }, [dispatch,id,order])
    
    
  return loading?(<Loader skeletons={2} w={'w-full'} h={'h-96'}/>):error?(<Message error={error} color={'alert-error'}/>):(
        <>
      <Header/>
    <div class="flex flex-col w-full lg:flex-row mt-3 mb-3">
  <div class="grid flex-grow  card bg-ghost rounded-box place-items-center">
    <h1 class='text-3xl mt-10'>ORDER ID:{order._id}</h1>
    <h1 class='text-3xl mt-10'>ORDER DETAILS</h1>
    <hr width='30%'/>
    <p class=' mt-3 '>Name : {userInfo.name}</p>
    <p>Email :<a href={`mailto: ${userInfo.email}`}>{userInfo.email}</a></p>
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
  <div class="grid flex-grow  card bg-ghost rounded-box place-items-center">
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
     
  </div>
</div>
</>
          
  )
}

export default Order