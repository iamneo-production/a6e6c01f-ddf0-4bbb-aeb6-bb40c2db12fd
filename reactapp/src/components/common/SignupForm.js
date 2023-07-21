import { useState,useRef } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../features/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {OverlayTrigger, Spinner, Tooltip} from 'react-bootstrap';
import { BsInfoCircle } from 'react-icons/bs';

export default function SignupForm(props) {

    const [inputValue, setInputValue] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', roles: 'BUYER' });
    const dispatch = useDispatch()
    const signupSuccess = useSelector(state => state.user.signupSuccess)
    const signupInProgress = useSelector(state => state.user.signupInProgress)
    const nameValidation = new RegExp('^[A-Za-z\\s]+$')
    const emailValidation = new RegExp('^[a-z][a-z0-9]+(@gmail.com)$')
    const passwordValidation = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{5,}$')
    const phonenoValidation = new RegExp('^[6-9]\\d{9}$')
    const tooltipRef = useRef(null);


    const loadingOverlayStyle = {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        zIndex: 9999,
    };

    const handleSignup = () => {

        if ((inputValue.firstName === '') || (inputValue.lastName === '') || (inputValue.email === '') || (inputValue.phone === '') || (inputValue.password === '')) {
            toast.error('Fill out all fields !', {
                position: toast.POSITION.TOP_CENTER
            });
        }

        else {
            if (nameValidation.test(inputValue.firstName)) {
                if (nameValidation.test(inputValue.lastName)) {
                    if (emailValidation.test(inputValue.email)) {
                        if (passwordValidation.test(inputValue.password)) {
                            if (phonenoValidation.test(inputValue.phone)) {
                                console.log((nameValidation).test(inputValue.firstName))
                                // alert("Matched")
                                console.log(inputValue);
                                console.log("-----------------")
                                dispatch(signupUser(inputValue))
                                console.log("Signedup--", signupSuccess)
                                setInputValue({ firstName: '', lastName: '', email: '', address: '', phone: '', password: '', roles: 'BUYER' })
                            }
                            else {
                                toast.error('Enter a valid phone number!', {
                                    position: toast.POSITION.TOP_CENTER
                                });
                            }
                        }
                        else {
                            toast.error('Enter a valid password!', {
                                position: toast.POSITION.TOP_CENTER
                            });
                        }
                    }
                    else {
                        toast.error('Enter a valid email!', {
                            position: toast.POSITION.TOP_CENTER
                        });
                    }
                }
                else {
                    toast.error('Enter a valid last name!', {
                        position: toast.POSITION.TOP_CENTER
                    });
                }
            }

            else {
                toast.error('Enter a valid first name!', {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        }
    }

    return (
        <Offcanvas placement={'end'} show={props.show} onHide={() => props.onHide()}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title><b>Signup</b></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {signupInProgress ?
                    <div style={loadingOverlayStyle}>
                        <Spinner className={"mb-2"} animation="border" role="status">
                        </Spinner>
                        <span className="text-dark">Loading...</span>
                    </div> :
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
                        <div className="input-group">
                            <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="Password" value={inputValue.password} onChange={(e) => { setInputValue({ ...inputValue, password: e.target.value }) }} />
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip">Your password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 5 characters long.</Tooltip>}
                                trigger="click"
                                rootClose
                                ref={tooltipRef}
                            >
                                <span className="input-group-text" style={{ cursor: 'pointer' }}>
                                    <BsInfoCircle />
                                </span>
                            </OverlayTrigger>
                        </div>
                    </div>
                    <div class="mb-3">
                        <p style={{ textAlign: "left" }}> Phone</p>
                        <input type="phone" class="form-control" id="exampleFormControlInput1" placeholder="+91 987878999" value={inputValue.phone} onChange={(e) => { setInputValue({ ...inputValue, phone: e.target.value }) }} />
                    </div>
                    <div style={{ marginTop: 8 }}>
                        <p style={{ textAlign: "left" }} >Type</p>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={inputValue.roles === "ROLE_SELLER"} onChange={() => { setInputValue({ ...inputValue, roles: "ROLE_SELLER" }) }} />
                            <label class="form-check-label" htmlFor="flexRadioDefault1">
                                Seller
                            </label>
                        </div>
                        <div class="form-check form-check-inline text-start">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={inputValue.roles === "ROLE_BUYER"} onChange={() => { setInputValue({ ...inputValue, roles: "ROLE_BUYER" }) }} />
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
                    <div className="d-flex justify-content-center">
                        <p style={{ marginTop: 8 }}>Already have an account? <a onClick={() => { props.onHide(); props.openSignin() }} style={{ cursor: 'pointer' }} class="text-reset text-decoration-underline"><b>Signin</b></a></p>
                    </div>
                </div>
                }
            </Offcanvas.Body>
        </Offcanvas>
    )
} 