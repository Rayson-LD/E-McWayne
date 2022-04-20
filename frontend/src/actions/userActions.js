import axios from "axios"


//thunk is an func within a func
export const userLogin = (email,password) => async(dispatch)=>{
        try {
        //request
        dispatch({
            type:'USER_LOGIN_REQUEST'})

        //success
            //passing the headers for auth
            const config = {
                headers:{
                    'Content-Type':'application/json'
                }
            }
            //getting the data
        const {data} = await axios.post(`/api/users/login`,{email,password},config);
        dispatch({
            type:'USER_LOGIN_SUCCESS',
            payload:data
        })
        //adding data to local storage
        localStorage.setItem('userInfo',JSON.stringify(data));

        
        
        } catch (error) {
            dispatch({type:'USER_LOGIN_FAIL',payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message,});
        }
        //adding cart items to local storage
        
    
}
 export const userLogout = () => async(dispatch) =>{
    localStorage.removeItem('userInfo')
    dispatch({
        type:'USER_LOGOUT'})

}

export const userRegister = (name,email,password) => async(dispatch)=>{
    try {
    //request
    dispatch({
        type:'USER_REGISTER_REQUEST'})

    //success
        //passing the headers for auth
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        //getting the data
    const {data} = await axios.post(`/api/users`,{name,email,password},config);
    dispatch({
        type:'USER_REGISTER_SUCCESS',
        payload:data
    })

    dispatch({
        type:'USER_LOGIN_SUCCESS',
        payload:data
    })
    //adding data to local storage
    localStorage.setItem('userInfo',JSON.stringify(data));

    
    
    } catch (error) {
        dispatch({type:'USER_REGISTER_FAIL',payload:error.response && error.response.data.message
        ? error.response.data.message
        : error.message,});
    }
    
    

}

export const getuserDetails = () => async(dispatch,getState)=>{
    try {
    //request
    dispatch({
        type:'USER_DETAILS_REQUEST'})
    const {userLogin:{userInfo}} =  getState()
    //success
        //passing the headers for auth
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        //getting the data
    const {data} = await axios.get(`/api/users/profile`,config);
    dispatch({
        type:'USER_DETAILS_SUCCESS',
        payload:data
    })
    
    } catch (error) {
        dispatch({type:'USER_DETAILS_FAIL',payload:error.response && error.response.data.message
        ? error.response.data.message
        : error.message,});
    }
    
    

}