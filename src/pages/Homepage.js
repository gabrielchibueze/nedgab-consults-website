import React from 'react'
import Navbar from "../components/Navbar/Navbar" 
import Home from "../components/Home/Home"; 
import Footer from '../components/Footer/Footer';

const Homepage = () => {
  return (
      <div>
          <Navbar />
      <Home /> 
      <Footer />
    </div>
  )
}

export default Homepage