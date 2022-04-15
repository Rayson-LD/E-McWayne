import {useSelector,useDispatch} from'react-redux'
import {useEffect} from 'react'
import { useParams, Link} from 'react-router-dom'
import {addToCart} from '../actions/cartActions'
function Cart() {
  const param = useParams()
  const dispatch = useDispatch()

  const cartList = useSelector(state => state.cart)
  const {cartItems} = cartList
  useEffect(() => {
    dispatch(addToCart(param.id))
  }, [dispatch,param])
  return (
    <>
    <h1>Your Cart</h1>
    {cartItems.length === 0 ?(<h1>Nothing here</h1>):
    (

      <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
        {cartItems.map((p)=>(
          <tr class="hover">
            <th>1</th>
            <td><img src={p.image} class='w-24 h-24 rounded-full' alt={p.name} /></td>
            <td>{p.name}</td>
            <td>{p.price}</td>
            <td>{p.countInStock}</td>
          </tr>
              ))}
        </tbody>
      </table>
    </div>
    )
    }
    </>
  )
}

export default Cart