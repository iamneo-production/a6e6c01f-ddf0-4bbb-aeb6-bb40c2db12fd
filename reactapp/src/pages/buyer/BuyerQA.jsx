import React, {useEffect, useState} from 'react';
import { MdKeyboardBackspace } from 'react-icons/md';
import { ReactComponent as QA } from '../../assets/QA.svg';
import Footer from '../../components/common/Footer';
import { useNavigate } from "react-router-dom";
import NavigationBar from '../../components/common/NavigationBar';
import {fetchQAByBuyer} from "../../features/qaSlice";
import {useDispatch, useSelector} from "react-redux";

export default function BuyerQA() {
    const navigate = useNavigate();
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(fetchQAByBuyer({token:token}))
    },[])
    const qaBuyerList = useSelector(state => state.qa.qaBuyerList)
    const handleGoBack = () => {
        navigate("/home")
    };

    return (
        <div>
            <NavigationBar /><br /><br /><br />
            <div className="d-flex flex-row align-items-center">
                <p className='ms-3' ><MdKeyboardBackspace style={{ color: "grey" }} onClick={handleGoBack} />{" "}<a href="#" style={{ color: "grey" }} onClick={handleGoBack}>Back</a></p>
                <p className='ms-3' style={{ fontSize: 30 }}><b>Q and A</b></p>
            </div>
            <br />
            <div>

                <div className="container">
                    {qaBuyerList.length === 0 ? (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                            <div style={{ width: 400, height: 400 }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <h5 style={{ color: "grey" }}><b>No query asked yet</b></h5>
                                </div>
                                <QA />
                            </div>
                        </div>
                     ) : 
                    qaBuyerList.map((value, index) =>(
                        <div className="card mb-3">
                            <div className="card-body">
                                <h6 className="card-title"><b>{value.product.name}</b></h6>
                                <p className="card-text">
                                    <span className="badge bg-light text-dark">Q :</span>
                                    {`  ${value.question}`}
                                </p>
                                {value.status === 'Answered' &&  <p>
                                    <span className="badge bg-light text-dark">A :  </span>
                                    {`  ${value.answer}`}
                                </p>}
                                {value.status === 'Unanswered' ?
                                    <div className="d-flex justify-content-start">
                                        <button
                                            type="submit"
                                            className="btn btn-danger"
                                            style={{ backgroundColor: '#B1DFB8', color: 'black', width: 100, border: "1px solid #000" }}

                                        >
                                            <b>Open</b>
                                        </button>
                                    </div>
                                    :
                                    <div className="d-flex justify-content-start">
                                        <button
                                            type="submit"
                                            className="btn btn-danger"
                                            style={{ backgroundColor: '#FFB4AF', color: 'black', width: 100, border: "1px solid #000" }}

                                        >
                                            <b>Closed</b>
                                        </button>
                                    </div>
                                }

                            </div>
                        </div>
                    ))}
                </div>
            </div><br /><br />
            <Footer />
        </div>
    );
}
