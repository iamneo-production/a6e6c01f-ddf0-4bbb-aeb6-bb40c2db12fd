import Offcanvas from 'react-bootstrap/Offcanvas';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addAddress, fetchAddress} from "../../features/addressSlice";

export default function AddAddressModal(props) {
    const [formValue,setFormValue] = useState({});
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    async function handleSubmit() {
        await dispatch(addAddress({...formValue, token: token}))
        await dispatch(fetchAddress({token:token}))
        props.onHide()
    }
    return (
        <Offcanvas placement={'end'} show={props.show} onHide={() => props.onHide()}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title><b>Add Address</b></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div class="container">
                    <div class="mb-3">
                        <p style={{ textAlign: "left" }}> Flat, House no., Building, Company, Apartment</p>
                        <input onChange={(e) => setFormValue({...formValue,flatNo:e.target.value})} type="flat-no" class="form-control" id="exampleFormControlInput1" />
                    </div>
                    <div class="mb-3">
                        <p style={{ textAlign: "left" }}> Area, Street, Sector, Village</p>
                        <input onChange={(e) => setFormValue({...formValue,area:e.target.value})} type="area" class="form-control" id="exampleFormControlInput1" />
                    </div>
                    <div class="mb-3">
                        <p style={{ textAlign: "left" }}> Town/City</p>
                        <input onChange={(e) => setFormValue({...formValue,city:e.target.value})} type="city" class="form-control" id="exampleFormControlInput1" />
                    </div>
                    <div class="mb-3">
                        <p style={{ textAlign: "left" }}> State</p>
                        <input onChange={(e) => setFormValue({...formValue,state:e.target.value})} type="state" class="form-control" id="exampleFormControlInput1" />
                    </div>
                    <div class="mb-3">
                        <p style={{ textAlign: "left" }}> Pincode</p>
                        <input onChange={(e) => setFormValue({...formValue,pincode:e.target.value})} type="pincode" class="form-control" id="exampleFormControlInput1" />
                    </div>

                    <br></br>
                    <div className="d-flex justify-content-center">
                        <button onClick={() => handleSubmit()} className="btn btn-danger mt-3" style={{ color: "black" }}><b>Submit</b></button>
                    </div>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}