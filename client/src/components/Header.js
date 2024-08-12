import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light text-bold">
  <a class="navbar-brand" href="#">E-book Store</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
      <Link to="about" className='nav-link'>About Us</Link>
      </li>
      <li class="nav-item dropdown">
      <Link to="contact" className='nav-link'>Contact</Link>
      </li>
      <li class="nav-item">
      <Link to="universityAdmin" className='nav-link'>Admin</Link>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
    <ul class="navbar-nav mr-auto m-2 p-2">
    <li class="nav-item">
      <Link to="register" className='nav-link'>Register</Link>
    </li>
    <li class="nav-item">
      <Link to="login" className='nav-link'>Login</Link>
      </li>
    </ul>
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
    </div>
  )
}

export default Header