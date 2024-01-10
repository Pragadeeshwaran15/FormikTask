import React from 'react'
import { Link } from 'react-router-dom'

function SideBar() {
  return <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

  {/* <!-- Sidebar - Brand --> */}
  <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
      <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
      </div>
      <div className="sidebar-brand-text mx-3">Library Info</div>
  </a>

  {/* <!-- Divider --> */}
  <hr className="sidebar-divider my-0"/>

  {/* <!-- Nav Item - Dashboard --> */}
  <li className="nav-item active">
      <a className="nav-link" href="index.html">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span></a>
  </li>
  <li class="nav-item active">
    <Link to="/add-book" class="nav-link" href="index.html">
     <i class="fas fa-fw fa-tachometer-alt"></i>
    <span>Add Book info</span>
    </Link>

   </li>
   <hr />
   <li class="nav-item active">
    <Link to="/add-author" class="nav-link" href="index.html">
    <span>Add Author info</span>
    </Link>
   </li>
   
  
   
  {/* <!-- Divider --> */}
  <hr className="sidebar-divider"/>

  
</ul>
}

export default SideBar
