export const cartListener = (state ={cartItems:[]},action)=>{
    switch(action.type)
    {
        case 'CART_ADD_ITEM' :
            const items=action.payload
            const existItem = state.cartItems.find(x=>items.product === x.product)
            if (existItem) {
                return{
                    ...state,
                    cartItems:state.cartItems.map(x=>x.product === existItem.product?items:x)
                }
            } else {
                return {
                    ...state,
                    cartItems:[...state.cartItems,items]
                }
            }
        default:
            return state
    }

}