import React from 'react'

function Rating({rating,reviews}) {
  return (
    
  <div className="rating rating-half mt-2">
           <input type="radio"   className="mask mask-star bg-orange-400 mask-half-1" disabled defaultChecked={rating===0.5}/>
           <input type="radio"   className="mask mask-star bg-orange-400 mask-half-2" disabled defaultChecked={rating===1}/>
           <input type="radio"    className="mask mask-star bg-orange-400 mask-half-1" disabled defaultChecked={rating===1.5}/>
           <input type="radio"     className="mask mask-star bg-orange-400 mask-half-2" disabled defaultChecked={rating===2}/>
           <input type="radio"    className="mask mask-star bg-orange-400 mask-half-1" disabled defaultChecked={rating===2.5}/>
           <input type="radio"    className="mask mask-star bg-orange-400 mask-half-2" disabled defaultChecked={rating===3}/>
           <input type="radio"   className="mask mask-star bg-orange-400 mask-half-1" disabled defaultChecked={rating===3.5}/>
           <input type="radio"   className="mask mask-star bg-orange-400 mask-half-2" disabled defaultChecked={rating===4}/>
           <input type="radio"   className="mask mask-star bg-orange-400 mask-half-1" disabled defaultChecked={rating===4.5}/>
           <input type="radio"   className="mask mask-star bg-orange-400 mask-half-2" disabled defaultChecked={rating===5}/>
     
  <p class="pl-5">{reviews&&reviews} Reviews</p>
</div>
  )
}

export default Rating