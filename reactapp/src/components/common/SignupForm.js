import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../features/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignupForm(props) {

    const [inputValue, setInputValue] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', roles: 'BUYER' });
    const dispatch = useDispatch()
    const signupSuccess = useSelector(state => state.user.signupSuccess)
    const handleSignup = () => {
        if ((inputValue.firstName === '') || (inputValue.lastName === '') || (inputValue.email === '') || (inputValue.phone === '') || (inputValue.password === '')) {
            toast.error('Fill out all fields !', {
                position: toast.POSITION.TOP_CENTER
            });
        }
        else {
            console.log(inputValue);
            console.log("-----------------")
            dispatch(signupUser(inputValue))
            console.log("Signedup--",signupSuccess)
            setInputValue({ firstName: '', lastName: '', email: '', address: '', phone: '', password: '', roles: 'BUYER' })
            props.onHide()
        }

    }

    return (
        <Offcanvas placement={'end'} show={props.show} onHide={() => props.onHide()}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title><b>Signup</b></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div class="container">
                    <div class="mb-3">
                        <p style={{ textAlign: "left" }}>First Name</p>
                        <input type="name" class="form-control" id="exampleFormControlInput1" placeholder="Senoritta" value={inputValue.firstName} onChange={(e) => { setInputValue({ ...inputValue, firstName: e.target.value }) }} />
                    </div>
                    <div class="mb-3">
                        <p style={{ textAlign: "left" }}>Last Name</p>
                        <input type="name" class="form-control" id="exampleFormControlInput1" placeholder="Smith" value={inputValue.lastName} onChange={(e) => { setInputValue({ ...inputValue, lastName: e.target.value }) }} />
                    </div>
                    <div class="mb-3">
                        <p style={{ textAlign: "left" }}> Email</p>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={inputValue.email} onChange={(e) => { setInputValue({ ...inputValue, email: e.target.value }) }} />
                    </div>
                    <div class="mb-3">
                        <p style={{ textAlign: "left" }}> Password</p>
                        <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="Password" value={inputValue.password} onChange={(e) => { setInputValue({ ...inputValue, password: e.target.value }) }} />
                    </div>
                    <div class="mb-3">
                        <p style={{ textAlign: "left" }}> Phone</p>
                        <input type="phone" class="form-control" id="exampleFormControlInput1" placeholder="+91 987878999" value={inputValue.phone} onChange={(e) => { setInputValue({ ...inputValue, phone: e.target.value }) }} />
                    </div>
                    <div style={{ marginTop: 8 }}>
                        <p style={{ textAlign: "left" }} >Type</p>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={inputValue.roles === "SELLER"} onChange={() => { setInputValue({ ...inputValue, roles: "SELLER" }) }} />
                            <label class="form-check-label" htmlFor="flexRadioDefault1">
                                Seller
                            </label>
                        </div>
                        <div class="form-check form-check-inline text-start">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={inputValue.roles === "BUYER"} onChange={() => { setInputValue({ ...inputValue, roles: "BUYER" }) }} />
                            <label class="form-check-label" htmlFor="flexRadioDefault2">
                                Buyer
                            </label>
                        </div>
                    </div>

                    <br></br>
                    <div className="d-flex justify-content-center">
                        <button style={{ backgroundColor: "#F25151", color: "black", marginTop: 10 }} type="button" class="btn" onClick={() => handleSignup()}><b>Submit</b></button>
                        <ToastContainer />
                    </div>
                    <p style={{ marginTop: 8 }}>Already have an account? <a onClick={() => { props.onHide(); props.openSignin() }} style={{ cursor: 'pointer' }} class="text-reset text-decoration-underline"><b>Signin</b></a></p>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
} 