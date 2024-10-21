import React from "react"
import './Header.css'
const HeaderHome = () => {
  return (
    <header className="header-area header-sticky wow slideInDown" data-wow-duration="0.75s" data-wow-delay="0s">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="main-nav">
            <a href="index.html" className="logo">
            </a>
            <ul className="nav">
              <li><a href="index.html" className="active">Home</a></li>
              <li><a href="category.html">Services</a></li>
              <li><a href="listing.html">Contact us</a></li>
              <li><div className="main-white-button-signup"><a href="#">sign up</a></div></li> 

              <li><div className="main-white-button-signin"><a href="#">sign in</a></div></li> 


            </ul>        
            <a className='menu-trigger'>
                <span>Menu</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  </header>
  )
}

export default HeaderHome;