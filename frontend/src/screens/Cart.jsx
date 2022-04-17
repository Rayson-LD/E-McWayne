import {useSelector,useDispatch} from'react-redux'
import {useEffect} from 'react'
import { useParams, Link,useNavigate} from 'react-router-dom'
import {addToCart,removeFromCart} from '../actions/cartActions'
import {FaTrash} from 'react-icons/fa'
function Cart() {
  const param = useParams()
  const dispatch = useDispatch()
  const cartList = useSelector(state => state.cart)
  const navigate=useNavigate()
  const qty=1;
  const {cartItems} = cartList
  useEffect(() => {
    dispatch(addToCart(param.id,Number(qty)))
  }, [dispatch,param])

  const removeFromCartHandler = (id)=>{
    dispatch(removeFromCart(id))
  }
  const checkout = ()=>{
    navigate('/login?redirect=shipping')
  }
  return (
    <>
    <h1 class='text-5xl m-2 text-center'>Your Shopping Cart</h1>
    {cartItems.length === 0 ?(<h1>Nothing here</h1>):
    (
      <>
      <div class="card w-96 mx-3 bg-ghost shadow-xl image-full border-2 border-secondary" style={{borderRadius:0}}>
  <div class="card-body">
    <h2 class="card-title">SUBTOTAL :</h2>
    <p>Items : {cartItems.reduce((acc,item)=>acc+item.qty,0)}</p>
    <p>Total Cost : Rs {cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}</p>
    <div class="card-actions justify-end">
    <button class="btn btn-primary" onClick={()=>checkout()}>Proceed To Checkout</button>
    </div>
  </div>
</div>
      
      <table class="table w-full mt-2">
        <tbody>
        {cartItems.map((p)=>(
          
          <tr class="hover">
            <td><img src={p.image} class='w-24 h-24 rounded-full' alt={p.name} /></td>
            <td><Link to={`/product/pid=${p.product}/item=${p.name}`}>{p.name} </Link></td>
            <td>{p.price}</td>
            <td>
          <select class="select select-primary w-full max-w-xs"value={p.qty}
                      onChange={(e) =>   dispatch(
                        addToCart(p.product,Number( e.target.value))
                    )
                      }>
                <option disabled ></option>
                {[...Array(p.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>{x + 1}</option>
                ))}
        </select>
            </td>
            <td ><button onClick={()=>removeFromCartHandler(p.product)} class="btn btn-square btn-outline">
            <FaTrash />
            </button></td>
          </tr>
         
              ))}
        </tbody>
      </table>
      </>
    )
    }
    </>
  )
}

export default Cart