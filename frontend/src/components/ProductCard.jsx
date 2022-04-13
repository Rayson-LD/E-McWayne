import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'
function ProductCard({name,desc,img,rating,reviews,id}) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
    <img src={img} alt="Shoes" className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{name}</h2>
    <p>{desc}</p>
    <Rating rating={rating} reviews={reviews}/>
    <div className="card-actions">
        <Link to={`/product/pid=${id}/item=${name}`}>
      <button className="btn btn-primary">More Details</button>
      </Link>
    </div>
  </div>
</div>
  )
}

export default ProductCard