import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'
function ProductCard({name,desc,img,rating,reviews,id}) {
  return (
    <div class="card w-96 bg-base-100 shadow-xl">
  <figure class="px-10 pt-10">
    <img src={img} alt="Shoes" class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">{name}</h2>
    <p>{desc}</p>
    <Rating rating={rating} reviews={reviews}/>
    <div class="card-actions">
        <Link to={`/product/pid=${id}/item=${name}`}>
      <button class="btn btn-primary">More Details</button>
      </Link>
    </div>
  </div>
</div>
  )
}

export default ProductCard