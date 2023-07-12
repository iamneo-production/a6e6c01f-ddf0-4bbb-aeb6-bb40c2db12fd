import { useState } from 'react';
import QAModal from '../../components/seller/QAModal';
import Footer from '../../components/common/Footer';
import SellerNavigationBar from '../../components/seller/SellerNavigationBar';
import { useNavigate } from "react-router-dom";
import {MdKeyboardBackspace} from 'react-icons/md';

export default function SellerQA() {
    const [qamodal, setQamodal] = useState(false);
    const handleCloseQAModal = () => setQamodal(false);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/seller/home")
    };

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
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title"><b>Samsung Galaxy M04 Light Green4GB RAM, 64GB Storage | Upto 8GB RAM with RAM Plus 5000 mAh Battery | 13MP Dual Camera</b></h6>
                            <p className="card-text">Q: What is the weight?</p>

                            <div className="d-flex justify-content-start">
                                <button
                                    type="submit"
                                    className="btn btn-danger"
                                    style={{ backgroundColor: '#B1DFB8', color: 'black', width: 100, border: "1px solid #000" }}
                                    onClick={() => setQamodal(true)}
                                >
                                    <b>Answer</b>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div><br /><br />
            <QAModal show={qamodal} onHide={handleCloseQAModal} />
            <Footer />
        </div>
    );
}
