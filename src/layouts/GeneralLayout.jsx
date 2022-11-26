import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

const GeneralLayout = ({children}) => {
  return (
    <div>
        <Header/>
          {children}
        <Footer/> 
        
    </div>
  )
}

export default GeneralLayout