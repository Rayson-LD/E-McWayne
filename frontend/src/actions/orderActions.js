import axios from "axios"

//@desc : Post order details action
export const createOrder = (order) => async(dispatch,getState)=>{
    try {
    //request
    dispatch({
        type:'ORDER_CREATE_REQUEST'})
    const {userDetails:{userInfo}} =  getState()
    //success
        //passing the headers for auth     
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        //getting the data
    const {data} = await axios.post('/api/orders',order,config)
   
    dispatch({
        type:'ORDER_CREATE_SUCCESS',
        payload:data
    })
    } catch (error) {
        dispatch({type:'ORDER_CREATE_FAIL',payload:error.response && error.response.data.message
        ? error.response.data.message
        : error.message,});
    }
    
    

}

//@desc : get order details by id
export const getOrder = (id) => async(dispatch,getState)=>{
    try {
    //request
    dispatch({
        type:'ORDER_DETAILS_REQUEST'})
    const {userDetails:{userInfo}} =  getState()
    //success
        //passing the headers for auth     
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        //getting the data
    const {data} = await axios.get(`/api/orders/${id}`,config)
   
    dispatch({
        type:'ORDER_DETAILS_SUCCESS',
        payload:data
    })
    } catch (error) {
        dispatch({type:'ORDER_DETAILS_FAIL',payload:error.response && error.response.data.message
        ? error.response.data.message
        : error.message,});
    }
    
    

}