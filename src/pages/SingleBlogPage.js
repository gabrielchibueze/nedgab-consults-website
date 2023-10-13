import React from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import SingleBlog from '../components/SingleBlog/SingleBlog'

const SingleBlogPage = () => {
  return (
      <div>
          <Navbar />
      <SingleBlog />
      <Footer />
    </div>
  )
}

export default SingleBlogPage