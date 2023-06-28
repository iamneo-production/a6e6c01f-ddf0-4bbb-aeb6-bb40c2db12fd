import React, { useState } from 'react';
import { SellerData } from "../../components/seller/DummySellerData";
import SellerNavigationBar from '../../components/seller/SellerNavigationBar';
import Footer from '../../components/common/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddProductPage() {
    const inputStyle = { input: { paddingLeft: "30px" } };
    const [systemimage, setImage] = useState(null)
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }
    const notify = () => toast("Product has been added successfully.");

    return (

        <div>
            <SellerNavigationBar/>
            <h3 style={{ marginLeft: 10, marginTop: 8 }}><b>ADD PRODUCT</b></h3>
            <br></br>
            {SellerData.map(({ id, image, name, price, productDescription, category1, category2, quantity }) => (
                <div style={{ padding: "0px 30px 30px 30px" }}>

                    <label for="exampleFormControlInput1" class="form-label"><b>Image</b></label>
                    <div style={inputStyle.input}>
                        <div class="card" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <div class="card-body">
                                <img style={{ paddingTop: "5px" }} height={80} width={80} alt="preview image" src={systemimage} /><br></br>
                            </div>
                        </div>
                        <input style={{ marginTop: 20 }} type="file" onChange={onImageChange} className="filetype" />
                    </div>
                    <br></br>

                    <label for="exampleFormControlInput1" class="form-label"><b>Product Name</b></label>
                    <div style={inputStyle.input} >
                        <input type="text" placeholder='Product name' class="form-control" id="exampleFormControlInput1"></input>
                    </div>
                    <br></br>

                    <label for="exampleFormControlInput1" class="form-label"><b>Product Description</b></label>
                    <div style={inputStyle.input}>
                        <textarea class="form-control" placeholder='Product description' id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <br></br>

                    <label for="exampleFormControlInput1" class="form-label"><b>Price</b></label>
                    <div style={inputStyle.input}>
                        <input type="text" placeholder='Product price' class="form-control" id="exampleFormControlInput1"></input>
                    </div>
                    <br></br>

                    <label for="exampleFormControlInput1" class="form-label"><b>Categories</b></label>
                    <br></br>
                    <div className="d-flex justify-content-start" style={inputStyle.input}>
                        <div>
                            <label for="exampleFormControlInput1" class="form-label">Brand</label>
                            <input type="text" placeholder='Brand name' class="form-control" id="exampleFormControlInput1"></input>
                        </div>
                        <div style={{ marginLeft: "40px" }}>
                            <label for="exampleFormControlInput1" class="form-label">color</label>
                            <input type="text" placeholder='Product Color' class="form-control" id="exampleFormControlInput1"></input>
                            <br></br>
                        </div>
                    </div>

                    <label for="exampleFormControlInput1" class="form-label"><b>Quantity</b></label>
                    <div style={inputStyle.input}>
                        <input type="text" placeholder='Product Quantity' class="form-control" id="exampleFormControlInput1"></input>
                    </div>
                    <br></br>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <button onClick={() => {notify()}} type="submit" class="btn btn-danger" style={{ backgroundColor: "#F25151", color: "black", width: 200 }}><b>Submit</b></button>
                        <ToastContainer />
                    </div>
                </div>
            ))}
            <Footer/>
        </div>
    )
}