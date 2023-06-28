import React from 'react';

const products = [
    {
        name: "TOTAL REVENUE",
        value: "RS 44000"
    },
    {
        name: "TOTAL PRODUCTS",
        value: "114"
    },
    {
        name: "SOLD PRODUCTS",
        value: "20"
    },
    {
        name: "UNSOLD PRODUCTS",
        value: "20"
    },
    {
        name: "OUT OF STOCK",
        value: "10"
    },
    {
        name: "TOTAL BUYERS",
        value: "100"
    },
];

export default function DashBoard() {
    return (
        <div>
            <div><h3 style={{ marginLeft: 10, marginTop: 8 }}><b>DASHBOARD</b></h3></div>
            <div className=" dashboard container  mx-auto mt-4  row border rounded" >
                {
                    products.map((prod, index) =>
                    (
                        <div className="col-md-2 pt-3">

                            <h6 className='fw-bold'>{prod.value}</h6>
                            <p className="fs-6 text-muted fw-bold ">{prod.name}</p>

                        </div>
                    ))
                }
            </div>
        </div>

    )
}