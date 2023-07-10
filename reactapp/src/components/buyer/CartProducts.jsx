import React, { useState } from 'react';
import ProductQuantity from './ProductQuantity';
import CartProductsRemoveModal from './CartProductsRemoveModal';
import NavigationBar from '../common/NavigationBar';

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
    const handleShowRemoveModal = () => setShowRemove(true);
    const handleHideRemoveModal = () => setShowRemove(false);
    return (
        <div><br /><br />
            <NavigationBar />
            <div><h3 style={{ marginLeft: 10, marginTop: 20 }}><b>CART</b></h3></div><br/>
            <div>
                {
                    products.map((prod, index) =>
                    (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'center' }} key={index}>
                                <div className="row ">
                                    <div className="col-md-2 ms-5  ">
                                        <img src={prod.image} alt="Card" className=" d-block  " width={155} height={135} />
                                        <ProductQuantity />
                                    </div>
                                    <div className="col-md-9 border  ">
                                        <div className="card-body">
                                            <h6 className="card-title fw-bold">{prod.name}</h6>
                                            <p className="card-text text-muted fw-bold">{prod.cost}</p>
                                            <button type="button" className="btn btn-danger" style={{ color: "black" }} onClick={() => { handleShowRemoveModal() }}><b>Remove</b></button>
                                            <CartProductsRemoveModal show={showRemove} handleHideRemoveModal={handleHideRemoveModal}></CartProductsRemoveModal>
                                        </div>
                                    </div>
                                </div>
                            </div><br />
                        </div>
                    ))
                }
            </div>
            <div className="d-flex justify-content-center">
                <button className="btn btn-danger mt-3" style={{ color: "black" }}><b>Buy Now</b></button>
            </div><br />
        </div>
    );
};

export default CartProducts;