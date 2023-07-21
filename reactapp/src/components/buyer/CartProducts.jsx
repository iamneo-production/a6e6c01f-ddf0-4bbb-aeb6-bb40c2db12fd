import React, { useState,useEffect } from 'react';
import ProductQuantity from './ProductQuantity';
import CartProductsRemoveModal from './CartProductsRemoveModal';
import NavigationBar from '../common/NavigationBar';
import { useNavigate } from "react-router-dom";
import {MdKeyboardBackspace} from 'react-icons/md';
import {useDispatch, useSelector} from "react-redux";
import { ReactComponent as AddToCart } from '../../assets/AddToCart.svg';
import {fetchCart} from "../../features/cartSlice";

const products = [
    {
        name: "Samsung Galaxy M04 Light Green, 4GB RAM, 64GB Storage | Upto 8GB RAM With RAM Plus | 5000 mAh Battery | 13MP Dual Camera",
        image: "https://m.media-amazon.com/images/I/61ODgTm9J6L._SX679_.jpg",
        cost: "INR 29,000.00",
        amount: "20 left"
    },
    {
        name: "Samsung Galaxy M04 Light Green, 4GB RAM, 64GB Storage | Upto 8GB RAM With RAM Plus | 5000 mAh Battery | 13MP Dual Camera",
        image: "https://m.media-amazon.com/images/I/61ODgTm9J6L._SX679_.jpg",
        cost: "INR 16,000.00",
        amount: "Out Of Stock"
    }

];

const CartProducts = () => {
    const [showRemove, setShowRemove] = useState(false);
    const handleHideRemoveModal = () => setShowRemove(false);
    const [selected,setSelected] = useState(null)
    const handleShowRemoveModal = (id) => {
        setSelected(id)
        setShowRemove(true)
    };
    const navigate = useNavigate();
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(fetchCart({token:token}))
    },[])
    const cartList = useSelector(state => state.cart.cartList);

    const handleBuyNow=()=>{
        navigate("/checkout")
    }
    const handleGoBack = () => {
        navigate("/home")
    };

    return (
        <div><br /><br /><br/>
            <NavigationBar />
            <div className="d-flex flex-row align-items-center">
                <p className='ms-3' ><MdKeyboardBackspace style={{color:"grey"}} onClick={handleGoBack}/>{" "}<a href="#" style={{color:"grey"}} onClick={handleGoBack}>Back</a></p>
                <p className='ms-3' style={{fontSize:30}}><b>CART</b></p>
            </div>
            {cartList.length === 0 ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 400, height: 400 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <h5 style={{ color: "grey" }}><b>No products added yet</b></h5>
                        </div>
                        <AddToCart />
                    </div>
                </div>
            ) : (
            <div>
            <div>
                {
                    cartList.map((prod, index) =>
                    (
                        <div>
                           <div className={"container"} key={index}>
                                <div className="row ">
                                    <div className="col-2">
                                        <img src={`data:image/jpeg;base64,${prod.product.image}`} alt="Card" className=" d-block  " width={155} height={135} />
                                        <ProductQuantity cartId ={prod.id} quantity={prod.quantity} />
                                    </div>
                                    <div className="col-10 border">
                                        <div className="card-body">
                                            <p className="card-title fw-bold">{prod.product.name}</p>
                                            <p className="card-text text-muted fw-bold">{`₹ ${prod.product.price.toLocaleString("en-US")}`}</p>
                                            <button type="button" className="btn btn-danger" style={{ color: "black" }} onClick={() => { handleShowRemoveModal(prod.id) }}><b>Remove</b></button>
                                        </div>
                                    </div>
                                </div>
                            </div><br />
                        </div>
                    ))
                }
                <CartProductsRemoveModal cartId ={selected} show={showRemove} handleHideRemoveModal={handleHideRemoveModal}></CartProductsRemoveModal>
            </div>
            <div className="d-flex justify-content-center">
                <button className="btn btn-danger mt-3" style={{ color: "black" }} onClick={handleBuyNow}><b>Buy Now</b></button>
            </div><br />
            </div>
            )}
            <br /> 
        </div>
    );
};

export default CartProducts;