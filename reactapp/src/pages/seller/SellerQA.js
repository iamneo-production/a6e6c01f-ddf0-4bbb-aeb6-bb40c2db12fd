import React, {useEffect, useState} from 'react';
import QAModal from '../../components/seller/QAModal';
import { ReactComponent as QA } from '../../../src/assets/QA.svg';
import Footer from '../../components/common/Footer';
import SellerNavigationBar from '../../components/seller/SellerNavigationBar';
import { useNavigate } from "react-router-dom";
import {MdKeyboardBackspace} from 'react-icons/md';
import {useDispatch, useSelector} from "react-redux";
import {fetchQABySeller} from "../../features/qaSlice";

export default function SellerQA() {
    const [qamodal, setQamodal] = useState(false);
    const [selectedItem,setSelectedItem] = useState({});
    const handleCloseQAModal = () => setQamodal(false);
    const navigate = useNavigate();
    const token = useSelector(state => state.user.token)
    const sellerId = useSelector(state => state.user.currentUser.id)
    const dispatch = useDispatch()
    useEffect( () => {
        dispatch(fetchQABySeller({token: token, sellerId:sellerId }))
    },[])
    const qaSellerList = useSelector(state => state.qa.qaSellerList)
    const handleGoBack = () => {
        navigate("/seller/home")
    };

    function handleopenAnswer(element){
        setSelectedItem(element)
        setQamodal(true)
    }

    return (
        <div>
            <SellerNavigationBar />
            <div className="d-flex flex-row align-items-center">
                <p className='ms-3' ><MdKeyboardBackspace style={{color:"grey"}} onClick={handleGoBack}/>{" "}<a href="#" style={{color:"grey"}} onClick={handleGoBack}>Back</a></p>
                <p className='ms-3' style={{fontSize:30}}><b>Q and A</b></p>
            </div>

            <br />
            <div>
                
                <div className="container">
                    {qaSellerList.length === 0 ? (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                            <div style={{ width: 400, height: 400 }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <h5 style={{ color: "grey" }}><b>No query asked yet</b></h5>
                                </div>
                                <QA />
                            </div>
                        </div>
                     ) : 
                    qaSellerList.map((value, index) => (
                        <div className="card mb-3">
                            <div className="card-body">
                                <h6 className="card-title"><b>{value.product.name}</b></h6>
                                <div>
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <p>
                                                <span className="badge bg-light text-dark">Q :</span>
                                                {`  ${value.question}`}
                                            </p>
                                        </div>
                                    </div>
                                    {value.status === 'Answered' &&  <p>
                                        <span className="badge bg-light text-dark">A :  </span>
                                    {`  ${value.answer}`}
                                </p>}
                                </div>
                                {value.status === 'Unanswered' ?
                                    <div className="d-flex justify-content-start">
                                        <button
                                            type="submit"
                                            className="btn btn-danger"
                                            style={{ backgroundColor: '#B1DFB8', color: 'black', width: 100, border: "1px solid #000" }}
                                            onClick={() => handleopenAnswer(value)}
                                        >
                                            <b>Answer</b>
                                        </button>
                                    </div>
                                    :
                                    <div className="d-flex justify-content-start">
                                        <button
                                            type="submit"
                                            className="btn btn-danger"
                                            disabled={value.status === 'Answered'}
                                            style={{ backgroundColor: '#FFB4AF', color: 'black', width: 100, border: "1px solid #000" }}
                                            onClick={() => handleopenAnswer(value)}
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
            <QAModal element={selectedItem} show={qamodal} onHide={handleCloseQAModal} />
            <Footer />
        </div>
    );
}
