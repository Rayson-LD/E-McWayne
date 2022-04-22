import axios from "axios"
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
        dispatch({type:'ORDER_CREATE_FAIL',payload:error});
    }
    
    

}