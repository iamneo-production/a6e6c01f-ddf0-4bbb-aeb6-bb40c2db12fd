import { MdAccountCircle, MdLogout } from 'react-icons/md';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useRef, useState } from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch,useSelector } from 'react-redux';
import LogOutModal from '../common/LogOutModal';

export default function AdminNavigationBar() {
    const [showDropDown, setShowDropDown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const handleHideRemoveModal = () => setShowLogoutModal(false);
    const navigate = useNavigate();
    const target = useRef(null);
    const dispatch = useDispatch() 
    const currentUser = useSelector(state => state.user.currentUser)

    async function handleLogout() {
        await setShowLogoutModal(!showLogoutModal);
        setShowDropDown(!showDropDown);
    }

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" style={{ marginLeft: -8 }} href="#">
                        <img src={require("../../assets/logo.png")} alt=" " width="100" height="31" className="d-inline-block align-text-top" />
                    </a>
                    <div className="d-flex flex-row">
                        <a ref={target} onClick={() => setShowDropDown(!showDropDown)} className="nav-link text-white" href="#">

                            <i className="md md-envelope mx-1"> <MdAccountCircle style={{ width: 30, height: 20 }} />
                            </i>Hi, {currentUser.firstName}</a>
                        <Offcanvas style={{ width: 250, marginTop: 60 }} placement={'end'} show={showDropDown} onHide={() => setShowDropDown(!showDropDown)}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title><b>Menu</b></Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <div class="list-group list-group-flush">
                                    <a href="/profile" class="list-group-item list-group-item-action"><MdAccountCircle style={{ width: 30, height: 20 }} />My Profile</a>
                                    <a href="#" class="list-group-item list-group-item-action" onClick={()=>handleLogout()} ><MdLogout style={{ width: 30, height: 20 }} />Logout</a>
                                </div>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </div>
                    <LogOutModal show={showLogoutModal} handleHideRemoveModal={handleHideRemoveModal}/>
                </div>
            </nav>
        </div>
    )
}
