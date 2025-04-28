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
  wrapperStyle={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }}  wrapperClass=""
  />
    </>
  )
}

export default Loader
