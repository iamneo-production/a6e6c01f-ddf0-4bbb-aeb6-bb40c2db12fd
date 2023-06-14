import React from "react";
import "../../pages/buyer/home.css"

const Footer = () => {
    return(
        <>
<section>
  
  <footer className="bg-dark text-white">
   
    <div className="container p-4">
    
      <div className="row">
       
        <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
          <h5 className="text-uppercase"><img src={require("../../assets/logo.png")} height={40}></img></h5>

          <p>
          Our dedicated customer support team is here to assist you every step of the way.
           If you have any questions, concerns, or need assistance with your order, please don't hesitate to contact us.


          </p>
        </div>
        
        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 className="text-danger">Get to Know Us</h5>

          <ul className="list-unstyled mb-0">
            <li>
              <a href="#" className="text-white">About Us</a>
            </li>
            <li>
              <a href="#" className="text-white">Careers</a>
            </li>
            <li>
              <a href="#" className="text-white">Press Release</a>
            </li>
            <li>
              <a href="#" className="text-white">Contact</a>
            </li>
          </ul>
        </div>
        
        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 className="text-danger mb-0">Connect with Us</h5>

          <ul className="list-unstyled mb-0">
            <li>
              <a href="#" className="text-white">Twitter</a>
            </li>
            <li>
              <a href="#" className="text-white">Facebook</a>
            </li>
            <li>
              <a href="#" className="text-white">Instagram</a>
            </li>
            
          </ul>
        </div>
        
      </div>
      
    </div>
    

    
    <div className="text-center p-3"  >
      © 2023 Copyright:
      <a className="text-danger" href="#">Zest.com</a>
    </div>
    
  </footer>
 
</section>



        </>

    )
};
export default Footer;