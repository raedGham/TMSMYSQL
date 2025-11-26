import React from 'react'
import loaderImg from "../../assets/loader.gif"
import  ReactDOM  from "react-dom"



//----------------------------------------------------
//  C O M P O N E N T
// full screen loader
//----------------------------------------------------
 const Loader = () => {
  return ReactDOM.createPortal(
        <div className='Wrapper'>
            <div className=''>
                <img src={loaderImg} alt="Loading..."/>

            </div>
        </div>,
  document.getElementById("loader")     
  )
  
}



//----------------------------------------------------
//  C O M P O N E N T
// spinner
//----------------------------------------------------
export const SpinnerImg = () => {
    return (
        <div className='--center-all'>
           <img src={loaderImg} alt="Loading..."/>
        </div>
    )
}
export default Loader