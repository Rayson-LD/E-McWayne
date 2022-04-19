import React from 'react'

function Loader({w,h,skeletons}) {
  return (
    <>
    {Array(skeletons)
        .fill(1)
        .map(( index) => (
          <div className={`border-2 ${w} ${h} rounded-md mx-auto mt-20`}  key={index}>
          <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
            <div className="w-12 bg-gray-300 h-12 rounded-full ">
            </div>
                <div className="flex flex-col space-y-3">
                <div className="w-36 bg-gray-300 h-6 rounded-md ">
                </div>
                <div className="w-24 bg-gray-300 h-6 rounded-md ">
                </div>
            </div>
          </div>
        </div>
        ))}
</>

  )
}

export default Loader