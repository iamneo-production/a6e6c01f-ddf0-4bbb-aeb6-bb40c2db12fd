import Offcanvas from 'react-bootstrap/Offcanvas';

export default function SigninForm(props) {
    return (
        <Offcanvas placement={'end'} show={props.show} onHide={() => props.onHide()} >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title><b>Signin</b></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div class="container">

                    <div class="mb-3">
                        <p style={{ textAlign: "left" }}> Email</p>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>
                    <div class="mb-3">
                        <p style={{ textAlign: "left" }}> Password</p>
                        <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="Password" />
                    </div>

                    <br></br>
                    <button style={{ backgroundColor: "#F25151", color: "black", marginTop: 5 }} type="button" class="btn" >Submit</button>
                    <p style={{ marginTop: 15 }}>Didn't have an account? <a onClick={() => { props.onHide(); props.openSignup() }} style={{cursor:'pointer'}} class="text-reset">Signup</a></p>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}