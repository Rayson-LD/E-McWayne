import axios from "axios"

//thunk is an func within a func
export const listProducts = () => async(dispatch)=>{
    try {
        //sending the request
        dispatch({type:'PRODUCT_LIST_REQUEST'})
        
        //getting the data
        const {data} = await axios.get('/api/products');
        
        //sending data to reducer
        dispatch({type:'PRODUCT_LIST_SUCCESS',payload:data});
    } catch (error) {
        dispatch({type:'PRODUCT_LIST_FAIL',payload:error.response && error.response.data.message
        ? error.response.data.message
        : error.message,});
    }
}

export const listProductDetails = (id) => async(dispatch)=>{
    try {
        //sending the request
        dispatch({type:'PRODUCT_DETAIL_REQUEST'})
        
        //getting the data
        const {data} = await axios.get(`/api/products/${id}`);
        
        //sending data to reducer
        dispatch({type:'PRODUCT_DETAIL_SUCCESS',payload:data});
    } catch (error) {
        dispatch({type:'PRODUCT_DETAIL_FAIL',payload:error.message});
    }
}