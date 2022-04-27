export const productListener = (state ={products:[]},action)=>{
    switch(action.type)
    {
        case 'PRODUCT_LIST_REQUEST' :
            return {loading:true,products:[]}
        case 'PRODUCT_LIST_SUCCESS' :
            return {loading:false,products:action.payload.p,page:action.payload.page,pages:action.payload.pages}
        case 'PRODUCT_LIST_FAIL' :
            return {loading:false,error:action.payload}
        default:
            return state
    }

}

export const productDetailsListener = (
    state ={product:{reviews:[]}},action)=>{
    switch(action.type)
    {
        case 'PRODUCT_DETAIL_REQUEST' :
            return {loading:true,...state}
        case 'PRODUCT_DETAIL_SUCCESS' :
            return {loading:false,product:action.payload}
        case 'PRODUCT_DETAIL_FAIL' :
            return {loading:false,error:action.payload}
        default:
            return state
    }

}

export const getReviewsListener = (
    state ={},action)=>{
    switch(action.type)
    {
        case 'PRODUCT_REVIEW_REQUEST' :
            return {loading:true}
        case 'PRODUCT_REVIEW_SUCCESS' :
            return {loading:false,success:true,}
        case 'PRODUCT_REVIEW_FAIL' :
            return {loading:false,error:action.payload}
        case 'PRODUCT_REVIEW_RESET' :
            return {}
        default:
            return state
    }

}

export const getCarouselListener = (
    state ={top:[]},action)=>{
    switch(action.type)
    {
        case 'PRODUCT_TOP_CAROUSEL_REQUEST' :
            return {loading:true,top:[]}
        case 'PRODUCT_TOP_CAROUSEL_SUCCESS' :
            return {loading:false,top:action.payload}
        case 'PRODUCT_TOP_CAROUSEL_FAIL' :
            return {loading:false,error:action.payload}
        default:
            return state
    }

}