import React from 'react'
import {Helmet} from "react-helmet";
function Meta({title,desc,keyword}) {
  return (
    <Helmet>
    <meta charSet="utf-8" />
    <title>{title}</title>
    <meta name="description" content={desc} />
    <meta name="keywords" content={keyword} />
</Helmet>
  )
}
Meta.defaultProps = {
    title : 'Welcome to ENava | Home',
    desc: 'We sell the best products for cheap',
    keyword:'electronics, buy electronics, cheap electronics'
}
export default Meta