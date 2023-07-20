import React, { useEffect, useState } from 'react';
import NavigationBar from '../../components/common/NavigationBar';
import Footer from '../../components/common/Footer';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../../features/cartSlice';
import { fetchAddress } from '../../features/addressSlice';
import { MdKeyboardBackspace } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import OrderPlaceModal from '../../components/buyer/OrderPlaceModal';
import {createPurchase} from "../../api/purchaseService";



export default function CheckoutPage() {
    const token = useSelector((state) => state.user.token);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [selectedAddress, setSelectedAddress] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCart({ token: token }));
        dispatch(fetchAddress({ token: token }));
    }, []);
    const cartList = useSelector((state) => state.cart.cartList);
    const addressList = useSelector((state) => state.address.addressList);
    const deliveryCharge = 50;
    const [showOrderPopup, setShowOrderPopup] = useState(false);
    const handleHideRemoveModal = () => setShowOrderPopup(false);

    const notify = () => {
        if (addressList.length === 0) {
            toast.error('Address is not added', {
                position: toast.POSITION.TOP_CENTER
            });
        }
        else {
            toast('Will be delivered here');
        }
    };
    const handleChangeAddress = () => {
        navigate('/changeaddress');
    };
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate('/cart');
    };

    const handleOrderPlace = () => {
        console.log(selectedPaymentMethod)
        if (addressList.length === 0) {
            toast.error('Address is not added', {
                position: toast.POSITION.TOP_CENTER
            });
        }
        else if (!selectedPaymentMethod) {
            toast.error('Please select a payment method', {
                position: toast.POSITION.TOP_CENTER
            });
        }
        else {
            setShowOrderPopup(true);
        }
    };

    const totalPrice = cartList.reduce((total, item) => {
        const itemPrice = item.product.price * item.quantity;
        return total + itemPrice;
    }, 0);

    const totalAmount = totalPrice + deliveryCharge;


    return (
        <div>
            <NavigationBar />
            <br />
            <br />
            <br />
            <div className="d-flex flex-row align-items-center">
                <p className="ms-3">
                    <MdKeyboardBackspace
                        style={{ color: 'grey' }}
                        onClick={handleGoBack}
                    />
                    {' '}
                    <a href="#" style={{ color: 'grey' }} onClick={handleGoBack}>
                        Back
                    </a>
                </p>
                <p className="ms-3" style={{ fontSize: 30 }}>
                    <b>CHECKOUT</b>
                </p>
            </div>

            <div className="container" style={{ marginLeft: 80 }}>
                <div className="row">
                    <div className="col-6">
                        <div className="d-flex justify-content-between">
                            <h5>
                                <b>ADDRESS</b>
                            </h5>
                            <a
                                style={{
                                    cursor: 'pointer',
                                    marginBottom: 10,
                                    marginRight: 75,
                                }}
                                className="text-reset text-decoration-underline"
                                onClick={handleChangeAddress}
                            >
                                <b>Add/Change Address</b>
                            </a>
                        </div>
                        <br />

                        <div className="card" style={{ backgroundColor: '#F4F4F4', marginRight: 75 }}>
                            {addressList.length === 0 ? (
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center",marginTop:20 }}>
                                            <h6 style={{ color: "grey" }}><b>Add address first</b></h6>
                                        </div>
                                </div>
                            ) : (
                                addressList.map((value, index) => (
                                    <div className="card" style={{ margin: 16, marginBottom: 5 }} key={index}>
                                        <div className="form-check">
                                            <div className="card-body">
                                                <h5 className="fw-bold">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="flexRadioDefault"
                                                        id={`flexRadioDefault${index}`}
                                                    />
                                                    <label className="form-check-label" htmlFor={`flexRadioDefault${index}`}>
                                                        Address {index + 1}
                                                    </label>
                                                </h5>
                                                <span>{`${value.flatNo}, ${value.area}, ${value.city}, ${value.state}, ${value.pincode}`}</span>
                                                <br />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}

                            <div className="d-flex flex-row-reverse">
                                <button
                                    style={{ backgroundColor: '#F25151', color: 'black', margin: '0px 10px 10px 10px' }}
                                    type="button"
                                    className="btn"
                                    onClick={() => {
                                        notify();
                                    }}
                                >
                                    <b>Deliver Here</b>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div style={{ marginLeft: 75 }}>
                            <h5>
                                <b>PRICE SUMMARY</b>
                            </h5>
                        </div>
                        <br />
                        <div className="card" style={{ backgroundColor: '#F4F4F4', marginLeft: 75 }}>
                            <div className="card" style={{ margin: '15px' }}>
                                <div className="card-body">
                                    <h5>
                                        <b>Summary</b>
                                    </h5>
                                    <br />
                                    <div className="d-flex justify-content-between">
                                        <p>Price</p>
                                        <p>{totalPrice}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p>Delivery Charge</p>
                                        <p>50</p>
                                    </div>
                                    <p>-------------------------------------------------------------</p>
                                    <div className="d-flex justify-content-between">
                                        <p>Total</p>
                                        <p>{totalAmount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div className="container">
                <div className="col">
                    <h5>
                        <b>YOUR ORDER</b>
                    </h5>
                    <br />
                    <div>
                        {cartList.map((prod, index) => (
                            <div key={index}>
                                <div className="container" >
                                    <div className="row">
                                        <div className="col-2">
                                            <img
                                                src={`data:image/jpeg;base64,${prod.product.image}`}
                                                alt="Card"
                                                className="d-block"
                                                width={155}
                                                height={135}
                                            />
                                        </div>
                                        <div className="col-10 border">
                                            <div className="card-body">
                                                <h6 className="card-title fw-bold">{prod.product.name}</h6>
                                                <span className="card-text text-muted fw-bold">{`₹ ${prod.product.price.toLocaleString(
                                                    'en-US'
                                                )}`}</span>
                                                <br />
                                                <span className="card-text text-muted" style={{ fontSize: 14 }}>{`Qty: ${prod.quantity}`}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <br />
            <div className="container">
                <div className="col">
                    <h5>
                        <b>PAYMENT METHOD</b>
                    </h5>
                    <br />
                    <div className="card" style={{ backgroundColor: '#F4F4F4' }}>
                        <div className="card-body">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault1"
                                    checked={selectedPaymentMethod === 'card'}
                                    onChange={() => setSelectedPaymentMethod('card')}
                                />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    <b>Pay with Debit/Credit/ATM Cards</b>
                                </label>
                                <br />
                                <br />
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault2"
                                    checked={selectedPaymentMethod === 'net banking'}
                                    onChange={() => setSelectedPaymentMethod('net banking')}
                                />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    <b>Net Banking</b>
                                    <br />
                                    <br />
                                    <div className="pl-4">
                                        <DropdownButton id="netBankingDropdown" variant="secondary" title="Choose an option">
                                            <Dropdown.Item href="#">HDFC bank</Dropdown.Item>
                                            <Dropdown.Item href="#">ICICI bank</Dropdown.Item>
                                            <Dropdown.Item href="#">Canara bank</Dropdown.Item>
                                        </DropdownButton>
                                    </div>
                                </label>
                                <br />
                                <br />
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault3"
                                    checked={selectedPaymentMethod === 'upi'}
                                    onChange={() => setSelectedPaymentMethod('upi')}
                                />
                                <label className="form-check-label" htmlFor="flexRadioDefault3">
                                    <b>Other UPI Apps</b>
                                    <br />
                                    <br />
                                    <h6 className="fw-light pl-4">Please enter your UPI ID</h6>
                                    <div className="pl-5">
                                        <input
                                            className="form-control form-control-sm"
                                            type="text"
                                            placeholder="EX: Mobile number@upi"
                                            aria-label=".form-control-sm example"
                                        />
                                    </div>
                                </label>
                                <br />
                                <br />
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault4"
                                    checked={selectedPaymentMethod === 'emi'}
                                    onChange={() => setSelectedPaymentMethod('emi')}
                                />
                                <label className="form-check-label" htmlFor="flexRadioDefault4">
                                    <b>EMI</b>
                                </label>
                                <br />
                                <br />
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault5"
                                    checked={selectedPaymentMethod === 'cash on delivery'}
                                    onChange={() => setSelectedPaymentMethod('cash on delivery')}
                                />
                                <label className="form-check-label" htmlFor="flexRadioDefault5">
                                    <b>Cash on Delivery/Pay on Delivery</b>
                                </label>
                                <br />
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <button
                    type="submit"
                    className="btn btn-danger"
                    style={{ backgroundColor: '#F25151', color: 'black', width: 200 }}
                    onClick={handleOrderPlace}
                >
                    <b>Proceed</b>
                </button>
            </div>
            <br />
            <br />
            <OrderPlaceModal payment={selectedPaymentMethod} cartList={cartList} show={showOrderPopup} handleHideRemoveModal={handleHideRemoveModal} />
            <Footer />
        </div>
    );
}
