import React from "react";
import "../../pages/buyer/home.css"
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setSelectedProduct} from "../../features/productSlice";
import { fetchProduct } from "../../features/productSlice";
import { ReactComponent as EmptySellerProducts } from '../../assets/EmptySellerProducts.svg';

const Card =  (props) => {
  const navigate = useNavigate();
    const dispatch = useDispatch()
    async function handleOnClick(productId) {
        await dispatch(setSelectedProduct({productId: productId}))
        navigate("/product")
    }

    const shortenProductName = (name) => {
      if (name.length > 70) {
        return name.slice(0, 70) + "...";
      }
      return name;
    };

    return(
        <>
              {props.ProductList.length === 0 ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                  <div style={{ width: 400, height: 400 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <h5 style={{ color: "grey" }}><b>No products added yet</b></h5>
                    </div>
                    <EmptySellerProducts />
                  </div>
              </div>) :(
              props.ProductList.map( (value,index)=>(
                <div onClick={() => handleOnClick(value.id)} class="col-md-3" key={index}>
                 <div class="card mb-4">
                    <img src={`data:image/jpeg;base64,${value.image}`} class="card-img-top" alt="Product 1"/>
                  <div class="card-body">
                     <h6 class="card-title">{shortenProductName(value.name)}</h6>
                     <h6 class="card-text text-success">₹ {value.price.toLocaleString("en-US")}</h6>
                  </div>
                </div>
               </div>
               )))}
              
        </>
    )
};
export default Card;