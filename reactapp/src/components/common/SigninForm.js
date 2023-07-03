import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SigninForm(props) {
    
    const [inputValue,setInputValue]= useState({email:'', password:''});
    const dispatch = useDispatch() 
    
    const handleSignin = () => {
        if ((inputValue.email === '') || (inputValue.password === '')) {
            toast.error('Fill out all fields !', {
                position: toast.POSITION.TOP_CENTER
            });
        } else {
            console.log(inputValue);
            console.log("-----------------")
            dispatch(loginUser(inputValue))
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
                        <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="Password" onChange={(e) => {setInputValue({...inputValue,password:e.target.value})}}/>
                    </div>

                    <br></br>
                    <div className="d-flex justify-content-center">
                        <button style={{ backgroundColor: "#F25151", color: "black", marginTop: 5 }} type="button" class="btn" onClick={() => handleSignin()}><b>Submit</b></button>
                        <ToastContainer />
                    </div>
                    <p style={{ marginTop: 15 }}>Didn't have an account? <a onClick={() => { props.onHide(); props.openSignup() }} style={{cursor:'pointer'}} class="text-reset text-decoration-underline"><b>Signup</b></a></p>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}