import axios from "axios"


//thunk is an func within a func
export const addToCart = (id) => async(dispatch,getState)=>{
    
        //getting the data
        const {data} = await axios.get(`/api/products/${id}`);
        
        //sending data to cart reducer
        dispatch({type:'CART_ADD_ITEM',payload:{
            product:data._id,
            name:data.name,
            price:data.price,
            image:data.image,
            countInStock:data.countInStock
        }})
        //adding cart items to local storage
        localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
    
}