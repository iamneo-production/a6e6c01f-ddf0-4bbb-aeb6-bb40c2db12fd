import { MdAccountCircle,MdCheckCircle,MdMessage,MdLogout } from 'react-icons/md';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useRef, useState } from 'react';
import {useSelector,useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom";
import { logout } from "../../features/userSlice";

export default function SellerNavigationBar() {
    const [showDropDown, setShowDropDown] = useState(false);
    const target = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch() 
    const currentUser = useSelector(state => state.user.currentUser)

    function handleLogout(){
        dispatch(logout())
        navigate("/")
    } 

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" style={{ marginLeft: -8 }} href="#">
                        <img src={require("../../assets/logo.png")} alt=" " width="100" height="31" className="d-inline-block align-text-top" />
                    </a>
                    <div className="d-flex flex-row">
                        <a ref={target} onClick={() => setShowDropDown(!showDropDown)} className="nav-link text-white" href="#"><i className="md md-envelope mx-1"> <MdAccountCircle style={{ width: 30, height: 20 }} /></i>Hi, {currentUser.firstName}</a>
                        <Offcanvas style={{ width: 250, marginTop: 60 }} placement={'end'} show={showDropDown} onHide={() => setShowDropDown(!showDropDown)}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title><b>Menu</b></Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <div class="list-group list-group-flush">
                                    <a href="#" class="list-group-item list-group-item-action"><MdAccountCircle style={{ width: 30, height: 20 }} />My Profile</a>
                                    <a href="#" class="list-group-item list-group-item-action"><MdCheckCircle style={{ width: 30, height: 20 }} />Add Products</a>
                                    <a href="#" class="list-group-item list-group-item-action"><MdMessage style={{ width: 30, height: 20 }} />Chats</a>
                                    <a href="#" class="list-group-item list-group-item-action" onClick={()=>handleLogout()}><MdLogout style={{ width: 30, height: 20 }} />Logout</a>
                                </div>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </div>
                </div>
            </nav>
        </div>
    )
}