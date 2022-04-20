import {useState,useEffect} from 'react'
import { useNavigate,useParams,Link } from 'react-router-dom'
import {useSelector,useDispatch} from'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {userRegister} from '../actions/userActions.js'
function Register() {
    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [message, setmessage] = useState(null)
    const dispatch = useDispatch()
    const Register = useSelector(state => state.register)
    const navigate = useNavigate()
    const param = useParams()
    const {loading,error,userInfo} = Register
    const redirect = param.redirect ? param.redirect:'/'
    useEffect(() => {
        if(userInfo)
        {
            navigate(redirect)
           
        }
        else{
            
        }
    }, [userInfo,redirect,navigate])
    const submitHandler = ()=>{
        if(Password === ConfirmPassword)
        {
            dispatch(userRegister(Name,Email,Password))
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
    <div class="hero min-h-screen bg-base-200">
       
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Register now!</h1>
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
          <input type="text" value={Password} placeholder="password" onChange={(e)=>setPassword(e.target.value)}  class="input input-bordered" required/>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Confirm Password</span>
          </label>
          <input type="text" value={ConfirmPassword} placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)}  class="input input-bordered" required/>
          <label class="label">
            <Link to={redirect?`/login?redirect=${redirect}`:'/login'} class="label-text-alt link link-hover">Already Have an Account?</Link>
          </label>
        </div>
        <div class="form-control mt-6">
          <button class="btn btn-primary" onClick={()=>submitHandler()}>Register</button>
        </div>
      </div>
    </div>
  </div>
  
 
</div>

       
</>
  )
}

export default Register