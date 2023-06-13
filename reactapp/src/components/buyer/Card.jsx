import React from "react";
import "../../pages/buyer/home.css"

const Card =  (props) => {
    return(
        <>

              {props.details.map( (value,index)=>(
                <div class="col-md-3" key={index}>
                 <div class="card mb-4">
                   <img src={value.img} class="card-img-top" alt="Product 1"/>
                  <div class="card-body">
                     <h5 class="card-title">{value.title}</h5>
                     <h6 class="card-text">₹{value.price}</h6>
           
                  </div>
                </div>
               </div>
               ))};
              
        </>
    )
};
export default Card;