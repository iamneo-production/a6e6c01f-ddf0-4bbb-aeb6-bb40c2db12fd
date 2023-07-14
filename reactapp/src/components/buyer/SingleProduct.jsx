import React, {useEffect,useState} from "react";
import "../../pages/buyer/product.css"
import {BsChatRightQuoteFill} from 'react-icons/bs';
import {useDispatch, useSelector} from "react-redux";
import {fetchProductById} from "../../features/productSlice";
import AskQueryModal from "./AskQueryModal";
import {addCart} from "../../features/cartSlice";

const SingleProduct = () =>{
  const token = useSelector(state => state.user.token)
    const productDetails = useSelector(state => state.product.productDetails)
    const selectedProduct = useSelector(state => state.product.selectedProduct)
    const [queryModal, setQueryModal] = useState(false);
    const handleCloseQueryModal = () => setQueryModal(false);

    const dispatch = useDispatch()
    useEffect( () => {
        dispatch(fetchProductById({token: token, productId: selectedProduct}))
    },[])

    function handleAddToCart(){
      dispatch(addCart({token:token,productId:selectedProduct,quantity:1}))
    }
    return(
        <>


<div className="container mt-5">
    <div className="row">
      <div className="col-md-6">
        <img src={`data:image/jpeg;base64,${productDetails.image}`} alt="Product Image" class="product-image"/>
      </div>
      <div className="col-md-6">
        <h2>{productDetails.name}</h2> 
        <p className="text-success fw-bold fs-2">{`₹${productDetails.price}`}</p>
        <p>{productDetails.description}</p>
          <button onClick={() => handleAddToCart()} class="btn btn-danger  ">Add to Cart</button>
          <button type="submit" class="btn btn-danger mx-3">Buy Now</button>
          <button onClick={() => setQueryModal(true)} type="submit" class="btn btn-outline-danger "><i className="material-icons" ><BsChatRightQuoteFill /></i> Ask Questions</button>
      </div>
    </div>
  </div>
  <AskQueryModal show={queryModal} onHide={handleCloseQueryModal} />







        </>
    )
};
export default SingleProduct;