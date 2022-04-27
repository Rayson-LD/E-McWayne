import {useState,useEffect} from 'react'
import { Link, useNavigate,useParams } from 'react-router-dom'
import {useSelector,useDispatch} from'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {getuserDetails,updateUserDetails} from '../actions/userActions.js'
import { listMyOrders } from '../actions/orderActions'
import {FaWindowClose} from 'react-icons/fa'
import Meta from '../components/Meta'
import Header from '../components/Header'
function Profile() {
    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [message, setmessage] = useState(null)
    const params = useParams()
    const pageNumber = params.pageNumber
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //to check if user is logged in or not
    const userDetails = useSelector(state => state.userDetails)
    const {loading,error,userInfo} = userDetails

    //to check if user is logged in rr not
    const userProfile = useSelector(state => state.userProfile)
    const {user} = userProfile

    //to check if update is successfull
    const update = useSelector(state => state.update)
    const {success} = update

    const orderDetails = useSelector(state => state.orderList)
    const {loading:loadOrder,error:errorOrder,orders,page,pages} = orderDetails
    useEffect(() => {
      dispatch(listMyOrders(pageNumber))
        if(!userInfo)
        {
            navigate('/login')  
        }
        else{
            if(!user.name){
              dispatch(getuserDetails())
            }
            else{
              setName(user.name)
              setEmail(user.email)
            }
        }
    }, [userInfo,navigate,user,dispatch,pageNumber])
    const submitHandler = ()=>{
      if(Password === ConfirmPassword)
      {
          dispatch(updateUserDetails({id:user.id,name:Name,email:Email,password:Password}))
      }
      else{
          setmessage('Passwords donot Match')
      }
    }
  return (
      <>
       {loading&&<Loader skeletons={1} w={'w-full'} h={'h-96'}/>}

       { error && 
        <Message error={error} color={'alert-error'}/>}
        { message && 
        <Message error={message} color={'alert-warning'}/>}
        { success && 
        <Message error={'Profile Updated'} color={'alert-success'}/>}
        <Meta title={`Welcome ${user.name}`}/>
        <Header/>
    <div class="hero min-h-screen bg-base-200">
       
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Your Profile</h1>
      <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body">
      <div class="form-control">
          <label class="label">
            <span class="label-text">Name</span>
          </label>
          <input type="text" value={Name} onChange={(e)=>setName(e.target.value)} placeholder="Name" class="input input-bordered" required/>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input type="text" value={Email} onChange={(e)=>setEmail(e.target.value)} placeholder="email" class="input input-bordered" required/>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input type="password" value={Password} placeholder="password" onChange={(e)=>setPassword(e.target.value)}  class="input input-bordered" required/>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Confirm Password</span>
          </label>
          <input type="password" value={ConfirmPassword} placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)}  class="input input-bordered" required/>
        </div>
        <div class="form-control mt-6">
          <button class="btn btn-primary" onClick={()=>submitHandler()}>Update</button>
        </div>
      </div>
    </div>
  </div>
  
 
</div>
<h1 class='text-3xl'>MY ORDERS</h1>
{loadOrder ? (
          <Loader skeletons={2} w={'w-full'} h={'h-96'}/>
        ) : errorOrder ? (
          <Message error={errorOrder} color={'alert-error'}/>
        ) :(
<div class="overflow-x-auto">
  <table class="table w-full">
    <thead>
      <tr>
      <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAYMENT</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
      </tr>
    </thead>
    <tbody>
    {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaWindowClose color='red' size='25'/>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <p>Not Delivered</p>
                    )}
                  </td>
                  <td>
                    <Link to={`/orders/${order._id}`}>
                    <button class="btn btn-primary" >DETAILS</button>
                    </Link>
                  </td>
                </tr>
              ))}
     
    </tbody>
  </table>
  <div class="flex justify-center my-3">
  <div class="btn-group">
        {
            [...Array(pages).keys()].map(x=>(
                <Link key={x+1} to={ `/profile/page/${x+1}`}>
                <button class="btn" disabled={x+1 === page}>{x+1}</button>
                </Link>
                
            ))
        }
</div>
</div>
</div>  
        )}
</>
  )
}

export default Profile