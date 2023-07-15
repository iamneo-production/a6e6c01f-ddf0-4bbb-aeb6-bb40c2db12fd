import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getSellerProducts } from '../../features/productSlice';

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

    const navigate = useNavigate();
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(getSellerProducts({token:token}))
    },[])
    const sellerProductsList = useSelector(state => state.product.sellerProductsList);

    return (
        <div>
            {
                sellerProductsList.map((prod, index) =>
                (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center' }} key={index}>
                            <div className="row">
                                <div className="col-md-2" style={{ marginLeft: 40 }}>
                                    <img src={`data:image/jpeg;base64,${prod.image}`} alt="Card" className="d-block " width={155} height={135} />
                                    <div className='prod-price d-inline mt-4 mb-2 ms-4 fw-bold '>{prod.quantity}</div>
                                </div>

                                <div className="col-md-9 border">
                                    <div className="card-body">
                                        <h6 className="card-title fw-bold">{prod.name}</h6>
                                        <p className="card-text text-muted fw-bold ">{`₹ ${prod.price.toLocaleString("en-US")}`}</p>
                                        <div className=' btn btn-light border d-inline  px-2 py-2 mb-3 fw-bold fs-6'>Buyers</div>
                                        <div className=' btn btn-light border d-inline ms-3 px-2 py-2 mb-3 fw-bold fs-6'>Edit</div>
                                        <div className=' btn btn-light border d-inline float-end px-2 py-2 mb-3 bg-danger fw-bold'>Remove</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                    </div>
                ))
            }
        </div>
    );
};

export default AllProducts;