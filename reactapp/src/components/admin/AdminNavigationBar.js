import { MdAccountCircle, MdLogout } from 'react-icons/md';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useRef, useState } from 'react';

export default function AdminNavigationBar() {
    const [showDropDown, setShowDropDown] = useState(false);
    const target = useRef(null);
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
                            </i>Hi, Username</a>
                        <Offcanvas style={{ width: 250, marginTop: 60 }} placement={'end'} show={showDropDown} onHide={() => setShowDropDown(!showDropDown)}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title><b>Menu</b></Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <div class="list-group list-group-flush">
                                    <a href="#" class="list-group-item list-group-item-action"><MdAccountCircle style={{ width: 30, height: 20 }} />My Profile</a>
                                    <a href="#" class="list-group-item list-group-item-action"><MdLogout style={{ width: 30, height: 20 }} />Logout</a>
                                </div>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </div>
                </div>
            </nav>
        </div>
    )
}