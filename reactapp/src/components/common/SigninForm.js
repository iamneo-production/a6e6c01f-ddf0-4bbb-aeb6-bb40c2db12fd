import { useState,useRef } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BsInfoCircle } from 'react-icons/bs';

export default function SigninForm(props) {
    
    const [inputValue,setInputValue]= useState({email:'', password:''});
    const dispatch = useDispatch() 
    const emailValidation = new RegExp ('\\w@gmail.com')
    const passwordValidation = new RegExp ('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,}$')
    const tooltipRef = useRef(null);

    const handleSignin = () => {

        if ((inputValue.email === '') || (inputValue.password === '')) {
            toast.error('Fill out all fields !', {
                position: toast.POSITION.TOP_CENTER
            });
        } 
        else {
            if (emailValidation.test(inputValue.email)) {
                if (passwordValidation.test(inputValue.password)) {
                    console.log(inputValue);
                    console.log("-----------------")
                    dispatch(loginUser(inputValue))
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
    }

    return (
        <Offcanvas placement={'end'} show={props.show} onHide={() => props.onHide()} >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title><b>Signin</b></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div class="container">

                    <div class="mb-3">
                        <p style={{ textAlign: "left" }}> Email</p>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" onChange={(e) => {setInputValue({...inputValue,email:e.target.value})}}/>
                    </div>
                    <div class="mb-3">
                        <p style={{ textAlign: "left" }}> Password</p>
                        <div className="input-group">
                        <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="Password" onChange={(e) => {setInputValue({...inputValue,password:e.target.value})}}/>
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

                    <br></br>
                    <div className="d-flex justify-content-center">
                        <button style={{ backgroundColor: "#F25151", color: "black", marginTop: 5 }} type="button" class="btn" onClick={() => handleSignin()}><b>Submit</b></button>
                        <ToastContainer />
                    </div>
                    <div className="d-flex justify-content-center">
                        <p style={{ marginTop: 15 }}>Didn't have an account? <a onClick={() => { props.onHide(); props.openSignup() }} style={{cursor:'pointer'}} class="text-reset text-decoration-underline"><b>Signup</b></a></p>
                    </div>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}