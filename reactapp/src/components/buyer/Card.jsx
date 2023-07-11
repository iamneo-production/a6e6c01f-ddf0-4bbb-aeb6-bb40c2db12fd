import React from "react";
import "../../pages/buyer/home.css"
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setSelectedProduct} from "../../features/productSlice";

const Card =  (props) => {
  const navigate = useNavigate();
    const dispatch = useDispatch()
    async function handleOnClick(productId) {
        await dispatch(setSelectedProduct({productId: productId}))
        navigate("/product")
    }

    return(
        <>

              {props.ProductList.map( (value,index)=>(
                <div onClick={() => handleOnClick(value.id)} class="col-md-3" key={index}>
                 <div class="card mb-4">
                    <img src={`data:image/jpeg;base64,${value.image}`} class="card-img-top" alt="Product 1"/>
                  <div class="card-body">
                     <h5 class="card-title">{value.name}</h5>
                     <h6 class="card-text">₹{value.price}</h6>
           
                  </div>
                </div>
               </div>
               ))};
              
        </>
    )
};
export default Card;