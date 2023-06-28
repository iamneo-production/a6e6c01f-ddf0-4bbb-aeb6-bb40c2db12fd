import Offcanvas from 'react-bootstrap/Offcanvas';

export default function SignupForm(props) {
    return (
        <Offcanvas placement={'end'} show={props.show} onHide={() => props.onHide()}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title><b>Signup</b></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div class="container">
                    <div class="mb-3">
                        <p style={{ textAlign: "left" }}> Name</p>
                        <input type="name" class="form-control" id="exampleFormControlInput1" placeholder="Ridhi Sidhi" />
                    </div>
                    <div class="mb-3">
                        <p style={{ textAlign: "left" }}> Email</p>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>
                    <div class="mb-3">
                        <p style={{ textAlign: "left" }}> Password</p>
                        <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="Password" />
                    </div>
                    <div class="mb-3">
                        <p style={{ textAlign: "left" }}> Address</p>
                        <input type="address" class="form-control" id="exampleFormControlInput1" placeholder="5,sai avenue" />
                    </div>
                    <div class="mb-3">
                        <p style={{ textAlign: "left" }}> Phone</p>
                        <input type="phone" class="form-control" id="exampleFormControlInput1" placeholder="+91 987878999" />
                    </div>
                    <div style={{ marginTop: 8 }}>
                        <p style={{ textAlign: "left" }} >Type</p>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            <label class="form-check-label" for="flexRadioDefault1">
                                Seller
                            </label>
                        </div>
                        <div class="form-check form-check-inline text-start">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                            <label class="form-check-label" for="flexRadioDefault2">
                                Buyer
                            </label>
                        </div>
                    </div>

                    <br></br>
                    <button style={{ backgroundColor: "#F25151", color: "black", marginTop: 10 }} type="button" class="btn" >Submit</button>
                    <p style={{ marginTop: 8 }}>Already have an account <a onClick={() => { props.onHide(); props.openSignin() }} style={{cursor:'pointer'}} class="text-reset">Signin</a></p>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}