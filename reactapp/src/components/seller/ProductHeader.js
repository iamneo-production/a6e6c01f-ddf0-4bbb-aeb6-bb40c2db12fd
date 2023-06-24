import React from 'react'

export default function ProductHeader() {
    return (
        <div>
            <div>
                <br />
                <div class="d-flex justify-content-between"  style={{paddingRight:50}}>
                    <h3 style={{ marginLeft: 10, marginTop: 8 }}><b>PRODUCTS</b></h3>
                    <button type="button" class="btn btn-light border d-inline float-end px-2 py-2 mb-3 bg-danger fw-bold">Add Product</button>
                </div>
                <br />
            </div>
        </div>
    )
}