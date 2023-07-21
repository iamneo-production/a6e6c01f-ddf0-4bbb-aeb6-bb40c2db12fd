import { useState, useRef } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaSearch } from 'react-icons/fa';
import { MdAccountCircle, MdLogout, MdAddShoppingCart, MdLocationOn, MdMessage, MdReviews, MdHome } from 'react-icons/md';
import { HiShoppingCart } from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {setSearchQuery} from "../../features/productSlice";
import LogOutModal from './LogOutModal';

export default function NavigationBar() {
    const [showDropDown, setShowDropDown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const handleHideRemoveModal = () => setShowLogoutModal(false);
    const target = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [search,setSearch] = useState('');
    const currentUser = useSelector(state => state.user.currentUser)

    function handlePurchaseHistory() {
        navigate("/purchasehistory", { state: { currentUser } });
    }

    function handleMyProfile() {
        navigate("/profile", { state: { currentUser } });
    }

    function handleQA() {
        navigate("/qa", { state: { currentUser } });
    }

    function handleChangeAddress() {
        navigate("/changeaddress", { state: { currentUser } });
    }

    function handleBuyerHome() {
        navigate("/home", { state: { currentUser } });
    }

    async function handleLogout() {
        await setShowLogoutModal(!showLogoutModal);
        setShowDropDown(!showDropDown);
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            handleSearch();
        }
    }

    async function handleSearch() {
        console.log("search-query",search)
        await dispatch(setSearchQuery({searchQuery:search}));
        navigate('/search')
    }
    return (
        <div>

            <div className="header-main border-bottom bg-dark fixed-top">
                <div className="container-fluid">
                    <div className="row p-2 d-flex align-items-center">
                        <div className="col-md-2">
                            <a className="navbar-brand" href="#">
                                <img src={require("../../assets/logo.png")} alt=" " width="100" height="31" className="d-inline-block align-text-top" />
                            </a>
                        </div>
                        <div className="col-md-7">
                            <div class="input-group">
                                <input onChange={(e) => setSearch(e.target.value)} onKeyPress={handleKeyPress} type="text" class="form-control" placeholder="Search" aria-describedby="basic-addon2" />
                                <div class="input-group-append">
                                    <button onClick={() => handleSearch()} class="btn btn-outline-secondary" type="button"><i className="md md-envelope mx-1"> <FaSearch style={{ justifyContent: "center", height: 20, paddingBottom: "5px" }} /></i></button>
                                </div>
                            </div>



                        </div>
                        <div className="col-md-3">
                            <ul className="navbar-nav d-flex flex-row-reverse justify-content me-3">
                                <li className="nav-item me-3 me-lg-0">
                                    <a ref={target} onClick={() => setShowDropDown(!showDropDown)} className="nav-link text-white" href="#"><i className="md md-envelope mx-1"> <MdAccountCircle style={{ width: 30, height: 20 }} /></i>Hi, {currentUser.firstName}</a>
                                    <Offcanvas style={{ width: 250, marginTop: 60 }} placement={'end'} show={showDropDown} onHide={() => setShowDropDown(!showDropDown)}>
                                        <Offcanvas.Header closeButton>
                                            <Offcanvas.Title><b>Menu</b></Offcanvas.Title>
                                        </Offcanvas.Header>
                                        <Offcanvas.Body>
                                            <div class="list-group list-group-flush">
                                                <a onClick={handleBuyerHome} href="#" class="list-group-item list-group-item-action"><MdHome style={{ width: 30, height: 20 }} />Home</a>
                                                <a onClick={handleMyProfile} href="#" class="list-group-item list-group-item-action"><MdAccountCircle style={{ width: 30, height: 20 }} />My Profile</a>
                                                <a onClick={handlePurchaseHistory} href="#" class="list-group-item list-group-item-action"><MdAddShoppingCart style={{ width: 30, height: 20 }} />Purchase History</a>
                                                <a onClick={handleChangeAddress} href="#" class="list-group-item list-group-item-action"><MdLocationOn style={{ width: 30, height: 20 }} />Change Address</a>
                                                <a onClick={handleQA} href="#" class="list-group-item list-group-item-action"><MdMessage style={{ width: 30, height: 20 }} />Q & A</a>
                                                <a href="#" class="list-group-item list-group-item-action" onClick={() => handleLogout()}><MdLogout style={{ width: 30, height: 20 }} />Logout</a>
                                            </div>
                                        </Offcanvas.Body>
                                    </Offcanvas>
                                </li>
                                <li className="nav-item me-3 me-lg-4">
                                    <a className="nav-link text-white" href="#" onClick={() =>  navigate("/cart")}><i className="hi hi-envelope mx-1"><HiShoppingCart style={{ width: 30, height: 20 }} /></i> Cart</a>
                                </li>
                            </ul>
                            <LogOutModal show={showLogoutModal} handleHideRemoveModal={handleHideRemoveModal}/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}