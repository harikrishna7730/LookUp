import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'
const Loader = () => {
  return (
    <>
    <ThreeCircles
  visible={true}
  height="100"
  width="100"
  color="#4fa94d"
  ariaLabel="three-circles-loading"
  wrapperStyle={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"18rem"}}
  wrapperClass=""
  />
    </>
  )
}

export default Loader
