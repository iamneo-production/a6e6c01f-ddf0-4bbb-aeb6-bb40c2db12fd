import React from "react";
import "../../pages/buyer/product.css"
import {BsChatRightQuoteFill} from 'react-icons/bs';

const SingleProduct = () =>{
    return(
        <>


<div className="container mt-5">
    <div className="row">
      <div className="col-md-6">
        <img src={require('../../assets/phone.jpg')} alt="Product Image" class="product-image"/>
      </div>
      <div className="col-md-6">
        <h2>Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage)</h2> 
        <p className="text-success fw-bold fs-2">₹40,000</p>
        <p>Brand	Samsung : Model Name	Samsung M04 <br/>
           Network Service : Provider	Unlocked for All Carriers <br/>
           Operating System	Android 12.0 <br/>
           Cellular Technology	4G 
        </p>
        <form>

          
          <button type="submit" class="btn btn-danger  ">Add to Cart</button>
          <button type="submit" class="btn btn-danger mx-3">Buy Now</button>
          <button type="submit" class="btn btn-outline-danger "><i className="material-icons" ><BsChatRightQuoteFill /></i> Ask Questions</button>
        </form>
      </div>
    </div>
  </div>
  







        </>
    )
};
export default SingleProduct;