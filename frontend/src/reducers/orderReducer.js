export const orders = (state ={},action)=>{
    switch(action.type)
    {
        case 'ORDER_CREATE_REQUEST' :
            return {...state,loading:true}
        case 'ORDER_CREATE_SUCCESS' :
            return {loading:false,success:true,order:action.payload}
        case 'ORDER_CREATE_FAIL' :
            return {loading:false,error:action.payload}
        default:
            return state
    }

}

export const getOrders = (state ={loading:true,orderItems:[], shippingAddress:{}},action)=>{
    switch(action.type)
    {
        case 'ORDER_DETAILS_REQUEST' :
            return {...state,loading:true}
        case 'ORDER_DETAILS_SUCCESS' :
            return {loading:false,order:action.payload}
        case 'ORDER_DETAILS_FAIL' :
            return {loading:false,error:action.payload}
        default:
            return state
    }

}

export const getPayment = (state ={loadingPay:false,orderItems:[], shippingAddress:{}},action)=>{
    switch(action.type)
    {
        case 'ORDER_PAY_REQUEST' :
            return {...state,loadingPay:true}
        case 'ORDER_PAY_SUCCESS' :
            return {successPay:true,loadingPay:false,pay:action.payload}
        case 'ORDER_PAY_FAIL' :
            return {loadingPay:false,error:action.payload}
        case 'ORDER_PAY_RESET' :
            return {}
        default:
            return state
    }

}


export const getOrdersList = (state ={orders:[]},action)=>{
    switch(action.type)
    {
        case 'ORDER_MY_LIST_REQUEST' :
            return {loading:true}
        case 'ORDER_MY_LIST_SUCCESS' :
            return {success:true,loading:false,orders:action.payload.orders,page:action.payload.page,pages:action.payload.pages}
        case 'ORDER_MY_LIST_FAIL' :
            return {loading:false,error:action.payload}
        case 'ORDER_PAY_RESET' :
            return {}
        default:
            return state
    }

}