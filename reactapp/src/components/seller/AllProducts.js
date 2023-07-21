import React, { useEffect,useState } from 'react';
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getSellerProducts } from '../../features/productSlice';
import { ReactComponent as EmptySellerProducts } from '../../assets/EmptySellerProducts.svg';
import SellerProductRemoveModal from './SellerProductRemoveModal'

const products = [
    {
        name: "Samsung Galaxy M04 Light Green, 4GB RAM, 64GB Storage | Upto 8GB RAM With RAM Plus | 5000 mAh Battery | 13MP Dual Camera",
        image: "https://m.media-amazon.com/images/I/61ODgTm9J6L._SX679_.jpg",
        cost: "INR 29,000.00",
        quantity: "20 left"
    },
    {
        name: "Samsung Galaxy M04 Light Green, 4GB RAM, 64GB Storage | Upto 8GB RAM With RAM Plus | 5000 mAh Battery | 13MP Dual Camera",
        image: "https://m.media-amazon.com/images/I/61ODgTm9J6L._SX679_.jpg",
        cost: "INR 16,000.00",
        quantity: "Out Of Stock"
    }

];

const AllProducts = () => {
    const [showRemove, setShowRemove] = useState(false);
    const [selectedItem,setSelectedItem] = useState('');
    const handleShowRemoveModal = (productId) => {
        setSelectedItem(productId)
        setShowRemove(true)
    };
    const navigate = useNavigate();
    const handleHideRemoveModal = () => setShowRemove(false);
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(getSellerProducts({token:token}))
    },[])
    const sellerProductsList = useSelector(state => state.product.sellerProductsList);

    return (
        <div>
            {sellerProductsList.length === 0 ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                <div style={{ width: 400, height: 400 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <h5 style={{ color: "grey" }}><b>No products added yet</b></h5>
                    </div>
                    <EmptySellerProducts />
                </div>
            </div>
            ) : (
                sellerProductsList.map((prod, index) =>
                (
                    <div>
                        <div className={"container"} key={index}>
                            <div className="row">
                                <div className="col-2 d-flex flex-column align-items-center">
                                    <img src={`data:image/jpeg;base64,${prod.image}`} alt="Card" className="d-block " width={155} height={135} />
                                    {prod.quantity < 1 ? 
                                    <span className="card-text fw-bold " style={{ fontSize: 14 }}><span style={{ color: "#F25151" }}>Out of Stock</span></span> 
                                    : <span className="card-text fw-bold " style={{ fontSize: 14 }}><span style={{ color: "grey" }}>Stock left:</span><span className='text-success'>{` ${prod.quantity}`}</span></span>}
                                </div>

                                <div className="col-10 border">
                                    <div className="card-body">
                                        <h6 className="card-title fw-bold">{prod.name}</h6>
                                        <div className="d-flex align-items-center pb-3">
                                            <span className="text-success fw-bold fs-8" style={{ marginRight: "10px" }}>{`₹ ${prod.price.toLocaleString("en-US")}`}</span>
                                            
                                        </div>
                                        <div className=' btn btn-light border d-inline  px-2 py-2 mb-3 fw-bold fs-6' onClick={() => navigate(`/seller/buyersandreviews/${prod.id}`)}>Buyers</div>
                                        <div className=' btn btn-light border d-inline ms-3 px-2 py-2 mb-3 fw-bold fs-6'onClick={() => navigate(`/seller/editproduct/${prod.id}`)}>Edit</div>
                                        <div className=' btn btn-light border d-inline float-end px-2 py-2 mb-3 bg-danger fw-bold' onClick={() => { handleShowRemoveModal(prod.id) }}>Remove</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <SellerProductRemoveModal productId={selectedItem} show={showRemove} handleHideRemoveModal={handleHideRemoveModal}></SellerProductRemoveModal>
                    </div>
                ))
            )}
        </div>
    );
};

export default AllProducts;