import React from 'react'
import { Link } from 'react-router-dom'

function Pagination({page,pages,keyword}) {
  return pages > 1 && (
    <div class="btn-group">
        {
            [...Array(pages).keys()].map(x=>(
                <Link key={x+1} to={keyword? `/search/${keyword}/page/${x+1}`:`/page/${x+1}`}>
                <button class="btn" disabled={x+1 === page}>{x+1}</button>
                </Link>
                
            ))
        }
</div>
  )
}

export default Pagination