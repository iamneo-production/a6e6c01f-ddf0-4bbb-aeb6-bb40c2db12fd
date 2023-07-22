import React, {useEffect,useState} from "react";
import "../../pages/buyer/product.css"
import {BsChatRightQuoteFill} from 'react-icons/bs';
import {useDispatch, useSelector} from "react-redux";
import {fetchProductById} from "../../features/productSlice";
import AskQueryModal from "./AskQueryModal";
import {addCart} from "../../features/cartSlice";
import {MdKeyboardBackspace} from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import {fetchCart} from "../../features/cartSlice";

const SingleProduct = () =>{
  const token = useSelector(state => state.user.token)
    const productDetails = useSelector(state => state.product.productDetails)
    console.log(productDetails);
    const selectedProduct = useSelector(state => state.product.selectedProduct)
    const [queryModal, setQueryModal] = useState(false);
    const handleCloseQueryModal = () => setQueryModal(false);

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate("/home")
    };

    const dispatch = useDispatch()
    useEffect( () => {
        dispatch(fetchProductById({token: token, productId: selectedProduct}))
    },[])

    function handleAddToCart(){
      dispatch(addCart({token:token,productId:selectedProduct,quantity:1}))
    }

    async function handleBuyNow(){
      await dispatch(addCart({token:token,productId:selectedProduct,quantity:1}))
      navigate("/checkout")
      dispatch(fetchCart({token:token}))
    }
    return(
        <>

        <div className="d-flex flex-row align-items-center" style={{marginTop:"-3px" }}>
          <p className='ms-3' ><MdKeyboardBackspace style={{ color: "grey"}} onClick={handleGoBack} />{" "}<a href="#" style={{ color: "grey" }} onClick={handleGoBack}>Back</a></p>
        </div>
<div className="container mt-1">
    <div className="row">
      <div className="col-md-6">
        <img src={`data:image/jpeg;base64,${productDetails.image}`} alt="Product Image" class="product-image"/>
      </div>
      <div className="col-md-6">
        <h4>{productDetails.name}</h4> 
        <p className="text-success fw-bold fs-3">{`₹ ${productDetails?.price?.toLocaleString("en-US")}`}</p>
        <p className=" fw-bold ">Description:</p>
        <p>{productDetails.description}</p>
        {productDetails.quantity <= 0 ? (
          <>
           <p style={{color:"red"}}><b>OUT OF STOCK</b></p>
           <button onClick={() => handleAddToCart()} class="btn btn-danger  " disabled>Add to Cart</button>
           <button type="submit" class="btn btn-danger mx-3" disabled>Buy Now</button>
           <button onClick={() => setQueryModal(true)} type="submit" class="btn btn-outline-danger "><i className="material-icons" ><BsChatRightQuoteFill /></i> Ask Questions</button>
          </>
        ):(
          <>
          <button onClick={() => handleAddToCart()} class="btn btn-danger  ">Add to Cart</button>
          <button onClick={() => handleBuyNow()} type="submit" class="btn btn-danger mx-3">Buy Now</button>
          <button onClick={() => setQueryModal(true)} type="submit" class="btn btn-outline-danger "><i className="material-icons" ><BsChatRightQuoteFill /></i> Ask Questions</button>
          </>
        )}
      </div>
    </div>
  </div>
  <AskQueryModal productId={productDetails.id} show={queryModal} onHide={handleCloseQueryModal} />







        </>
    )
};
export default SingleProduct;