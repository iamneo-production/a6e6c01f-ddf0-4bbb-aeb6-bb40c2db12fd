import { FaStar } from "react-icons/fa";
import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {baseUrl} from "../../api/config";
import DefaultStars from "../buyer/DefaultStars";
import moment from "moment";

function ProductReviews(props) {
    const token = useSelector(state => state.user.token)
    const [reviewsList,setReviewsList] = useState([]);
    useEffect( () => {
        axios.get(`${baseUrl}/product/reviews?productId=${props.productId}`,{
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) =>{
            setReviewsList(res.data.data)
        }).catch((err) =>{
            console.log(err)
        })
    },[])

    return (
        <>
            <div className="mb-4 pb-4 border-bottom">
                {reviewsList.length === 0 ? (<p style={{color: "grey"}}>No reviews for this product yet</p>) : (
                    reviewsList.map((value, index) => (
                        <div className={"mb-3"}>
                            <div className="d-flex mb-3 align-items-center">
                                <img src={require('../../assets/profile.jpg')} alt=""
                                     className="rounded-circle avatar-lg"
                                     style={{width: 50, height: 50}}/>
                                <div className="ml-2 px-3">
                                    <div className="row">
                                        <div className="col-auto">
                                            <h5 className="mb-1">
                                                {value.customer_name}
                                            </h5>
                                        </div>
                                        <div className="col">
                                            <DefaultStars value={value.rating} exportStar={() => {
                                                return
                                            }}/>
                                        </div>
                                    </div>
                                    <p className="font-12 mb-0">
                                        <span>{moment(value.updated_at).format('LLL')}</span>
                                    </p>
                                </div>
                            </div>
                            <p>{value.comment}</p>
                            <a href="#!" className="btn btn-light btn-sm mr-2">Helpful</a>
                            <a href="#!" className="text-danger font-14">Report abuse</a>
                        </div>
                    )))}
            </div>
        </>
    );
}
export default ProductReviews;