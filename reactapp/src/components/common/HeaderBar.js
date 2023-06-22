import { useState } from "react";
import SignupForm from "./SignupForm";
import SigninForm from "./SigninForm";
export default function HeaderBar() {
    const [signup, setSignup] = useState(false);
    const [signin, setSignin] = useState(false)
    console.log(signup)
    const handleOpenSignup = () => setSignup(true)
    const handleOpenSignin = () => setSignin(true);
    const handleCloseSignup = () => setSignup(false);
    const handleCloseSignin = () => setSignin(false);

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" style={{ marginLeft: -8 }} href="#">
                        <img src={require("../../assets/logo.png")} alt=" " width="100" height="31" className="d-inline-block align-text-top" />
                    </a>
                    <div className="d-flex flex-row-reverse">
                        <button style={{ marginRight: 0 }} type="button" className="btn btn-secondary" onClick={() => { handleOpenSignup() }}>Signup</button>
                        <button style={{ marginRight: 10 }} type="button" className="btn btn-secondary" onClick={() => { handleOpenSignin() }}>Signin</button>
                    </div>

                </div>
            </nav>
            <SignupForm show={signup} onHide={handleCloseSignup} openSignin={handleOpenSignin}></SignupForm>
            <SigninForm show={signin} onHide={handleCloseSignin} openSignup={handleOpenSignup}></SigninForm>
        </div>

    )
}