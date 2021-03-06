import axios from "axios"


//thunk is an func within a func
export const addToCart = (id,qty) => async(dispatch,getState)=>{
    
        //getting the data
        const {data} = await axios.get(`/api/products/${id}`);
        
        //sending data to cart reducer
        dispatch({type:'CART_ADD_ITEM',payload:{
            product:data._id,
            name:data.name,
            price:data.price,
            image:data.image,
            countInStock:data.countInStock,
            qty
        }})
        //adding cart items to local storage
        localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
    
}
export const removeFromCart = (id) => (dispatch,getState)=>{
    
    
    //sending data to cart reducer
    dispatch({type:'CART_REMOVE_ITEM',payload:id})
    //adding cart items to local storage
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));

}

export const shipping = (data) => async(dispatch) =>{
    
    dispatch({
        type:'CART_SAVE_SHIPPING_ADDRESS',
    payload:data})
    localStorage.setItem('shippingAddress',JSON.stringify(data));

}

export const savePaymentMethod = (data) => async(dispatch) =>{
    
    dispatch({
        type:'CART_SAVE_PAYMENT_METHOD',
    payload:data})
    localStorage.setItem('payment',JSON.stringify(data));

}