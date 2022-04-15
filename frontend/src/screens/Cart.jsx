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
    <h1>Cart</h1>
  )
}

export default Cart