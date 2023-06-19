import { useState } from "react";

import { FaSearch } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';
import { HiShoppingCart } from 'react-icons/hi';

export default function NavigationBar() {
    

    return (
        <div>

    <div className="header-main border-bottom bg-dark fixed-top">
	<div className="container-fluid">
       <div className="row p-2 d-flex align-items-center">
           <div className="col-md-2">
           <a className="navbar-brand" href="#">
                <img src={require("../../assets/logo.png")} alt=" " width="100" height="31" className="d-inline-block align-text-top" />
            </a>
           </div>
           <div className="col-md-7">
           <div class="input-group">
             <input type="text" class="form-control" placeholder="Search" aria-describedby="basic-addon2"/>
             <div class="input-group-append">
               <button class="btn btn-outline-secondary" type="button"><i className="md md-envelope mx-1"> <FaSearch style={{justifyContent:"center", height:20, paddingBottom:"5px"}}/></i></button>
             </div>
          </div>



           </div>
           <div className="col-md-3">
           <ul className="navbar-nav d-flex flex-row-reverse justify-content me-3">
            <li className="nav-item me-3 me-lg-0">
                <a className="nav-link text-white" href="#"><i className="md md-envelope mx-1"> <MdAccountCircle style={{width:30, height:20}} /></i>Hi, Username</a>
            </li>
            <li className="nav-item me-3 me-lg-4">
                <a className="nav-link text-white" href="#"><i className="hi hi-envelope mx-1"><HiShoppingCart style={{width:30, height:20}}/></i> Cart</a>
            </li>
           </ul>
           </div>
       </div>
	</div> 
</div>

        </div>
    )
}