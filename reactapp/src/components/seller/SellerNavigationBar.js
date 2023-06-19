import { MdAccountCircle } from 'react-icons/md';

export default function SellerNavigationBar() {
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" style={{ marginLeft: -8 }} href="#">
                        <img src={require("../../assets/logo.png")} alt=" " width="100" height="31" className="d-inline-block align-text-top" />
                    </a>
                    <div className="d-flex flex-row">
                        <a className="nav-link text-white" href="#"><i className="md md-envelope mx-1"> <MdAccountCircle style={{ width: 30, height: 20 }} /></i>Hi, Username</a>
                    </div>
                </div>
            </nav>
        </div>
    )
}