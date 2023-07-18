import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductById} from "../../features/productSlice";
import axios from "axios";
import {baseUrl} from "../../api/config";
import moment from "moment/moment";



const Review = () =>{
    const token = useSelector(state => state.user.token)
    const selectedProduct = useSelector(state => state.product.selectedProduct)
    const [reviewsList,setReviewsList] = useState([]);
    useEffect( () => {
        axios.get(`${baseUrl}/product/reviews?productId=${selectedProduct}`,{
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) =>{
                setReviewsList(res.data.data)
            }).catch((err) =>{
            console.log(err)
        })
    },[])

    return (

    <>

<div class="mb-4 pb-4 border-bottom">
    {reviewsList.map((value, index) =>(
        <div className={"mb-3"}>
            <div className="d-flex mb-3 align-items-center">
                <img src={require('../../assets/profile.jpg')} alt="" className="rounded-circle avatar-lg"
                     style={{width: 50, height: 50}}/>
                <div className="ml-2 px-3">
                    <h5 className="mb-1">
                        {value.customer_name}
                    </h5>
                    <p className="font-12 mb-0">
                        <span>{moment(value.updated_at).format('LLL')}</span>
                    </p>
                </div>
            </div>
            <p>{value.comment}</p>
            <a href="#!" className="btn btn-light btn-sm mr-2">Helpful</a>
            <a href="#!" className="text-danger font-14">Report abuse</a>
        </div>
    ))}
    </div>




    </>
    )

};

export default Review;