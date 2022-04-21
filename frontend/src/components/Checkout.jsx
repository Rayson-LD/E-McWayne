import React from 'react'
import {Link} from 'react-router-dom'
function Checkout({step1,step2,step3,step4}) {
  return (
      <div class='flex justify-center mt-5'>
    <ul class="steps steps-vertical lg:steps-horizontal ">
  <li class={`step ${step1&&'step-primary'}`}><Link to={step1 ? '/login' : ''}>Sign In</Link></li>
  <li class={`step ${step2&&'step-primary'}`}><Link to={step2 ? '/shipping' : ''}>Select Address</Link></li>
  <li class={`step ${step3&&'step-primary'}`}><Link to={step3 ? '/payment' : ''}>Purchase</Link></li>
  <li class={`step ${step4&&'step-primary'}`}>Receive Product</li>
</ul>
</div>
  )
}

export default Checkout