import Offcanvas from 'react-bootstrap/Offcanvas';

export default function AddAddressModal(props) {
    return (
        <Offcanvas placement={'end'} show={props.show} onHide={() => props.onHide()}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title><b>Add Address</b></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div class="container">
                    <div class="mb-3">
                        <p style={{ textAlign: "left" }}> Flat, House no., Building, Company, Apartment</p>
                        <input type="name" class="form-control" id="exampleFormControlInput1" />
                    </div>
                    <div class="mb-3">
                        <p style={{ textAlign: "left" }}> Area, Street, Sector, Village</p>
                        <input type="email" class="form-control" id="exampleFormControlInput1" />
                    </div>
                    <div class="mb-3">
                        <p style={{ textAlign: "left" }}> Town/City</p>
                        <input type="password" class="form-control" id="exampleFormControlInput1" />
                    </div>
                    <div class="mb-3">
                        <p style={{ textAlign: "left" }}> State</p>
                        <input type="address" class="form-control" id="exampleFormControlInput1" />
                    </div>
                    <div class="mb-3">
                        <p style={{ textAlign: "left" }}> Pincode</p>
                        <input type="phone" class="form-control" id="exampleFormControlInput1" />
                    </div>

                    <br></br>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-danger mt-3" style={{ color: "black" }}><b>Submit</b></button>
                    </div>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}