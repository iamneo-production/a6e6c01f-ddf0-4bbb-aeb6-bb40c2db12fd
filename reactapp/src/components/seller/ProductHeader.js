import React from 'react'
import {useNavigate} from "react-router-dom";

export default function ProductHeader() {
    const navigate = useNavigate();
    return (
        <div>
            <div>
                <br />
                <div class="d-flex justify-content-between"  style={{paddingRight:50}}>
                    <h3 style={{ marginLeft: 10, marginTop: 8 }}><b>PRODUCTS</b></h3>
                    <button type="button" class="btn btn-light border d-inline float-end px-2 py-2 mb-3 bg-danger fw-bold" onClick={() => navigate("/seller/addProduct")}>Add Product</button>
                </div>
                <br />
            </div>
        </div>
    )
}