import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {getuserDetails,updateUserDetails} from '../actions/userActions.js'
function Profile() {
    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [message, setmessage] = useState(null)
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
    useEffect(() => {
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
    }, [userInfo,navigate,user,dispatch])
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
        <Message error={error} color={'error'}/>}
        { message && 
        <Message error={message} color={'error'}/>}
        { success && 
        <Message error={'Profile Updated'} color={'success'}/>}
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

       
</>
  )
}

export default Profile