import React, {useEffect, useState} from 'react';
import axios from "axios";
import {baseUrl} from "../../api/config";
import {useSelector} from "react-redux";


export default function DashBoard() {
    const [data,setData] = useState({
        total_revenue: 0,
        total_no_products: 0,
        sold_products: 0,
        unsold_products: 0,
        out_of_stock_products: 0,
        total_customers: 0
    })
    const token = useSelector(state => state.user.token)
    useEffect(() =>{
        getData()
    },[])
    function getData(){
        axios.get(`${baseUrl}/seller/dashboard`,{
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) =>{
            setData(res.data.data)
        }).catch((err) =>{
            console.log(err)
        })
    }
    return (
        <div>
            <div><h3 style={{ marginLeft: 10, marginTop: 8 }}><b>DASHBOARD</b></h3></div>
            <div className=" dashboard container  mx-auto mt-4  row border rounded" >
                <div className="col-md-2 pt-3">

                    <h6 className='text-success fw-bold'>{`₹ ${data.total_revenue?.toLocaleString("en-US")}`}</h6>
                    <p className="fs-6 text-muted fw-bold ">TOTAL REVENUE</p>

                </div>
                <div className="col-md-2 pt-3">

                    <h6 className='fw-bold'>{data.total_no_products}</h6>
                    <p className="fs-6 text-muted fw-bold ">TOTAL PRODUCTS</p>

                </div>
                <div className="col-md-2 pt-3">

                    <h6 className='fw-bold'>{data.sold_products}</h6>
                    <p className="fs-6 text-muted fw-bold ">SOLD PRODUCTS</p>

                </div>

                <div className="col-md-2 pt-3">

                    <h6 className='fw-bold'>{data.unsold_products}</h6>
                    <p className="fs-6 text-muted fw-bold ">UNSOLD PRODUCTS</p>

                </div>
                <div className="col-md-2 pt-3">

                    <h6 className='fw-bold'>{data.out_of_stock_products}</h6>
                    <p className="fs-6 text-muted fw-bold ">OUT OF STOCK</p>

                </div>
                <div className="col-md-2 pt-3">

                    <h6 className='fw-bold'>{data.total_customers}</h6>
                    <p className="fs-6 text-muted fw-bold ">TOTAL BUYERS</p>

                </div>
            </div>
        </div>

    )
}